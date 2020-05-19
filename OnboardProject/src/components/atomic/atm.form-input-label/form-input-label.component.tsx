import {LabelViewStyled, LabelTextStyled} from './form-input-label.component.style';
import React from 'react';

interface InputLabelProps {
    hasError: boolean
    children: any
}

function InputLabel(props: InputLabelProps) {
    return(
        <LabelViewStyled>
            <LabelTextStyled hasError={props.hasError}>
                {props.children}
            </LabelTextStyled>
        </LabelViewStyled>
    );
}

export default InputLabel;