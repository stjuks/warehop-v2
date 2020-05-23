import React from 'react';
import { TextBasedInputContainer } from './styles';

export interface InputAction {
  onClick?: () => any;
  icon: string | React.ReactElement;
}

interface TextBasedInputProps {
  inputComponent: React.ReactElement;
  value: string | undefined;
  isFocused: boolean;
  error?: string;
  label?: string;
  className?: string;
  actions?: InputAction[];
}

const TextBasedInput: React.FC<TextBasedInputProps> = ({
  inputComponent,
  value,
  error,
  label,
  actions,
  isFocused,
  className,
}) => (
  <TextBasedInputContainer className={className} actionLength={actions?.length}>
    {label && <label>{label}</label>}
    <div className="input-container" data-focused={isFocused} data-active={!!value}>
      {inputComponent}
      {actions && (
        <div className="actions">
          {actions.map((action, i) =>
            action.onClick ? (
              <button
                key={i}
                className="action-btn indicator"
                type="button"
                onClick={action.onClick}
              >
                {action.icon}
              </button>
            ) : (
              <div key={i} className="indicator">
                {action.icon}
              </div>
            )
          )}
        </div>
      )}
      <div className="active-line" />
    </div>
    <div className="error-message">{typeof error === 'string' && error}</div>
  </TextBasedInputContainer>
);

export default TextBasedInput;
