import React from 'react';

import { ModalContainer } from './styles';
import Header from '../Header';
import { ContentContainer } from '../App/styles';
import { FooterContainer } from '../Footer/styles';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  backTo?: string;
  headerContent?: JSX.Element;
  footerContent?: JSX.Element;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, footerContent, title, backTo }) => {
  return <ModalContainer isOpen={isOpen}>{children}</ModalContainer>;
};

export default Modal;
