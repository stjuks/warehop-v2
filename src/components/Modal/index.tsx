import React from 'react';

import { ModalContainer } from './styles';
import Header from '../Header';
import { ContentContainer } from '../App/styles';

interface ModalProps {
    isOpen: boolean;
    title?: string;
    backTo?: string;
    header?: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, header, title, backTo }) => {
    return (
        <ModalContainer isOpen={isOpen}>
            <Header title={title} backTo={backTo} />
            <ContentContainer padded>
                {children}
            </ContentContainer>
        </ModalContainer>
    );
};

export default Modal;
