import React, { useContext } from 'react';
import { ToastContainer, ToastWrapper } from './styles';
import { FaTimesCircle, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import UIStoreContext from '@ui/stores/UIStore';
import { FiX } from 'react-icons/fi';

export interface ToastProps {
  type: 'danger' | 'success' | 'warning';
  text: string;
}

interface ToastComponentProps extends ToastProps {
  index: number;
}

const icon = {
  danger: <FaTimesCircle />,
  success: <FaCheckCircle />,
  warning: <FaExclamationCircle />,
};

const Toast: React.FC<ToastComponentProps> = ({ type, text, index }) => {
  const uiStore = useContext(UIStoreContext);

  const handleClose = () => {
    uiStore.closeToast(index);
  };

  return (
    <ToastWrapper>
      <ToastContainer data-type={type} onClick={handleClose}>
        <div className="icon-container type-icon">{icon[type]}</div>
        <span className="toast-text">{text}</span>
        <div className="icon-container close-btn">
          <FiX />
        </div>
      </ToastContainer>
    </ToastWrapper>
  );
};

export default Toast;
