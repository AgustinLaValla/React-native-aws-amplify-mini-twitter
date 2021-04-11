import React from 'react'
import { Text, View } from 'react-native'
import { UserType } from '../../../../types'
import { styles } from '../styles'
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';

type MainContainerProps = {
    user: UserType;
    createdAt: Date | string;
}

export default function MainContainerHeader({ user, createdAt }: MainContainerProps) {
    return (
        <View style={styles.tweetHeaderContainer}>
            <View style={styles.tweetHeaderNamesWrapper}>
                <View style={styles.tweetHeaderNames}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">@{user.username}</Text>
                </View>
                <View style={styles.createdAtWrapper}>
                    <Text style={[styles.createdAt, styles.dot]}>. </Text>
                    <Text style={styles.createdAt}>{moment(createdAt).fromNow(true)}</Text>
                </View>
            </View>
            <View>
                <Entypo style={styles.moreIcon} name="chevron-down" size={16} color={'grey'} />
            </View>
        </View>
    )
}
