import styled from '@ui/util/styled';

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
            transition: all .2s;
            border: 1px solid ${theme.colors.lightColor1};
            color: ${theme.colors.lightText};
            justify-content: center;
        }

        input:focus ~ label,
        input:hover ~ label {
            border-color: ${theme.colors.lightText};
        }

        input:checked ~ label {
            font-weight: 500;
            color: ${theme.colors.primary};
            border-color: ${theme.colors.primary};
            box-shadow: ${theme.lightShadow};
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
