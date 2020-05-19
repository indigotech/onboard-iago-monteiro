import style, {css} from 'styled-components/native';

interface LoadMoreButtonProps{
    isLastPage: boolean
}

export const TextStyled = style.Text`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 10px;
    color: blue;

    ${(props:LoadMoreButtonProps) => props.isLastPage && css`display: none;`}
`;