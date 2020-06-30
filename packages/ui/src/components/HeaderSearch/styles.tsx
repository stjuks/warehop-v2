import styled from 'styled-components';
import theme from '@ui/styles/theme';

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
  width: ${({ isOpened }) => (isOpened ? '100%' : '0%')};
  transform: scaleX(${({ isOpened }) => (isOpened ? '1' : '0')});
  ${({ isOpened }) => (isOpened ? 'margin-left: 0;' : '')}

  transform-origin: right;
  display: flex;
  height: 100%;
  transition: all 0.2s ease-in-out;
  justify-content: flex-end;
  box-sizing: border-box;
  position: relative;
  margin: 0 0.5rem 0 0.75rem;
  font-family: ${theme.fonts.primary};
  border: 1px solid ${theme.colors.midGrey.rgb()};
  border-radius: 2rem;
  background: ${theme.colors.white.rgb()};

  input {
    border: none;
    width: 100%;
    min-width: 0;
    font-size: 1rem;
    padding-left: 0.75rem;
    padding-right: 0.5rem;
    outline: none;
    color: ${theme.colors.text.rgb()};
    background: transparent;

    ::placeholder {
      color: ${theme.colors.lightText.rgb()};
    }
  }
`;

export const IconContainer = styled.button`
  display: flex;
  color: currentColor;
`;
