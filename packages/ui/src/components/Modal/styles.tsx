import styled, { createGlobalStyle } from 'styled-components';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export const ModalContainer = styled(ReactModal)`
    &&.ReactModal__Content.ReactModal__Content--after-open {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
`;
