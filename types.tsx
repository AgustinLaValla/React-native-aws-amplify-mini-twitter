export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  NewTweet: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Notifications: undefined;
  Messages: undefined;
};

export type HomeNavigatorParamList = {
  HomeScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type UserType = {
  id: string;
  username: string;
  name: string;
  email: string;
  image?: string;
}

export type TweetType = {
  id: string;
  content: string;
  createdAt: Date | string;
  image?: string;
  numberOfComments: number;
  numberOfRetweets: number;
  numberOfLikes: number;
  user: UserType
  likes?: {
    items: LikeType[];
  };
}

export type LikeType = {
  id?: string;
  tweetID: string;
  userID: string;
}