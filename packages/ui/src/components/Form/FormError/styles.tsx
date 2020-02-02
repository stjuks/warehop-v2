import styled from '../../../util/styled';

export const FormErrorContainer = styled.div`
    font-size: 0.875rem;
    position: relative;
    margin: 0.25rem;
    padding: 1rem;
    border-radius: 0.25rem;
    transform-origin: top;

    ul {
        padding-left: 1rem;
        margin: 0;
    }

    ${({ theme }) => `
        border: 1px solid ${theme.colors.danger.opacity(0.4)};
        background: ${theme.colors.danger.opacity(0.025)};
        color: ${theme.colors.danger};
    `}
`;
