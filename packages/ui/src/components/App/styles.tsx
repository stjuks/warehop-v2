import styled from '../../util/styled';

interface IContentContainerProps {
    padded?: boolean;
}

export const AppContainer = styled.div`
    ${({ theme }) => `
        display: flex;
        flex-direction: column;
        height: 100%;
        color: ${theme.colors.text};
    `}
`;

export const ContentContainer = styled.div<IContentContainerProps>`
    ${({ theme, padded }) => `
        background: ${theme.colors.lightGrey};
        flex: 1;
        overflow: auto;
        ${padded && 'padding: 1rem;'}
    `}
`;
