import React from 'react'
import { TweetType } from '../../types'
import { View, FlatList } from 'react-native';
import Tweet from '../Tweet/Tweet';

type FeedProps = {
    tweets: TweetType[];
    loading: boolean;
    getTweets: () => Promise<void>
}

export default function Feed({ tweets, loading, getTweets }: FeedProps) {
    return (
        <View style={{ width: '100%' }}>
            <FlatList
                data={tweets}
                renderItem={({ item }) => <Tweet tweet={item} />}
                keyExtractor={item => item.id}
                refreshing={loading}
                onRefresh={getTweets}
            />
        </View>
    )
}
