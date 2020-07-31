import React, { useContext } from 'react';
import { ToastsContainer } from './styles';
import UIStoreContext from '@ui/stores/UIStore';
import Toast from '../Toast';
import { observer } from 'mobx-react-lite';

const Toasts: React.FC = observer(() => {
  const uiStore = useContext(UIStoreContext);

  return (
    <ToastsContainer>
      {uiStore.toasts.map((props, index) => (
        <Toast {...props} index={index} key={props.text} />
      ))}
    </ToastsContainer>
  );
});

export default Toasts;
