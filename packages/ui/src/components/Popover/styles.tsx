import styled from '@ui/util/styled';

export const ContentContainer = styled.div`
  ${({ theme }) => `
        background: ${theme.colors.white};
        box-shadow: ${theme.lightShadow};
        border-radius: 0.25rem;
        padding: 0.5rem 0;
        border: 1px solid ${theme.colors.lightColor1};
        display: flex;
        flex-direction: column;
        color: red;
    `}
`;

export const MenuItemContainer = styled.button`
  ${({ theme }) => `
        padding: 0.5rem 1rem;
        text-align: left;
        color: ${theme.colors.text};
        font-family: 'Roboto', sans-serif;
        display: flex;
        align-items: center;

        :hover,
        :focus {
            color: ${theme.colors.primary};
            border-radius: 0.25rem;
        }
    `}
`;
