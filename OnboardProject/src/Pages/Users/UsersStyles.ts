import {StyleSheet} from 'react-native';

export const getLoadMoreButtonColor = (isLastPage:boolean) => {
    const color =  isLastPage ? 'grey' : 'blue';
    return {color};
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    }
});

export {styles};