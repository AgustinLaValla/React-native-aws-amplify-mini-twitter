import React from 'react'
import { View, Image } from 'react-native'
import { Text } from '../../Themed'
import { styles } from './styles'

type MainContainerContentProps = {
    image?: string | null;
    content: string;
}

export default function MainContainerContent({ image, content }: MainContainerContentProps) {
    return (
        <View style={styles.contentWrapper}>
            <Text style={styles.content}>{content}</Text>
            {!!image && <Image style={styles.image} source={{ uri: image }} />}
        </View>
    )
}
