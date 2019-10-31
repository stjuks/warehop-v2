import styled from 'styled-components';
import { InputContainer } from '../Input/styles';

interface IMenuSelectContainerProps {
    isSortable?: boolean;
}

interface ISortButtonContainer {
    sortDirection: Number;
}

export const MenuSelectContainer = styled.div<IMenuSelectContainerProps>`
    ${({ theme }) => `
        display: flex;

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
            border-color: ${theme.colors.lightText};
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
            border-radius: 0 0 1.25rem 1.25rem;
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
            padding-bottom: 0.5rem;
        }

        .menu-select__indicators {
            color: ${theme.colors.lightText};
            padding: 0 0 0 0.25rem;
            z-index: 9999;

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
            color: ${
                sortDirection > 0
                    ? theme.colors.primary
                    : theme.colors.lightText
            };
            margin-right: -0.125rem;
        }

        svg:last-child {
            color: ${
                sortDirection > 0
                    ? theme.colors.lightText
                    : theme.colors.primary
            };
        }
    `}
`;

export const FormSelectContainer = styled(InputContainer)`
    ${({ theme }) => `
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

        .form-select__indicators {
            width: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${theme.colors.lightText};
        }
    `}
`;
