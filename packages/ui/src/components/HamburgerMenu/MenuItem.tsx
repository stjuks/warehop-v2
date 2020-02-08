import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuItemContainer } from './styles';

export interface IMenuItemProps {
  label: string;
  icon: React.ReactElement;
  onClick?: () => void;
  to?: string;
}

const MenuItem: React.FC<IMenuItemProps> = ({ label, icon, to, onClick }) => {
  return (
    <MenuItemContainer to={to} onClick={onClick}>
      <span className='icon-container'>{icon}</span>
      <span className='label-container'>{label}</span>
    </MenuItemContainer>
  );
};

export default MenuItem;
