import styled from 'styled-components';

interface IIconContainerProps {
    size?: string;
    highlighted?: boolean;
}

export const HeaderContainer = styled.div`
    ${({ theme }) => `
        background: ${theme.colors.white};
        color: ${theme.colors.text};
        box-shadow: ${theme.colors.lightShadow};
        
        font-family: 'Red Hat Display', sans-serif;
        padding: 0 1rem;
        height: 4rem;
        display: flex;
        font-weight: 500;
        align-items: center;
        font-size: 1.25rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        z-index: 2;
    `}
`;

export const TitleContainer = styled.div`
    display: flex;

    .back-button {
        min-width: 1.5rem;
        display: flex;
        align-items: center;

        .icon-container {
            display: flex;
            align-items: center;
            width: 1.5rem;
        }
    }
`;

export const IconsContainer = styled.div`
    ${({ theme }) => `
        display: flex;
        z-index: 3;
        flex: 1;
        justify-content: flex-end;
        font-size: 1.75rem;
        color: ${theme.colors.text};

        > *:not(:last-child) {
            margin-right: 0.75rem;
        }

        svg {
            cursor: pointer;
            stroke-width: 1.5;
        }
    `}
`;

export const IconContainer = styled.button<IIconContainerProps>`
    ${({ size, highlighted, theme }) => `
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: ${size || '1.75rem'};
        color: ${highlighted ? theme.colors.primary : theme.colors.text};

        :not(:last-child) {
            margin-right: 0.75rem;
        }
    `}
`;
