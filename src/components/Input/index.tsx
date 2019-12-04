import React, { ChangeEvent } from 'react';
import { FiX } from 'react-icons/fi';

import { InputContainer } from './styles';

interface IInputProps {
    name: string;
    value: any;
    onChange(event: ChangeEvent<Element>): void;
    label?: string | null;
    error?: string;
    icon?: any;
    setFieldValue?: Function;
    type?: 'password' | 'number' | 'text' | 'email' | 'file';
}

function Input({ name, value, onChange, label, error, icon, setFieldValue, type = 'text' }: IInputProps) {
    return (
        <InputContainer value={value}>
            {label && (
                <label className="label" htmlFor={name}>
                    {label}
                </label>
            )}
            <div className="input-wrapper">
                <input
                    type={type}
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
}

export default Input;
