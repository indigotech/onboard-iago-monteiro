import React from 'react';
import InputLabel from '../atm.form-input-label/form-input-label.component';
import FormInputField from '../atm.form-input-field/form-input-field.component';
import ErrorLabel from '../atm.form-input-error/form-input-error.component';
import {ContainerViewStyled} from './form-input.component.style';

interface FormInputProps {
    label: string,
    errorMessage: string,
    hasError: boolean,
    onChange: (value: string) => void,
    isPassword?: boolean
}

function FormInput (props: FormInputProps) {
 
    return(
        <ContainerViewStyled>
            <InputLabel hasError={props.hasError}>{props.label}</InputLabel>
            <FormInputField 
                hasError={props.hasError} 
                onChange={props.onChange} 
                isPassword={props.isPassword}/>
            <ErrorLabel>{props.errorMessage}</ErrorLabel>
        </ContainerViewStyled>
    );
}

export default FormInput