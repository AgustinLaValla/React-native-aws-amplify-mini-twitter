import * as React from 'react';
import { StyleSheet } from 'react-native';
import Feed from '../components/Feed/Feed';
import NewTweetButton from '../components/NewTweetButton/NewTweetButton';
import { View } from '../components/Themed';
import { useGetTweets } from './hooks/useGetTweets';


export default function HomeScreen() {

  const { tweets, loading, getTweets } = useGetTweets();

  return (
    <View style={styles.container}>
      <Feed tweets={tweets} loading={loading} getTweets={getTweets}/>
      <NewTweetButton />    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    position: 'relative'
  },
});
