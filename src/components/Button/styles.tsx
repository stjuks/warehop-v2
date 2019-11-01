import styled from 'styled-components';

export const ButtonContainer = styled.button`
    ${({ theme }) => `
        background: ${theme.colors.primary};
        color: ${theme.colors.white};
        width: 100%;
        flex: 1;
        font-weight: 700;
        border-radius: 3rem;
        padding: 1rem 0;
    `}
`;
