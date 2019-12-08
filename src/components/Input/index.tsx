import React, { ChangeEvent } from 'react';
import { FiX } from 'react-icons/fi';

import { InputContainer } from './styles';

export interface InputProps {
    name?: string;
    value: any;
    onChange?(event: ChangeEvent<Element>): void;
    label?: string | null;
    error?: string;
    icon?: any;
    setFieldValue?: Function;
    inputType?: 'password' | 'number' | 'text' | 'email' | 'file';
    readOnly?: boolean;
}

const Input: React.FC<InputProps> = ({
    name,
    value,
    onChange,
    label,
    error,
    icon,
    setFieldValue,
    inputType = 'text',
    readOnly = false
}) => {
    return (
        <InputContainer value={value}>
            {label && (
                <label className="label" htmlFor={name}>
                    {label}
                </label>
            )}
            <div className="input-wrapper">
                <input
                    tabIndex={readOnly ? -1 : 0}
                    readOnly={readOnly}
                    type={inputType}
                    className="input-field"
                    name={name}
                    value={value || ''}
                    onChange={onChange}
                    autoComplete="off"
                />
                <div className="input-underline" />
                {value && setFieldValue && (
                    <button type="button" className="input-clear" onClick={() => setFieldValue(name, '')}>
                        <FiX />
                    </button>
                )}
                {icon && <div className="input-icon">{icon}</div>}
            </div>
            <div className="error-message">{error}</div>
        </InputContainer>
    );
};

export default Input;
