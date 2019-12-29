import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface TransitionProps {
    transitionName: string;
}

export const MenuContainer = styled.div<TransitionProps>`
    ${({ theme, transitionName }) => `
        width: 15rem;
        position: fixed;
        background: ${theme.colors.text};
        box-shadow: ${theme.lightShadow};
        height: 100vh;
        transition: all .2s;
        right: -15rem;
        top: 0;
        bottom: 0;
        z-index: 9999;
        padding: 1rem 0;
        
        &.${transitionName}-enter-done {
            right: 0;
        }

        .divider {
            width: 100%;
            background: ${theme.colors.lightColor1};
            opacity: .1;
            height: 1px;
            margin: 1rem 0;
        }
    `}
`;

export const BackgroundContainer = styled.div<TransitionProps>`
    ${({ theme, transitionName }) => `
        background: rgba(0, 0, 0, .4);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0;
        transition: all .2s;
        pointer-events: none;
        z-index: 9999;

        &.${transitionName}-enter-done {
            opacity: 1;
            pointer-events: auto;
        }
    `}
`;

export const MenuItemContainer = styled(Link)`
    ${({ theme }) => `
        display: flex;
        color: ${theme.colors.lightColor1};
        padding: 1rem 1.5rem;
        align-items: center;

        :hover,
        :focus {
            background: rgba(255, 255, 255, .05);
        }

        .icon-container {
            font-size: 1.25rem;
            display: flex;
            align-items: center;
            margin-right: 1.5rem;
            opacity: .75;
        }
    `}
`;
