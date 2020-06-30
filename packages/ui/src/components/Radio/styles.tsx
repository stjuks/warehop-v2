import styled from 'styled-components';
import theme from '@ui/styles/theme';

export const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  input {
    position: absolute;
    opacity: 0;
  }

  label {
    height: 2.5rem;
    font-size: 0.875rem;
    padding: 0 0.75rem;
    display: flex;
    align-items: center;
    background: ${theme.colors.white.rgb()};
    border-radius: 4rem;
    transition: all 0.2s;
    border: 1px solid ${theme.colors.lightColor1.rgb()};
    justify-content: center;

    span {
      color: ${theme.colors.lightText.rgb()};
    }
  }

  input:focus ~ label,
  input:hover ~ label {
    border-color: ${theme.colors.darkGrey.rgb()};
  }

  input:checked ~ label {
    span {
      font-weight: 500;
      color: ${theme.colors.primary.rgb()};
    }

    border-color: ${theme.colors.primary.rgb()};
    box-shadow: ${theme.shadows.lightShadow};
  }
`;

export const RadioOptionContainer = styled.div`
  flex: 1;

  :not(:last-child) {
    margin-right: 0.25rem;
  }

  :not(:first-child) {
    margin-left: 0.25rem;
  }
`;
