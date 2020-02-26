import styled from '@ui/util/styled';

interface ConfirmationDialogContainerProps {
  type: 'danger' | 'success' | 'warning';
}

export const ConfirmationDialogWrapper = styled.div``;

export const ConfirmationDialogContainer = styled.div<ConfirmationDialogContainerProps>`
  ${({ theme, type }) => `
    flex: 1;
    background: ${theme.colors.lightGrey};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 1.5rem;
    border-radius: 0.25rem;
    margin: 1rem;

    .dialog-icon {
      width: 6rem;
      height: 6rem;
      background: ${theme.colors.midGrey};
      color: ${theme.colors[type]};
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
    }

    .dialog-description {
      color: ${theme.colors.lightText};
      max-width: 75%;
      line-height: 1.5rem;
    }

    .btn-container {
      width: 100%;
      text-align: right;
      margin-top: 0.5rem;

      .confirm-btn {
        background: ${theme.colors[type]};
        color: ${theme.colors.lightGrey};
        margin-left: 1rem;
      }

      button {
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 2rem;
      }
    }

    @media only screen and (max-width: ${theme.devices.mobileL}) {
      border-radius: 0;
      margin: 0;

      .btn-container {
        text-align: center;
      }
    }
  `}
`;
