import styled from 'styled-components';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';

export const WrapperContainer = styled(Wrapper).attrs({ className: 'select-wrapper' })`
    .input-field {
        position: relative;
        cursor: default;
    }
`;

export const ButtonContainer = styled(Button).attrs({ className: 'select-btn' })`
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
        padding: 0.5rem 1rem;
        color: currentColor;
        font-size: 0.875rem;
        border-radius: 0.25rem;
        font-weight: 500;
        margin-bottom: 0.25rem;

        :focus {
            border: 1px solid ${theme.colors.darkGrey};
        }
    `}
`;
