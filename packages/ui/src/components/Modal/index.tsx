import React, { useContext } from 'react';

import { ModalContainer } from './styles';
import { observer } from 'mobx-react-lite';
import UIStoreContext from '@ui/stores/UIStore';

const Modal: React.FC = observer(() => {
  const uiStore = useContext(UIStoreContext);

  const isOpen = uiStore.modals.length > 0;
  const content = isOpen ? uiStore.modals[uiStore.modals.length - 1] : null;

  return <ModalContainer isOpen={isOpen}>{content}</ModalContainer>;
});

export default Modal;
