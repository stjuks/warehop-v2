import styled from 'styled-components';

interface IMenuSelectContainerProps {
    isSortable?: boolean;
}

interface ISortButtonContainer {
    sortDirection: Number;
}

interface IFormSelectContainerProps {
    isFocused?: boolean;
    value?: any;
}

export const MenuSelectContainer = styled.div<IMenuSelectContainerProps>`
    ${({ theme }) => `
        display: flex;
        min-width: 11rem;

        .form-select-container,
        .menu-select-container {
            flex: 1;
        }
        
        .menu-select__control {
            border: 1px solid ${theme.colors.lightColor1};
            border-radius: 1.25rem;
            transition: none;
            height: 2.5rem;
            overflow: hidden;
            background: ${theme.colors.white};
        }

        .menu-select__value-container {
            padding: 0 0.75rem;
        }

        .menu-select__control--menu-is-open {
            border-radius: 1.25rem 1.25rem 0 0;
        }

        .menu-select__control--is-focused,
        .menu-select__control--is-focused:hover,
        .menu-select__control--is-focused ~ .menu-select__menu {
            border-color: ${theme.colors.text};
            box-shadow: none;
        }

        .menu-select__single-value {
            color: ${theme.colors.text};
        }

        .menu-select__menu {
            margin: 0;
            border-radius: 0;
            border: solid ${theme.colors.lightColor1};
            border-width: 0 1px 1px 1px;
            border-radius: 0 0 0.5rem 0.5rem;
            background: ${theme.colors.white};
        }

        .menu-select__option {
            border-radius: 0.5rem;
        }

        .menu-select__option--is-selected {
            background: ${theme.colors.primary};
            color: ${theme.colors.lightColor1};
        }

        .menu-select__group, 
        .menu-select__menu-list {
            margin: 0;
            padding-bottom: 0;
        }

        .menu-select__menu-list {
            padding: 0 0.25rem 0.25rem 0.25rem;
        }

        .menu-select__indicators {
            color: ${theme.colors.lightText};
            padding: 0 0 0 0.25rem;

            .sort-buttons {
                border: none;
                background: transparent;
                height: 100%;
                padding: 0 0.5rem 0 0.25rem;
                border-left: 1px solid ${theme.colors.lightColor1};
                display: flex;
                align-items: center;
                outline: none;
                cursor: pointer;

                :hover, :focus {
                    background: ${theme.colors.midGrey};
                }
            }
        }

        .menu-select__control,
        .menu-select__menu {
            font-size: 0.875rem;
        }

        .menu-select__control {
            font-weight: 500;
        }
    `}
`;

export const SortButtonContainer = styled.button<ISortButtonContainer>`
    ${({ theme, sortDirection }) => `
        background: ${theme.colors.white};
        height: 100%;
        border-radius 0 1.25rem 1.25rem 0;
        border: solid ${theme.colors.lightColor1};
        border-width: 0 1px 1px 1px;
        padding: 0 0.5rem 0 0.25rem;
        display: flex;
        align-items: center;
        outline: none;
        font-size: 0.875rem;

        :hover, :focus {
            background: ${theme.colors.lightGrey};
        }

        svg:first-child {
            color: ${sortDirection > 0 ? theme.colors.primary : theme.colors.lightText};
            margin-right: -0.125rem;
        }

        svg:last-child {
            color: ${sortDirection > 0 ? theme.colors.lightText : theme.colors.primary};
        }
    `}
`;

export const FormSelectContainer = styled.div<IFormSelectContainerProps>`
    ${({ theme, isFocused, value }) => `
        flex: 1;

        .form-select__control,
        .form-select__indicator,
        .form-select__value-container,
        .form-select__value-container--has-value,
        .form-select__single-value {
            min-height: 0;
            height: 2rem;
            border: none;
            padding: 0;
            margin: 0;
            font-family: 'Roboto', sans-serif;
            background: transparent;
        }

        .form-select__single-value {
            display: flex;
            align-items: center;
            color: ${theme.colors.text};
            font-weight: 500;
        }

        .form-select__control--is-focused {
            outline: none;
            border: none;
            box-shadow: none;
        }

        .form-select-container {
            flex: 1;
            height: 2rem;
        }

        .form-select__placeholder {
            margin: 0;
        }

        .form-select__indicators {
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${theme.colors.lightText};

            svg { color: ${theme.colors.lightText}; }

            .indicator-icon {
                width: 1.5rem;
            }
        }

        .form-select__menu {
            font-weight: 500;
            margin: 0.25rem 0;
            border-radius: 0.5rem;
            border: 1px solid ${theme.colors.lightColor1};
            box-shadow: ${theme.lightShadow};
        }

        .form-select__menu-list {
            padding: 0.25rem;
        }

        .form-select__option--is-selected {
            color: ${theme.colors.white};
            background: ${theme.colors.primary};
        }

        .form-select__option {
            border-radius: 0.5rem;
        }

        ${(isFocused || value) &&
            `
            && .input-underline:after {
                transform: scaleX(1);
            }
        `}
    `}
`;

export const AddButtonContainer = styled.button`
    ${({ theme }) => `
        background: ${theme.colors.white};
        border: 1px dashed ${theme.colors.primary};
        color: ${theme.colors.primary};
        border-radius: 0.5rem;
        width: 100%;
        padding: 0.5rem;
        font-weight: 500;
        margin-bottom: 0.25rem;
        display: flex;
        justify-content: center;
        align-items: center;

        :hover,
        :focus {
            background: ${theme.colors.lightColor1};
        }
    `}
`;
