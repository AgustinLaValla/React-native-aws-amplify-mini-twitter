import React from 'react'
import { View, Text, Image } from 'react-native';
import { TweetType } from '../../../types';

import MainContainerHeader from './MainContainerHeader/MainContainerHeader';
import MainContainerContent from './MainContainerContent';
import MainContainerFooter from './MainContainerFooter/MainContainerFooter';

interface MainContainerProps { tweet: TweetType }

export default function MainContainer({ tweet }: MainContainerProps) {
    return (
        <View style={{ flex: 1 }}>
            <MainContainerHeader user={tweet.user} createdAt={tweet.createdAt} />
            <MainContainerContent image={tweet.image} content={tweet.content} />
            <MainContainerFooter tweet={tweet} />
        </View>
    )
}
