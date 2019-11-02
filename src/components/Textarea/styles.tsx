import styled from 'styled-components';

export const TextareaStyled = styled.textarea`
    ${({ theme }) => `
        && {
            font-family: 'Roboto', sans-serif;
            color: ${theme.colors.text};
            font-weight: 500;
            padding-top: 0.5rem;
        }
    `}
`;
