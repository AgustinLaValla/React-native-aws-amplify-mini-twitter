import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15
    },

    headerContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    button: {
        backgroundColor: Colors.light.tint,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 40
    },
    buttonText: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 16,
    },
    newTweetContainer: {
        flexDirection: 'row',
        paddingVertical: 15
    },
    inputsWrapper: {
        marginLeft: 10,
        width: '90%',
    },
    tweetInput: {
        maxHeight: 300,
        width: '90%',
        maxWidth: '90%',
        fontSize: 18,
    },
    imageBtnWrapper: {
        marginLeft: 65,
    },

    imageBtn: {
        color: Colors.light.tint,
        fontSize: 16
    },

    imageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },

    image: {
        width: '100%',
        height: 200,
        marginTop: 20,
        resizeMode: 'contain',
        borderRadius: 2
    },

    spinnerContainer: {
        width: '100%', 
        height: '100%', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});