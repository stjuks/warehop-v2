import styled from 'styled-components';

interface TextBasedInputContainerProps {
  actionLength?: number;
}

export const TextBasedInputContainer = styled.div<TextBasedInputContainerProps>`
  margin: 0.25rem;

  input {
    border: none;
    margin: 0;
    padding: 0;
    min-width: 0;
  }

  label {
    margin-bottom: 0;
    height: 1.5rem;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
  }

  .error-message {
    height: 1.25rem;
    font-size: 0.75rem;
    color: red;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  .input-container[data-focused='true'] {
    background: #f0f0f0;

    .actions {
      background: #f0f0f0;
    }
  }

  .input-container[data-active='true'],
  .input-container[data-focused='true'] {
    .active-line:after {
      transform: scaleX(1);
    }
  }

  .input-container {
    min-height: 2.5rem;
    display: flex;
    position: relative;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    transition: all 0.2s;
    align-items: center;

    .active-line {
      transform-origin: left;
      transition: all 0.2s;
      height: 1px;
      bottom: 0px;
      width: 100%;
      background: ${({ theme }) => `${theme.colors.lightText}`};
      position: absolute;

      :after {
        transform-origin: left;
        transition: all 0.2s;
        content: '';
        transform: scaleX(0);
        position: absolute;
        bottom: 1px;
        height: 1px;
        background: ${({ theme }) => `${theme.colors.primary}`};
        width: 100%;
      }
    }

    .input-field {
      ${({ actionLength }) =>
        actionLength ? `padding-right: calc(${actionLength} * 1.75rem);` : ''}
      color: ${({ theme }) => `${theme.colors.text}`};
      padding-left: 0.5rem;
      flex: 1;
      display: flex;
      background: transparent;
      align-items: center;
      outline: none;
      box-sizing: border-box;
      font-size: 1rem;
      font-weight: 500;
    }

    .actions {
      border-top-right-radius: 0.25rem;
      position: absolute;
      display: flex;
      right: 0;
      height: 100%;
      align-items: center;
      transition: all 0.2s;
      background: transparent;
      pointer-events: none;
      
      * {
        color: ${({ theme }) => `${theme.colors.lightText}`};
      }

      .indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        font-size: 1rem;
        border: none;
        background: transparent;
      }

      .action-btn {
        padding: 0;
        border-radius: 50%;
        outline: none;
        pointer-events: auto;

        :hover,
        :focus {
          background: #f0f0f0;
        }
      }
    }
  }
`;
