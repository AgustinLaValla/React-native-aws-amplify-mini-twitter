import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { UserType } from '../../../types';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';

export type LeftContainerProps = {
    user: UserType
};

export default function LeftContainer({ user }: LeftContainerProps) {
    return (
        <View>
            <ProfilePicture image={user.image} size={75} />
        </View>
    )
}

