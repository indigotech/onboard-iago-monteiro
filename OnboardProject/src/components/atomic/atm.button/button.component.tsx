import React from 'react';
import {TextStyled, TouchableOpacityStyled} from './button.component.style';

interface ButtonProps {
    handleFunction: () => void,
    text: string,
    isLoading: boolean
}

function Button (props: ButtonProps) {
    
    return(
        <TouchableOpacityStyled onPress={props.handleFunction}>
          <TextStyled isLoading={props.isLoading}>
            {props.isLoading ? 'Aguarde...' : props.text}
          </TextStyled>
        </TouchableOpacityStyled>
    )
}

export default Button;