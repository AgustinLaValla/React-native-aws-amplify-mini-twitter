import React from "react"
import { API, graphqlOperation } from 'aws-amplify';
import { listTweets } from '../../src/graphql/queries';
import { onCreateTweet } from '../../src/graphql/subscriptions';
import { Observable } from '../../node_modules/zen-observable-ts'
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { OnCreateTweetSubscription } from '../../src/API';
import { TweetType } from "../../types";

export const useGetTweets = () => {
    const [tweets, setTweets] = React.useState<TweetType[]>([]);
    const [loading, setLoading] = React.useState(false);

    const subscribeTweets = async () => {
        await API.graphql(graphqlOperation(onCreateTweet)).subscribe({
            next: (sub$: any) => {
                setTweets(prevTweets => [...prevTweets, sub$.value.data.onCreateTweet])
            }
        });
    };

    const getTweets = async () => {
        setLoading(true);
        try {
            const tweetList: any = await API.graphql(graphqlOperation(listTweets));
            if (tweetList) {
                setTweets(tweetList.data.listTweets.items);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        getTweets();
        subscribeTweets();
    }, [])

    return { tweets, loading, getTweets };
}