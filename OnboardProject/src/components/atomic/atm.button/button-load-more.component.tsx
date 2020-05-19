import React from 'react';
import {TextStyled} from './button-load-more.component.style';

interface LoadMoreButtonProps{
    isLastPage: boolean,
    onPress:() => void
}
function LoadMoreButton(props: LoadMoreButtonProps) {
    return(
    <TextStyled onPress={props.onPress} isLastPage={props.isLastPage}>Load More</TextStyled>
    );
}

export default LoadMoreButton;