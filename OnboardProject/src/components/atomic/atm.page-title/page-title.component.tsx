import React from 'react';
import {TextStyled} from './page-title.component.style';

function PageTitle (props: any) {

    return(
        <TextStyled>{props.children}</TextStyled>
    );
}

export default PageTitle;