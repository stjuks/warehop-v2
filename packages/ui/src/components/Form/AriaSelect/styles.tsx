import styled from 'styled-components';
import theme from '@ui/styles/theme';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';

export const WrapperContainer = styled(Wrapper).attrs({
  className: 'select-wrapper',
})`
  .input-field {
    position: relative;
    cursor: default;
  }
`;

export const ButtonContainer = styled(Button).attrs({
  className: 'select-btn',
})`
  outline: none;

  &,
  .inner-btn-container {
    display: flex;
  }

  .inner-btn-container {
    flex: 1;
  }
`;

export const MenuContainer = styled(Menu).attrs({ className: 'select-menu' })`
  position: absolute;
  top: calc(100% + 0.25rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${theme.colors.midGrey.rgb()};
  background: ${theme.colors.lightGrey.rgb()};
  box-shadow: ${theme.shadows.blueShadow};
  padding: 0.25rem;
  box-sizing: border-box;
  border-radius: 0.25rem;
  z-index: 99;

  .search-container {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;

    .loader {
      position: absolute;
      right: 0.5rem;
    }
  }

  .item-list {
    margin: 0;
    list-style-type: none;
    padding: 0;
    max-height: 15rem;
    overflow: auto;
  }

  .react-autosuggest__suggestion--highlighted .select-menu-item {
    box-shadow: ${theme.shadows.lightShadow};
    background: ${theme.colors.midGrey.rgb()};
  }

  &.react-autosuggest__suggestions-container {
    display: none;
  }

  &.react-autosuggest__suggestions-container--open {
    display: block;
  }
`;

export const MenuItemContainer = styled(MenuItem).attrs({
  className: 'select-menu-item',
})`
  padding: 0.5rem 1rem;
  font-weight: 500;
  outline: none;
  border-radius: 0.25rem;

  :focus,
  :hover {
    background: ${theme.colors.midGrey.rgb()};
  }

  &[data-active='true'] {
    background: ${theme.colors.primary.rgb()};
    box-shadow: none;
    color: ${theme.colors.lightGrey.rgb()};
  }
`;

export const SearchInput = styled.input`
  cursor: text;
  outline: none;
  background: ${theme.colors.lightColor1.rgb()};
  border: 1px solid ${theme.colors.midGrey.rgb()};
  padding: 0.5rem 2rem 0.5rem 1rem;
  color: currentColor;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  flex: 1;
  min-width: 0;

  ::placeholder {
    font-weight: 400;
  }

  :focus {
    border: 1px solid ${theme.colors.darkGrey.rgb()};
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;

  .loader {
    position: absolute;
    right: 0.5rem;
  }
`;

export const ActionButton = styled(MenuItem)`
  color: ${theme.colors.lightText.rgb()};
  font-weight: 500;
  padding: 0.5rem 1rem;
  margin-top: 0.25rem;
  background: ${theme.colors.lightColor1.rgb()};
  border-radius: 3rem;
  border: 1px solid ${theme.colors.midGrey.rgb()};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;

  :hover,
  :focus {
    color: ${theme.colors.primary.rgb()};
    border-color: ${theme.colors.darkGrey.rgb()};
  }
`;
