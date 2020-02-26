import React, { useContext } from 'react';
import { FiTrash2 } from 'react-icons/fi';

import { ConfirmationDialogContainer } from './styles';
import UIStoreContext from '@ui/stores/UIStore';

interface ConfirmationDialogProps {
  title: string;
  onConfirm: () => any;
  onCancel?: () => any;
  icon?: React.ReactElement;
  confirmText?: string;
  cancelText?: string;
  description?: string;
  type?: 'danger' | 'success' | 'warning';
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  type,
  icon
}) => {
  const uiStore = useContext(UIStoreContext);
  const styleType = type || 'success';

  const handleConfirm = async () => {
    try {
      await onConfirm();
      uiStore.goBack();
    } catch (err) {
      throw err;
    }
  };

  const handleCancel = async () => {
    try {
      if (onCancel) await onCancel();
      else uiStore.goBack();
    } catch (err) {
      throw err;
    }
  };

  return (
    <ConfirmationDialogContainer type={styleType}>
      {icon && (
        <div className="dialog-icon">
          <FiTrash2 />
        </div>
      )}
      <div className="dialog-title">{title}</div>
      <div className="dialog-description">{description}</div>
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
