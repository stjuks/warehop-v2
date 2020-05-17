import styled from 'styled-components';
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
    padding: 0.375rem 0.5rem;
    cursor: pointer;
    border-radius: 0.25rem;

    :hover,
    :focus {
      background: #f0f0f0;
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
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border: 1px solid #f0f0f0;
    padding: 0.25rem;

    .options-list {
      max-height: 10rem;
      overflow: auto;
    }

    .search-input {
      margin-bottom: 0.25rem;
    }

    .search-input,
    .action-btn {
      outline: none;
      display: flex;
      align-items: center;
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      height: 2.375rem;
      width: 100%;
      border: 1px solid #f0f0f0;
      border-radius: 0.25rem;
      box-sizing: border-box;
    }

    .action-btn {
      border: 1px solid blue;
      color: blue;
      margin-top: 0.25rem;
      justify-content: center;
      cursor: pointer;
    }
  }
`;
