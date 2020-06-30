import styled from 'styled-components';
import theme from '@ui/styles/theme';

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
    background: ${theme.colors.lightGrey.rgb()};
    border-radius: 4rem;
    border: 1px solid ${theme.colors.darkGrey.rgb()};
    position: relative;

    .indicator {
      transition: all 0.2s;
      height: 1.25rem;
      width: 1.25rem;
      background: ${theme.colors.lightColor1.rgb()};
      border: 1px solid ${theme.colors.darkGrey.rgb()};
      left: 25%;
      top: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
      border-radius: 50%;
    }
  }

  input:checked + .indicator-container {
    background: ${theme.colors.primary.opacity(0.05)};

    .indicator {
      background: ${theme.colors.primary.rgb()};
      left: 75%;
    }
  }
`;
