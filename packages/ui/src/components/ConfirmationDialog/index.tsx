import React, { useContext, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

import { ConfirmationDialogContainer } from './styles';
import UIStoreContext from '@ui/stores/UIStore';
import { FormErrorContainer } from '../Form/FormError/styles';

interface ConfirmationDialogProps {
  title: string;
  onConfirm: () => any;
  onCancel?: () => any;
  icon?: React.ReactElement;
  confirmText?: string;
  cancelText?: string;
  description?: string;
  type?: 'danger' | 'success' | 'warning';
  callBackRoute?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  type,
  icon,
  callBackRoute
}) => {
  const uiStore = useContext(UIStoreContext);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const styleType = type || 'success';

  const handleConfirm = async () => {
    try {
      await onConfirm();
      if (callBackRoute) uiStore.goTo(callBackRoute, { replace: true });
      else uiStore.goBack();
    } catch (err) {
      if (err.messages) setErrorMessages(err.messages);
    }
  };

  const handleCancel = async () => {
    try {
      if (onCancel) await onCancel();
      else uiStore.goBack();
    } catch (err) {
      if (err.messages) setErrorMessages(err.messages);
    }
  };

  return (
    <ConfirmationDialogContainer type={styleType}>
      {icon && (
        <div className="dialog-icon">
          {icon}
        </div>
      )}
      <div className="dialog-title">{title}</div>
      <div className="dialog-description">{description}</div>
      {errorMessages.length > 0 && (
        <FormErrorContainer>
          <ul>
            {errorMessages.map(msg => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        </FormErrorContainer>
      )}

      <div className="btn-container">
        <button className="cancel-btn" onClick={handleCancel}>
          {cancelText || 'Tühista'}
        </button>
        <button className="confirm-btn" onClick={handleConfirm}>
          {confirmText || 'Kinnita'}
        </button>
      </div>
    </ConfirmationDialogContainer>
  );
};

export default ConfirmationDialog;
