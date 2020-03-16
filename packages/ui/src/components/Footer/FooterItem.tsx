import React from 'react';
import Link from '../util/Link';

import { FooterItemContainer, IconContainer, LabelContainer } from './styles';

export interface IFooterItemProps {
  icon: React.ReactElement;
  label?: string;
  onClick?: (ref, event?: React.MouseEvent<HTMLElement>) => any;
  to?: string;
}

function FooterItem({ icon, label, onClick, to }: IFooterItemProps) {
  const ItemComponent = () => (
    <>
      <IconContainer>{icon}</IconContainer>
      {label && <LabelContainer>{label}</LabelContainer>}
    </>
  );

  return (
    <FooterItemContainer>
      {to ? (
        <Link to={to} activeClassName="footer-item__active" isNavLink>
          <ItemComponent />
        </Link>
      ) : (
        <button type="button" onClick={onClick}>
          <ItemComponent />
        </button>
      )}
    </FooterItemContainer>
  );
}

export default FooterItem;
