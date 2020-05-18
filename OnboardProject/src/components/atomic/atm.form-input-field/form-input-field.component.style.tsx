import styled, {css} from 'styled-components/native';

interface InputFieldProps {
    hasError: boolean
}

export const TextInputStyled = styled.TextInput`
    border-radius: 15px;
    border-color: #777777;
    border-width: 1px;
    padding-left: 15px;
    background-color: #FFFFFF;
    width: 90%;
    marginTop: 5px;

    ${(props : InputFieldProps) => props.hasError && css`border-color:red;`}
`;
