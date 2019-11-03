import React, { ChangeEvent } from 'react';
import { FiX } from 'react-icons/fi';

import { InputContainer } from '../Input/styles';
import { TextareaStyled } from './styles';

interface ITextareaProps {
    name: string;
    value: any;
    onChange(event: ChangeEvent<Element>): void;
    label: string;
    error?: string;
    icon?: any;
    setFieldValue?: Function;
    type?: 'password' | 'number' | 'text' | 'email';
}

function Textarea({ name, value, onChange, label, error, icon, setFieldValue }: ITextareaProps) {
    return (
        <InputContainer value={value}>
            <label className="label" htmlFor={name}>
                {label}
            </label>
            <div className="input-wrapper">
                <TextareaStyled
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

export default Textarea;
