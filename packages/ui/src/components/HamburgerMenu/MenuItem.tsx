import React from 'react';
import { MenuItemContainer } from './styles';

export interface IMenuItemProps {
  label: string;
  icon: React.ReactElement;
  onClick?: () => any;
  to: string;
}

const MenuItem: React.FC<IMenuItemProps> = ({ label, icon, to, onClick }) => {
  return (
    <MenuItemContainer to={to} onClick={onClick}>
      <span className="icon-container">{icon}</span>
      <span className="label-container">{label}</span>
    </MenuItemContainer>
  );
};

export default MenuItem;
