import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { LocationDescriptorObject } from 'history';
import UIStoreContext from '@ui/stores/UIStore';

interface LinkProps {
  to: string | LocationDescriptorObject;
  className?: string;
  onClick?: () => any;
  isNavLink?: boolean;
  activeClassName?: string;
}

const Link: React.FC<LinkProps> = ({
  children,
  to,
  className,
  onClick,
  isNavLink,
  activeClassName
}) => {
  const uiStore = useContext(UIStoreContext);
  const history = useHistory();

  const pathname: string = typeof to === 'string' ? to : to.pathname || '';

  const isActive = isNavLink ? history.location.pathname.startsWith(pathname) : false;

  const handleRoute = () => {
    if (typeof to === 'object' && pathname) {
      uiStore.goTo(pathname, to);
    } else if (typeof to === 'string') {
      uiStore.goTo(pathname);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRoute();
    }
  };

  const handleClick = e => {
    e.preventDefault();
    if (onClick) onClick();
    handleRoute();
  };

  return (
    <a
      href={pathname}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`${className} ${isActive ? activeClassName || 'link-active' : ''}`}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </a>
  );
};

export default Link;
