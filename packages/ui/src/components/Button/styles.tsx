import styled from '@ui/util/styled';

export const ButtonContainer = styled.button`
  ${({ theme }) => `
        background: ${theme.colors.primary};
        color: ${theme.colors.white};
        width: 100%;
        flex: 1;
        font-weight: 700;
        border-radius: 3rem;
        padding: 0.75rem;
        transition: all .2s;

        :hover,
        :focus {
            background: ${theme.colors.primaryLight};
            box-shadow: ${theme.blueShadow};
            transform: scale(1.005);
            outline: none;
        }

        :disabled,
        :disabled :hover,
        :disabled :focus {
            background: ${theme.colors.midGrey};
            color: ${theme.colors.lightText};
            box-shadow: none;
            transform: none;
        }
    `}
`;
