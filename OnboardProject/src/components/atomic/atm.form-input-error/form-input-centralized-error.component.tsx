import React from 'react';
import {View} from 'react-native';
import ErrorTextStyled from './form-input-error.component';

function CentralizedError (props: {children:any}) {
    return(
        <View style={{width:'80%'}}>
            <ErrorTextStyled>{props.children}</ErrorTextStyled>
        </View>
    )
}

export default CentralizedError;