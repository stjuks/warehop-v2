import styled, { css } from 'styled-components';
import ReactTinyPopover from 'react-tiny-popover';
import theme from '../../util/theme';

export const ContentContainer = styled.div`
    background: ${theme.colors.white};
    box-shadow: ${theme.lightShadow};
    border-radius: 0.5rem;
    padding: 0.5rem 0;
    border: 1px solid ${theme.colors.lightColor1};
    display: flex;
    flex-direction: column;
    color: red;
`;

export const MenuItemContainer = styled.button`
    padding: 0.5rem 1rem;
    text-align: left;
    color: ${theme.colors.text};
    font-family: 'Roboto', sans-serif;
    display: flex;
    align-items: center;

    :hover,
    :focus {
        color: ${theme.colors.primary};
        border-radius: 0.5rem;
    }
`;
