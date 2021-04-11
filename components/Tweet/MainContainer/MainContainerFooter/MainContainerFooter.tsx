import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';
import { Feather, EvilIcons, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { createLike, deleteLike } from '../../../../src/graphql/mutations';
import { useAuthContext } from '../../../../App';
import { LikeType, TweetType } from '../../../../types';

type MainContainerFooterProps = {
    tweet: TweetType
}

export default function MainContainerFooter({ tweet }: MainContainerFooterProps) {

    const { user } = useAuthContext();
    const [myLike, setMyLike] = React.useState<LikeType | undefined | null>(null);
    const [likesCount, setLikesCount] = React.useState<number>(tweet.likes?.items.length || 0);

    const onLike = async () => {
        if (!user) return;

        if (!myLike) {
            await addLike();
        } else {
            await deleteLike();
        }

    }

    const addLike = async () => {
        const resp: any = await API.graphql(graphqlOperation(createLike, {
            input: {
                userID: user?.id,
                tweetID: tweet.id
            }
        }));
        setLikesCount(likesCount + 1);
        const likeData = resp.data.createLike.tweet.likes.items.find((like: LikeType) => like.id === resp.data.createLike.id) as LikeType;
        setMyLike(likeData);
    }

    const deleteLike = async () => {
        await API.graphql(graphqlOperation(deleteLike, { input: { id: myLike?.id } }));
        setLikesCount(likesCount - 1);
        setMyLike(null);
    }

    React.useEffect(() => {
        if (user) {
            const hasUserLikedTweet = tweet.likes?.items.find(like => like.userID === user.id);
            setMyLike(hasUserLikedTweet);
        }
    }, [user])

    return (
        <View style={styles.footerContainer}>
            <View style={styles.iconContainer}>
                <Feather name="message-circle" size={20} color={'grey'} />
                <Text style={styles.number}>{tweet.numberOfComments}</Text>
            </View>

            <View style={styles.iconContainer}>
                <EvilIcons name="retweet" size={29} color={'grey'} />
                <Text style={{ color: 'grey' }}>{tweet.numberOfRetweets}</Text>
            </View>

            <View style={styles.iconContainer}>
                <TouchableOpacity activeOpacity={0.6} onPress={onLike}>
                    <AntDesign name={!myLike ? "hearto" : "heart"} size={20} color={!myLike ? 'grey' : 'red'} />
                </TouchableOpacity>
                <Text style={styles.number}>{likesCount}</Text>
            </View>

            <View style={styles.iconContainer}>
                <EvilIcons name="share-google" size={29} color={'grey'} />
            </View>
        </View>
    )
}
