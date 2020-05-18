import styled, {css} from 'styled-components/native';

interface ButtonProps {
    isLoading: boolean
}

export const TouchableOpacityStyled = styled.TouchableOpacity`
    align-items: center;
    font-weight: bold;
    color: white;
    height: 44px;
    width: 80%;
    margin-top: 15px;
   
`;

export const TextStyled = styled.Text`
    height: 100%;
    color: white;
    padding-vertical: 10px;
    padding-horizontal: 70px;
    border-radius: 15px;
    background-color: #4d089a;

    ${(props: ButtonProps) => props.isLoading && css`background-color: grey;`}
`;