import styled from '@ui/util/styled';
import { createGlobalStyle } from 'styled-components';

interface IContentContainerProps {
  padded?: boolean;
}

export const GlobalStyle = createGlobalStyle`
  ${({ theme }) => `
    @import url('https://fonts.googleapis.com/css?family=Red+Hat+Display:400,500,700|Roboto:400,500,700&display=swap');

    html {
      font-size: 16px;
      -webkit-overflow-scrolling: touch;
    }

    button {
      cursor: pointer;
      border: none;
      background: transparent;
      padding: 0;
      font-size: inherit;
    }

    input,
    textarea {
      margin: 0;
      padding: 0;
      border: none;
      cursor: inherit;
      color: currentColor;
      font-family: inherit;
    }

    body {
      background: ${theme.colors.lightGrey};
      position: absolute;
      margin: 0;
      height: 100vh;
      width: 100vw;
      font-family: 'Roboto', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    svg {
      stroke-width: 2;
    }

    body,
    #root {
      height: 100%;
      width: 100%;
    }

    .react-tiny-popover-container {
      z-index: 9999;
    }

    .ReactModal__Overlay {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.5) !important;
    }

    .ReactModal__Overlay.ReactModal__Overlay--after-open {
      z-index: 99;
    }
  `}
`;

export const AppContainer = styled.div`
  ${({ theme }) => `
        display: flex;
        flex-direction: column;
        height: 100%;
        color: ${theme.colors.text};
    `}
`;

export const ContentContainer = styled.div<IContentContainerProps>`
  ${({ theme, padded }) => `
        background: ${theme.colors.lightGrey};
        flex: 1;
        overflow: auto;
        ${padded ? 'padding: 1rem;' : ''}
    `}
`;
