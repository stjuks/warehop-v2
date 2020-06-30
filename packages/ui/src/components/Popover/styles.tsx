import styled from 'styled-components';
import theme from '@ui/styles/theme';

export const ContentContainer = styled.div`
  background: ${theme.colors.white.rgb()};
  box-shadow: ${theme.shadows.lightShadow};
  border-radius: 0.25rem;
  padding: 0.5rem 0;
  border: 1px solid ${theme.colors.lightColor1.rgb()};
  display: flex;
  flex-direction: column;
  color: red;
`;

export const MenuItemContainer = styled.button`
  padding: 0.5rem 1rem;
  text-align: left;
  color: ${theme.colors.text.rgb()};
  font-family: ${theme.fonts.primary};
  display: flex;
  align-items: center;

  :hover,
  :focus {
    color: ${theme.colors.primary.rgb()};
    border-radius: 0.25rem;
  }
`;
