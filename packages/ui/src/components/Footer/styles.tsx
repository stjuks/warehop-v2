import styled from '@ui/util/styled';

export const FooterContainer = styled.div`
    ${({ theme }) => `
        color: ${theme.colors.text};
        background: ${theme.colors.lightGrey};
        border-top: 1px solid ${theme.colors.lightColor1};
    `}

    flex-shrink: 0;
    position: relative;
    padding: 0 1rem;
    height: 3.5rem;
    display: flex
    align-items: center;
    justify-content: space-around;
`;

export const FooterItemContainer = styled.div`
  text-decoration: none;
  text-align: center;
  font-family: 'Red Hat Display', sans-serif;
  font-weight: 400;
  display: flex;
  align-items: center;

  .footer-item__active .footer-item__label {
    font-weight: 700;
  }

  ${({ theme }) => `
        * { color: ${theme.colors.text}; }
    `}
`;

export const IconContainer = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LabelContainer = styled.div.attrs({ className: 'footer-item__label' })`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  width: 3rem;
  font-family: 'Red Hat Display', sans-serif;
`;
