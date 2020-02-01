import React from 'react';
import styled from '../../../util/styled';

interface DropdownMenuProps {
    items: {
        label: string;
        value: any;
    }[];
    menuProps?: any;
    menuItemProps?: (item: any) => { isActive: boolean };
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, menuProps, menuItemProps }) => (
    <MenuContainer {...menuProps}>
        <ul>
            {items.map((item, i) => {
                const { isActive, ...restProps } = menuItemProps ? menuItemProps(item) : { isActive: false };
                return (
                    <li key={i}>
                        <MenuItemContainer {...restProps} data-active={isActive}>
                            {item.label}
                        </MenuItemContainer>
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

export const MenuItemContainer = styled.div.attrs({
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
