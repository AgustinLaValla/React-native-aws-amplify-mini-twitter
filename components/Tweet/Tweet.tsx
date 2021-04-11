import React from 'react'
import { View, StyleSheet } from 'react-native';
import { TweetType, UserType } from '../../types';
import LeftContainer from './LeftContainer/LeftContainer';
import MainContainer from './MainContainer/MainContainer';
import { styles } from './styles';

interface TweetProps { tweet: TweetType }

export default function Tweet({ tweet }: TweetProps) {
    const {
        id,
        content,
        createdAt,
        image,
        numberOfLikes,
        numberOfComments,
        numberOfRetweets,
        user
    } = tweet;
    return (
        <View style={styles.container}>
            <LeftContainer user={user} />
            <MainContainer tweet={tweet} />
        </View>
    )
}
