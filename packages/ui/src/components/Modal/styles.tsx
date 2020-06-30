import styled from 'styled-components';
import theme from '@ui/styles/theme';
import media from '@ui/styles/media';

import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export const ModalContainer = styled(ReactModal)`
  &&.ReactModal__Content.ReactModal__Content--after-open {
    display: flex;
    flex-direction: column;
    border-radius: 0.25rem;
    outline: none;
    overflow: hidden;
    max-height: 95%;
    min-width: 400px;
    background: white;
    margin: 1rem;

    ${media.xs`
      height: 100%;
      width: 100%;
      border-radius: 0;
      max-height: 100%;
      margin: 0;
    `}

    ${media.s`
      min-width: calc(400px - 1rem);
    `}
  }
`;
