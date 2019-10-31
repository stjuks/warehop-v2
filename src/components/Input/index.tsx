import React, { useState, ChangeEvent, ReactElement } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';

import { InputContainer } from './styles';

interface IInputProps {
    name: string;
    value: any;
    onChange(event: ChangeEvent<Element>): void;
    label: string;
    error?: string;
    icon?: ReactElement;
    setFieldValue?: Function;
    type?: 'password' | 'number' | 'text' | 'email';
}

function Input({
    name,
    value,
    onChange,
    label,
    error,
    icon,
    setFieldValue,
    type = 'text'
}: IInputProps) {
    return (
        <InputContainer value={value}>
            <label className="label" htmlFor={name}>
                {label}
            </label>
            <div className="input-wrapper">
                <input
                    type={type}
                    className="input-field"
                    name={name}
                    value={value}
                    onChange={onChange}
                    autoComplete="off"
                />
                <div className="input-underline" />
                {value && setFieldValue && (
                    <div
                        className="input-clear"
                        onClick={() => setFieldValue(name, '')}
                    >
                        <FiX />
                    </div>
                )}
                {icon && <div className="input-icon">{icon}</div>}
            </div>
            <div className="error-message">{error}</div>
        </InputContainer>
    );
}

export function Select({ label, name, value, error, onChange }) {
    return (
        <InputContainer value={value}>
            <label className="label" htmlFor={name}>
                {label}
            </label>
            <div className="error-message">{error}</div>
        </InputContainer>
    );
}

export default Input;
