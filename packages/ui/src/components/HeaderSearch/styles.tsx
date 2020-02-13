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
        transform: scaleX(${isOpened ? '1' : '0'});
        transform-origin: right;
        display: flex;
        height: 100%;
        transition: all .2s ease-in-out;
        justify-content: flex-end;
        box-sizing: border-box;
        position: relative;
        margin: 0 0.5rem 0 0.75rem;
        ${isOpened ? 'margin-left: 0;' : ''}
        font-family: 'Roboto', sans-serif;
        border: 1px solid ${theme.colors.midGrey};
        border-radius: 2rem;
        background: ${theme.colors.white};

        input {
            border: none;
            width: 100%;
            min-width: 0;
            font-size: 1rem;
            padding-left: 0.75rem;
            padding-right: 0.5rem;
            outline: none;
            color: ${theme.colors.text};
            background: transparent;

            ::placeholder {
                color: ${theme.colors.lightText};
            }
        }
    `}
`;

export const IconContainer = styled.button`
  display: flex;
  color: currentColor;
`;
