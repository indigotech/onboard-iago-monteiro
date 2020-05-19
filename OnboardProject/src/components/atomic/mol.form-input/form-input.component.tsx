import React from 'react';
import InputLabel from '../atm.form-input-label/form-input-label.component';
import FormInputField from '../atm.form-input-field/form-input-field.component';
import ErrorText from '../atm.form-input-error/form-input-error.component';
import {ContainerViewStyled} from './form-input.component.style';
import {useState} from 'react';

interface FormInputProps {
    // label: string,
    // //errorMessage: string,
    // //hasError: boolean,
    // handler: (value: string) => void,
    // isPassword?: boolean,
    // //onEndEditing: (e:any) => void
    
    label: string,
    handler: (value:string, hasError: boolean) => void,
    validator: (value:string) => string,
    isPassword?: boolean
}

function FormInput (props: FormInputProps) {
    
    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [hasBlurred, setHasBlurred] = useState(false);

    function _validateAndPassUp(value: string){

        let hasError = false;
        const errorMessage = props.validator(value);

        if(errorMessage){
            setErrorMessage(errorMessage);
            hasError = true;
            setHasError(hasError);
        } else{
            setErrorMessage("");
            setHasError(hasError);
        }

        props.handler(value, hasError);
    }

    function handleChangedInput(value:string){

        if(!hasBlurred){
            props.handler(value, false);
            return;
        }

        _validateAndPassUp(value);
    }

    function handleBlur(e:any) {
        _validateAndPassUp(e.nativeEvent.text);
        setHasBlurred(true);
    }

    return(
        <ContainerViewStyled>
            <InputLabel hasError={hasError}>{props.label}</InputLabel>
            <FormInputField 
                hasError={hasError} 
                onChange={handleChangedInput} 
                isPassword={props.isPassword}
                onEndEditing={handleBlur}
            />
            <ErrorText>{errorMessage}</ErrorText>
        </ContainerViewStyled>
    );
}

export default FormInput