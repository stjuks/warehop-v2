import styled from 'styled-components';

export const ToggleInputContainer = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 1rem 0.25rem;

  input {
    position: absolute;
    opacity: 0;
    z-index: -999;
  }

  .label {
    font-weight: 500;
  }

  .indicator-container {
    margin-right: 0.5rem;
    width: 2.5rem;
    height: 1rem;
    background: #f0f0f0;
    border-radius: 4rem;
    border: 1px solid #e0e0e0;
    position: relative;

    .indicator {
      transition: all 0.2s;
      height: 1.25rem;
      width: 1.25rem;
      background: #f0f0f0;
      border: 1px solid #e0e0e0;
      left: 25%;
      top: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
      border-radius: 50%;
    }
  }

  input:checked + .indicator-container {
    background: rgba(0, 0, 255, 0.1);

    .indicator {
      background: blue;
      left: 75%;
    }
  }
`;
