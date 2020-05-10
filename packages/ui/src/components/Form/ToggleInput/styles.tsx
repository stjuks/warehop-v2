import styled from 'styled-components';

export const ToggleInputContainer = styled.label`
  ${({ theme }) => `
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 1rem 0.25rem;
    color: ${theme.colors.text};

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
      background: ${theme.colors.midGrey};
      border-radius: 4rem;
      border: 1px solid ${theme.colors.darkGrey};
      position: relative;

      .indicator {
        transition: all .2s;
        height: 1.25rem;
        width: 1.25rem;
        background: ${theme.colors.midGrey};
        border: 1px solid ${theme.colors.darkGrey};
        left: 25%;
        top: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        border-radius: 50%;
      }
    }

    input:checked + .indicator-container {
      background: ${theme.colors.primary.opacity(0.1)};
      
      .indicator {
        background: ${theme.colors.primary};
        left: 75%;
      }
    }
  `}
`;
