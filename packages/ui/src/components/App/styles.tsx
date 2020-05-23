import styled from '@ui/util/styled';
import { createGlobalStyle } from 'styled-components';

interface IContentContainerProps {
  padded?: boolean;
}

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Red+Hat+Display:400,500,700|Roboto:400,500,700&display=swap');

  html {
    font-size: 16px;
    -webkit-overflow-scrolling: touch;
    color: ${({ theme }) => `${theme.colors.text}`};

    * {
      font-family: 'Roboto', sans-serif;
    }
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
    min-width: 0 !important;
    font-family: inherit;
  }

  body {
    background: ${({ theme }) => `${theme.colors.lightGrey}`};
    position: absolute;
    margin: 0;
    height: 100vh;
    width: 100vw;
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

  .flatpickr-weekdays,
  span.flatpickr-weekday,
  .flatpickr-months .flatpickr-month,
  .flatpickr-current-month .flatpickr-monthDropdown-months,
  .flatpickr-current-month input.cur-year {
    background: ${({ theme }) => `${theme.colors.primary}`};
    color: ${({ theme }) => `${theme.colors.white}`};
  }

  .flatpickr-current-month 
  .flatpickr-monthDropdown-months 
  .flatpickr-monthDropdown-month {
    background: ${({ theme }) => `${theme.colors.white}`};
  }

  .flatpickr-day.selected, 
  .flatpickr-day.startRange, 
  .flatpickr-day.endRange, 
  .flatpickr-day.selected.inRange, 
  .flatpickr-day.startRange.inRange, 
  .flatpickr-day.endRange.inRange, 
  .flatpickr-day.selected:focus, 
  .flatpickr-day.startRange:focus, 
  .flatpickr-day.endRange:focus, 
  .flatpickr-day.selected:hover, 
  .flatpickr-day.startRange:hover, 
  .flatpickr-day.endRange:hover, 
  .flatpickr-day.selected.prevMonthDay, 
  .flatpickr-day.startRange.prevMonthDay, 
  .flatpickr-day.endRange.prevMonthDay, 
  .flatpickr-day.selected.nextMonthDay, 
  .flatpickr-day.startRange.nextMonthDay, 
  .flatpickr-day.endRange.nextMonthDay {
    background: ${({ theme }) => `${theme.colors.primary}`};
    border: none;
  }

  .flatpickr-calendar:before, 
  .flatpickr-calendar:after {
    border: none;
  }

  .flatpickr-days {
    border: none;
  }

  .flatpickr-calendar {
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .flatpickr-innerContainer {
    border: none;
  }
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
