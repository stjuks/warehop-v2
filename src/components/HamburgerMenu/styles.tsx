import styled from 'styled-components';

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
        
        &.${transitionName}-enter-done {
            right: 0;
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
