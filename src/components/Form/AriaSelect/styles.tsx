import React from 'react';
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
        border: 1px solid ${theme.colors.midGrey};
        background: ${theme.colors.lightGrey};
        box-shadow: ${theme.blueShadow};
        padding: 0.25rem;
        box-sizing: border-box;
        border-radius: 0.25rem;
        z-index: 99;

        ul {
            margin: 0;
            list-style-type: none;
            padding: 0;
        }
    `}
`;

export const MenuItemContainer = styled(({ isActive, ...rest }) => <MenuItem {...rest} />).attrs({
    className: 'select-menu-item'
})`
    ${({ theme, isActive }) => `
        padding: 0.5rem 1rem;
        font-weight: 500;
        outline: none;
        border-radius: 0.25rem;


        ${
            isActive
                ? `
            background: ${theme.colors.primary};
            box-shadow: none;
            color: ${theme.colors.lightGrey};
        `
                : `
            :focus,
            :hover {
            box-shadow: ${theme.lightShadow};
            background: ${theme.colors.midGrey};
        }`
        }
    `}
`;
