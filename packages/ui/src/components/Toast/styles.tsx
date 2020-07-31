import styled, { keyframes } from 'styled-components';
import theme from '@ui/styles/theme';

const slideIn = keyframes`
  from {
    transform: translateY(-400%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`

export const ToastContainer = styled.div`
  box-shadow: inset 0.125rem 0 0;
  padding: 1rem;
  border-radius: 0.125rem;
  font-weight: 500;
  pointer-events: auto;
  display: flex;
  align-items: center;
  cursor: pointer;

  &[data-type='danger'] {
    color: ${theme.colors.danger.rgb()};
  }

  &[data-type='success'] {
    color: ${theme.colors.success.rgb()};
  }

  .icon-container {
    display: flex;

    &.type-icon {
      /* keep icon visually vertically centered */
      padding-bottom: 1px;
    }
  }

  svg {
    flex-shrink: 0;
  }

  .toast-text {
    margin-left: 0.5rem;
  }

  .close-btn {
    padding: 0.5rem;
    border-radius: 3rem;
    margin-left: auto;
    color: ${theme.colors.lightText.rgb()};

    :hover,
    :focus {
      background: ${theme.colors.midGrey.rgb()};
    }
  }
`;

export const ToastWrapper = styled.div`
  animation: ${slideIn} .25s ease-out;
  box-shadow: ${theme.shadows.lightShadow}, 0 1rem 2rem ${theme.colors.darkGrey.opacity(0.1)};
  background: ${theme.colors.lightGrey.opacity(0.95)};
  margin: 1rem 0;
  max-width: 20rem;
  width: 100%;
  transition: all 0.2s;

  :hover {
    box-shadow: ${theme.shadows.lightShadow},
      0 0.25rem 0.5rem ${theme.colors.darkGrey.opacity(0.25)};
  }
`;
