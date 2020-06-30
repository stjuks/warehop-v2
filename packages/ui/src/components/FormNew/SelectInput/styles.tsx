import styled from 'styled-components';
import theme from '@ui/styles/theme';

import { Wrapper } from 'react-aria-menubutton';

export const SelectInputContainer = styled(Wrapper).attrs({
  className: 'select-wrapper',
})``;

export const SelectMenuWrapper = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;

  .input-field {
    height: 100%;
  }

  .select-menu-btn {
    width: 100%;
  }

  .select-menu-item {
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 0.5rem;
    font-weight: 500;
    color: ${theme.colors.text.rgb()};

    :hover,
    :focus {
      outline: none;
      background: ${theme.colors.lightGrey.rgb()};
    }
  }

  .select-menu-item.active {
    background: blue;
  }

  .select-menu {
    box-sizing: border-box;
    z-index: 9999;
    width: 100%;
    position: absolute;
    top: 100%;
    background: white;
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    border: 1px solid #f0f0f0;
    padding: 0.25rem;

    &[data-has-action='true'] {
      border-bottom-left-radius: 1.5rem;
      border-bottom-right-radius: 1.5rem;
    }

    .options-list {
      max-height: 10rem;
      overflow: auto;
    }

    .search-input {
      margin-bottom: 0.25rem;
      border-radius: 0.5rem;

      :hover,
      :focus {
        border-color: ${theme.colors.darkGrey.rgb()};
        background: ${theme.colors.lightGrey.rgb()};
      }
    }

    .search-input,
    .action-btn {
      outline: none;
      display: flex;
      align-items: center;
      padding: 0.25rem 0.5rem;
      height: 2.5rem;
      font-size: 1rem;
      width: 100%;
      border: 1px solid ${theme.colors.midGrey.rgb()};
      box-sizing: border-box;
    }

    .action-btn {
      background: ${theme.colors.lightGrey.rgb()};
      color: ${theme.colors.primary.rgb()};
      border-radius: 5rem;
      margin-top: 0.25rem;
      transition: all 0.2s;
      font-weight: 500;
      justify-content: center;
      cursor: pointer;

      :hover,
      :focus {
        border-color: ${theme.colors.darkGrey.rgb()};
      }
    }
  }
`;
