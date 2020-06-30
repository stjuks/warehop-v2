import styled from 'styled-components';
import theme from '@ui/styles/theme';

import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';

export const DropdownMenuWrapper = styled(Wrapper).attrs({
  className: 'dropdown-wrapper',
})`
  position: relative;
  font-family: ${theme.fonts.primary};
`;

export const MenuButton = styled(Button).attrs({ className: 'dropdown-btn' })`
  display: flex;
  align-items: center;
`;

export const DropdownMenuContainer = styled(Menu).attrs({
  className: 'dropdown-menu',
})`
  position: absolute;
  top: calc(100% + 0.25rem);
  right: 0;

  font-size: 1rem;
  padding: 0.375rem 0;

  background: ${theme.colors.lightGrey.rgb()};
  box-shadow: ${theme.shadows.lightShadow};
  border: 1px solid ${theme.colors.midGrey.rgb()};
  border-radius: 0.25rem;
`;

export const DropdownMenuItem = styled(MenuItem).attrs({
  className: 'dropdown-menu-item',
})`
  .react-icon {
    margin-right: 0.375rem;
    margin-bottom: 1px;
    opacity: 0.75;
  }

  white-space: nowrap;
  font-weight: 400;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  color: ${theme.colors.lightText.rgb()};

  :hover,
  :focus {
    color: ${theme.colors.primary.rgb()};
  }
`;
