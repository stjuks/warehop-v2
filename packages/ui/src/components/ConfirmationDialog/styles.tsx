import styled from 'styled-components';
import media from '@ui/styles/media';
import theme from '@ui/styles/theme';

interface ConfirmationDialogContainerProps {
  type: 'danger' | 'success' | 'warning';
}

export const ConfirmationDialogWrapper = styled.div``;

export const ConfirmationDialogContainer = styled.div<ConfirmationDialogContainerProps>`
  flex: 1;
  background: ${theme.colors.lightGrey.rgb()};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 0.25rem;
  color: ${theme.colors.lightText.rgb()};

  .dialog-icon {
    width: 6rem;
    height: 6rem;
    background: ${theme.colors.midGrey.rgb()};
    color: ${({ type }) => theme.colors[type].rgb()};
    border-radius: 50%;
    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .dialog-title,
  .dialog-description {
    padding: 0.5rem;
    text-align: center;
  }

  .dialog-title {
    font-size: 1.25rem;
    font-weight: 500;
    color: ${theme.colors.text.rgb()};
  }

  .dialog-description {
    max-width: 75%;
    line-height: 1.5rem;
  }

  .btn-container {
    width: 100%;
    text-align: right;
    margin-top: 0.5rem;

    .confirm-btn {
      background: ${({ type }) => theme.colors[type].rgb()};
      color: ${theme.colors.lightGrey.rgb()};
      margin-left: 1rem;
    }

    button {
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 2rem;
    }
  }

  ${media.xs`
    border-radius: 0;
    margin: 0;

    .btn-container {
      text-align: center;
    }
  `}
`;
