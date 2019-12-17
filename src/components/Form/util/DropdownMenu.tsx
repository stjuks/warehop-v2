import React from 'react';
import styled from 'styled-components';

interface DropdownMenuProps {
    items: {
        label: string;
        value: any;
    }[];
    menuProps?: any;
    menuItemProps?: (item: any) => any;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, menuProps, menuItemProps }) => (
    <MenuContainer {...menuProps}>
        <ul>
            {items.map((item, i) => {
                const itemProps = menuItemProps ? menuItemProps(item) : {};
                return (
                    <li key={i}>
                        <MenuItemContainer {...itemProps}>{item.label}</MenuItemContainer>
                    </li>
                );
            })}
        </ul>
    </MenuContainer>
);

export const MenuContainer = styled.div.attrs({ className: 'select-menu' })`
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

interface MenuItemProps {
    isActive?: boolean;
    [x: string]: any;
}

export const MenuItemContainer = styled.div.attrs({
    className: 'select-menu-item'
})<MenuItemProps>`
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