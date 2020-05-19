import styled, {css} from 'styled-components/native';

export const LabelViewStyled = styled.View`
    width:85%;
`;

interface LabelProps {
    hasError: boolean
}

export const LabelTextStyled = styled.Text`
    marginHorizontal:0;
    font-size: 20px;
    margin-top: 0;
    color: black;
    
    ${(props : LabelProps) => props.hasError && css`color:red;`}
`;
