import styled from '@ui/util/styled';

interface IIconContainerProps {
  size?: string;
  highlighted?: boolean;
}

interface IInputContainerProps {
  isOpened: boolean;
}

export const HeaderSearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;

  svg {
    flex-shrink: 0;
  }
`;

export const InputContainer = styled.div<IInputContainerProps>`
  ${({ theme, isOpened }) => `
        width: ${isOpened ? '100%' : '0%'};
        display: flex;
        height: 100%;
        transition: all .2s ease-in-out;
        justify-content: flex-end;
        position: relative;
        margin: 0 0.5rem 0 0.75rem;
        font-family: 'Roboto', sans-serif;

        input {
            border: none;
            width: 100%;
            min-width: 0;
            font-size: 1rem;
            outline: none;
            color: ${theme.colors.text};

            ::placeholder {
                color: ${theme.colors.lightText};
            }
        }

        :after {
            content: '';
            position: absolute;
            bottom: 0;
            height: 1px;
            width: 100%;
            background: ${theme.colors.midGrey};
        }
    `}
`;

export const IconContainer = styled.button`
  display: flex;
  color: currentColor;
`;
