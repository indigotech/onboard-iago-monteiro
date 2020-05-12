import {StyleSheet} from 'react-native';

export const getLoadMoreButtonColor = (isLastPage:boolean) => {
    const color =  isLastPage ? 'grey' : 'blue';
    return {color};
}

const styles = StyleSheet.create({
    userContainer: {
        flex: 1,
        //alignItems:'center',
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        borderRadius:10,
        marginBottom:15,
        marginHorizontal: '10%'
    },
    loadMoreButton: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    loadMoreButtonAvailable: {
        color: 'blue'
    },
    loadMoreButtonUnavailable: {
        color: 'grey'
    },
    sectionHeader: {
        textAlign: 'center',
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'lightgrey',
    },
    userInfo: {
        textAlign: 'center',
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'lightgrey'
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
     },
     FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
      },
    }
);

export {styles};