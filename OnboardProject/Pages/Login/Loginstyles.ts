import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        height: '60%',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        
        fontWeight: 'bold',
        color: 'white',
        width: '80%',
        marginTop: 30,
        
    },
    buttonText:{
        fontWeight: 'bold',
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 70,
        borderRadius: 15,
    },
    pageTitle: {
        alignItems: 'center',
        fontSize: 26,
        fontWeight: 'bold'
    },
    inputName: {
        fontSize: 16,
        marginTop: 20
    },
    feedbackMessageError: {
        fontSize: 16,
        marginTop: 20,
        color: 'red' 
    },
    feedbackMessageGood: {
        fontSize: 16,
        marginTop: 20,
        color: 'green'
    },
    textInput: {
        borderRadius: 15,
        borderColor: 'grey',
        borderBottomWidth: 3,
        borderTopWidth: 3,
        borderRightWidth: 10,
        borderLeftWidth: 10,
        paddingLeft: 15,
        backgroundColor: '#FFFFFF',
        width: '90%',
        marginTop: 5
    }
});

export {styles}