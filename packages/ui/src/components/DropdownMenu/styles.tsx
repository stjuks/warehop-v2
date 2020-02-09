import styled from '@ui/util/styled';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';

export const DropdownMenuWrapper = styled(Wrapper).attrs({
  className: 'dropdown-wrapper'
})`
  position: relative;
  font-family: 'Roboto', sans-serif;
`;

export const MenuButton = styled(Button).attrs({ className: 'dropdown-btn' })`
  display: flex;
  align-items: center;
`;

export const DropdownMenuContainer = styled(Menu).attrs({
  className: 'dropdown-menu'
})`
  position: absolute;
  top: calc(100% + 0.25rem);
  right: 0;

  font-size: 1rem;
  padding: 0.375rem 0;

  ${({ theme }) => `
    background: ${theme.colors.lightGrey};
    box-shadow: ${theme.lightShadow};
    border: 1px solid ${theme.colors.midGrey};
    border-radius: 0.25rem;
  `}
`;

export const DropdownMenuItem = styled(MenuItem).attrs({
  className: 'dropdown-menu-item'
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

  ${({ theme }) => `
    color: ${theme.colors.lightText};

    :hover,
    :focus {
      color: ${theme.colors.primary};
    }
  `}
`;
