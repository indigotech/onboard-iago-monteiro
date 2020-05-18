import {ErrorTextStyled} from './form-input-error.component.style';
import React from 'react';

function InputErrorLabel(props: any) {
    return(
    <ErrorTextStyled>{props.children}</ErrorTextStyled>
    );
}

export default InputErrorLabel;