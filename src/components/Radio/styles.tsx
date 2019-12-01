import styled from 'styled-components';

export const RadioContainer = styled.div`
    ${({ theme }) => `
        display: flex;
        align-items: center;
        flex: 1;

        input {
            position: absolute;
            opacity: 0;
        }

        label {
            height: 2.5rem;
            font-size: 0.875rem;
            padding: 0 0.75rem;
            display: flex;
            align-items: center;
            background: ${theme.colors.white};
            border-radius: 4rem;
            box-sizing: border-box;
            border: 1px solid ${theme.colors.lightColor1};
            justify-content: center;
        }

        input:checked ~ label {
            color: ${theme.colors.primary};
            border-color: ${theme.colors.primary};
            box-shadow: ${theme.lightShadow};
        }

        input:focus ~ label,
        input:hover ~ label {
            box-shadow: ${theme.blueShadow};
            background: ${theme.colors.lightGrey}
        }
    `}
`;

export const RadioOptionContainer = styled.div`
    flex: 1;

    :not(:last-child) {
        margin-right: 0.25rem;
    }

    :not(:first-child) {
        margin-left: 0.25rem;
    }
`;
