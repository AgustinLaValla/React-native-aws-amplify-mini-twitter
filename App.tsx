import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import config from './src/aws-exports.js';

import { withAuthenticator } from 'aws-amplify-react-native'
import { getUser } from './src/graphql/queries'
import { UserType } from './types';
import { createUser } from './src/graphql/mutations';
import { DefaultProfilePic } from './constants/DefaultProfilePicture';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const AuthContext = React.createContext<{ user: UserType | null }>({ user: null });

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [user, setUser] = React.useState<UserType | null>(null);

  const saveUserToDB = async (user: UserType) => {
    await API.graphql(graphqlOperation(createUser, { input: user }));
  }

  React.useEffect(() => {
    const updateUser = async () => {
      //Get current Authenticated User
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });

      if (userInfo) {
        const userData: any = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }));
        const user: UserType = {
          id: userInfo.attributes.sub,
          username: userInfo.username,
          name: userInfo.username,
          email: userInfo.attributes.email,
          image: DefaultProfilePic,
        }
        setUser(user);
        if (!userData.data.getUser) {
          await saveUserToDB(user);
        } else {
          console.log('User already exists')
        }
      }
    }

    updateUser();
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthContext.Provider value={{ user }}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </AuthContext.Provider>
    );
  }
}

export const useAuthContext = () => React.useContext(AuthContext);

export default withAuthenticator(App);