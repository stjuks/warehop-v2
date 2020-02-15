import styled from '@ui/util/styled';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';

export const WrapperContainer = styled(Wrapper).attrs({
  className: 'select-wrapper'
})`
  .input-field {
    position: relative;
    cursor: default;
  }
`;

export const ButtonContainer = styled(Button).attrs({
  className: 'select-btn'
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
  ${({ theme }) => `
        position: absolute;
        top: calc(100% + 0.25rem);
        width: 100%;
        display: flex;
        flex-direction: column;
        border: 1px solid ${theme.colors.midGrey};
        background: ${theme.colors.lightGrey};
        box-shadow: ${theme.blueShadow};
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
            box-shadow: ${theme.lightShadow};
            background: ${theme.colors.midGrey};
        }

        &.react-autosuggest__suggestions-container {
            display: none;
        }

        &.react-autosuggest__suggestions-container--open {
            display: block;
        }
    `}
`;

export const MenuItemContainer = styled(MenuItem).attrs({
  className: 'select-menu-item'
})`
  ${({ theme }) => `
        padding: 0.5rem 1rem;
        font-weight: 500;
        outline: none;
        border-radius: 0.25rem;

        :focus,
        :hover {
            background: ${theme.colors.midGrey};
        }

        &[data-active="true"] {
            background: ${theme.colors.primary};
            box-shadow: none;
            color: ${theme.colors.lightGrey};
        }
    `}
`;

export const SearchInput = styled.input`
  ${({ theme }) => `
        cursor: text;
        outline: none;
        background: ${theme.colors.lightColor1};
        border: 1px solid ${theme.colors.midGrey};
        padding: 0.5rem 2rem 0.5rem 1rem;
        color: currentColor;
        border-radius: 0.25rem;
        font-size: 1rem;
        font-weight: 500;
        flex: 1;

        ::placeholder {
          font-weight: 400;
        }

        :focus {
            border: 1px solid ${theme.colors.darkGrey};
        }
    `}
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
  ${({ theme }) => `
    color: ${theme.colors.lightText};
    font-weight: 500;
    padding: 0.5rem 1rem;
    margin-top: 0.25rem;
    background: ${theme.colors.lightColor1};
    border-radius: 3rem;
    border: 1px solid ${theme.colors.midGrey};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;

    :hover,
    :focus {
      color: ${theme.colors.primary};
      border-color: ${theme.colors.darkGrey};
    }
  `}
`;
