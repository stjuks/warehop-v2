import styled from 'styled-components';

export const FormContainer = styled.form`
    ${({ theme }) => `
        .form-subtitle {
            padding: 0.25rem 1rem;
            text-transform: uppercase;
            box-shadow: inset 2px 0 0 ${theme.colors.primary};
            color: ${theme.colors.text};
            font-family: 'Red Hat Display', sans-serif;
            font-size: 0.875rem;
            font-weight: 500;
            margin: 1rem 0 1rem 0;
        }
    `}
`;
