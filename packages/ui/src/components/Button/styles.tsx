import styled from 'styled-components';
import theme from '@ui/styles/theme';

export const ButtonContainer = styled.button`
  background: ${theme.colors.primary.rgb()};
  color: ${theme.colors.white.rgb()};
  width: 100%;
  flex: 1;
  font-weight: 700;
  border-radius: 3rem;
  padding: 0.75rem;
  transition: all 0.2s;

  :hover,
  :focus {
    background: ${theme.colors.primaryLight.rgb()};
    box-shadow: ${theme.shadows.blueShadow};
    transform: scale(1.005);
    outline: none;
  }

  :disabled,
  :disabled :hover,
  :disabled :focus {
    background: ${theme.colors.midGrey.rgb()};
    color: ${theme.colors.lightText.rgb()};
    box-shadow: none;
    transform: none;
  }
`;
