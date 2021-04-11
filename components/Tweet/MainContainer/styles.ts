import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    tweetHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        marginTop: 5
    },

    tweetHeaderNamesWrapper: {
        flexDirection: 'row',
        flex: 1,
        overflow: 'hidden',
        justifyContent: 'space-between',
        paddingRight: 5
    },

    tweetHeaderNames: {
        flexDirection: 'row',
        width: '72%',
        overflow: 'hidden',
    },

    name: {
        fontWeight: "bold",
        
    },
    username: {
        marginHorizontal: 5,
        color: 'grey',
        flex: 1,
    },

    createdAtWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    createdAt: {
        color: 'grey',
    },

    dot: {
        transform: [
            {translateY: -4}
        ]
    },

    moreIcon: {
        alignSelf: 'flex-end'
    },

    contentWrapper: {
        marginHorizontal: 5
    },

    content: {
        marginVertical: 5,
        lineHeight: 18,

    },

    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: 10
    },

    footerContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    number: {
        marginLeft: 5,
        color: 'grey'
    }
});