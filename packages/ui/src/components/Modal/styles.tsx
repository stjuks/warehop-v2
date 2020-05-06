import styled from '@ui/util/styled';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export const ModalContainer = styled(ReactModal)`
  ${({ theme }) => `
    &&.ReactModal__Content.ReactModal__Content--after-open {
      display: flex;
      flex-direction: column;
      border-radius: 0.25rem;
      outline: none;
      overflow: hidden;
      max-height: 95%;
      min-width: ${theme.devices.mobileS};

      @media only screen and (max-width: ${theme.devices.mobileL}) {
        height: 100%;
        width: 100%;
        border-radius: 0;
        max-height: 100%;
      }

      @media only screen and (min-width: ${theme.devices.mobileL}) {
        min-width: calc(${theme.devices.mobileL} - 1rem);
        max-height: 30rem;
      }
    }
  `}
`;
