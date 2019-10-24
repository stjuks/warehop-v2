import styled from 'styled-components';

export const HeaderContainer = styled.div`
    ${({ theme }) => `
        background: ${theme.colors.white};
        color: ${theme.colors.text};
        box-shadow: ${theme.colors.lightShadow};
    `}
    padding: 0 1rem;
    height: 4rem;
    display: flex;
    font-weight: 500;
    align-items: center;
    font-size: 1.25rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    z-index: 2;
`;
