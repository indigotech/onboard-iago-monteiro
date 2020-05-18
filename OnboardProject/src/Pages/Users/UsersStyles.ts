import {StyleSheet} from 'react-native';

export const getLoadMoreButtonColor = (isLastPage:boolean) => {
    const color =  isLastPage ? 'grey' : 'blue';
    return {color};
}

const styles = StyleSheet.create({

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
    }
  }
);

export {styles};
