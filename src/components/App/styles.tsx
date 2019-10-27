import styled from 'styled-components';

interface IContentContainerProps {
    padded?: boolean;
}

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const ContentContainer = styled.div<IContentContainerProps>`
    ${({ theme, padded }) => `
        background: ${theme.colors.white};
        flex: 1;
        overflow: auto;
        ${padded && 'padding: 1rem;'}
    `}
`;
