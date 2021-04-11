import React from 'react'
import 'react-native-get-random-values';
import { Text, View, TouchableOpacity, SafeAreaView, TextInput, Platform } from 'react-native'
import { styles } from './styles';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { useNavigation } from '@react-navigation/native';
import { createTweet } from '../../src/graphql/mutations';
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from '../../App';
import { ActivityIndicator } from 'react-native';

export default function NewTweetScreen() {

    const [tweet, setTweet] = React.useState<string>('');
    const [image, setImage] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const { goBack } = useNavigation();
    const { user } = useAuthContext();


    const postTweet = async () => {

        if (!tweet) return;

        setLoading(true);

        try {
            let imageKey;
            if (!!image) {
                imageKey = await uploadImage();
            }

            let url;
            if (imageKey) {
                url = await Storage.get(imageKey);
                Storage.get(imageKey, { download: false })
            }

            await API.graphql(graphqlOperation(createTweet, {
                input: {
                    content: tweet,
                    image: url,
                    userID: user?.id
                }
            }));
            setLoading(false);
            goBack();
        } catch (error) {
            setLoading(false);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };


    React.useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const uploadImage = async () => {
        try {
            const resp = await fetch(image);
            const blob = await resp.blob();
            const urlParts = image.split('.');
            const extension = urlParts[urlParts.length - 1];

            const key = `${uuidv4()}.${extension}`;

            await Storage.put(key, blob);

            return key;

        } catch (error) {
            console.warn(error.message);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                !loading
                    ?
                    <>
                        <View style={styles.headerContainer}>
                            <TouchableOpacity onPress={() => goBack()} activeOpacity={0.5}>
                                <AntDesign name="close" size={30} color={Colors.light.tint} onPress={() => goBack()} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={postTweet} activeOpacity={0.65}>
                                <Text style={styles.buttonText}>Tweet</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.newTweetContainer}>
                            <ProfilePicture image="https://agustinlavalla.com/images/face.jpg" />

                            <View style={styles.inputsWrapper}>
                                <TextInput
                                    placeholder="What's happenig?"
                                    style={styles.tweetInput}
                                    numberOfLines={3}
                                    multiline={true}
                                    value={tweet}
                                    onChangeText={setTweet}
                                />

                            </View>
                        </View>

                        <View style={styles.imageBtnWrapper}>
                            <TouchableOpacity onPress={pickImage} activeOpacity={0.6}>
                                <Text style={styles.imageBtn}>Pick an image</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.imageWrapper}>
                            {image
                                ?
                                <Image source={{ uri: image }} style={styles.image} />
                                :
                                null
                            }
                        </View>
                    </>

                    :

                    <View style={styles.spinnerContainer}>
                        <ActivityIndicator size="large" color={Colors.light.tint} />
                    </View>

            }



        </SafeAreaView>
    )
}

