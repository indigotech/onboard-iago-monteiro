import {TextInputStyled} from './form-input-field.component.style';
import React from 'react';

interface FormInputProps{
    onChange: (value:string) => void,
    isPassword?: boolean,
    hasError: boolean
}

function FormInputField(props: FormInputProps){
    return(
        <TextInputStyled 
            hasError={props.hasError}
            onChangeText={props.onChange}
            secureTextEntry={props.isPassword}
        />
    );
}

export default FormInputField;