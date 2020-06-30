import styled from 'styled-components';
import theme from '@ui/styles/theme';
import mixins from '@ui/styles/mixins';

export const FooterContainer = styled.div`
  color: ${theme.colors.text.rgb()};
  background: ${theme.colors.lightGrey.rgb()};
  border-top: 1px solid ${theme.colors.lightColor1.rgb()};

  flex-shrink: 0;
  position: relative;
  padding: 0 1rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const FooterItemContainer = styled.div`
  text-decoration: none;
  text-align: center;
  font-family: ${theme.fonts.secondary};
  font-weight: 400;
  display: flex;
  align-items: center;

  .footer-item__active .footer-item__label {
    font-weight: 700;
  }

  * {
    color: ${theme.colors.text.rgb()};
  }
`;

export const IconContainer = styled.div`
  font-size: 1rem;
  ${mixins.flexCenter}
`;

export const LabelContainer = styled.div.attrs({ className: 'footer-item__label' })`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  width: 3rem;
  font-family: ${theme.fonts.secondary};
`;
