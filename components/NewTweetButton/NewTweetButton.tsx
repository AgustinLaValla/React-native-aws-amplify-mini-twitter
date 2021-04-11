import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export default function NewTweetButton() {
    const { navigate } = useNavigation();
    const onPress = () => {
        navigate('NewTweet');
    }
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.65}>
            <MaterialCommunityIcons name="feather" size={30} color="#fff" />
        </TouchableOpacity>
    )
}
