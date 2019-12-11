import React from 'react';
import { Field, FieldProps } from 'formik';

import { InputContainer } from '../styles';

interface TextInputBaseProps extends TextInputProps {
    value: string;
    onChange?: () => any;
    onFocus?: () => any;
    onBlur?: () => any;
    errorMessage?: string;
    readOnly?: boolean;
    inputOverlay?: JSX.Element;
    onMouseDown?: () => any;
    onTouchEnd?: () => any;
    innerRef?: any;
}

export const TextInputBase: React.FC<TextInputBaseProps> = ({
    onChange,
    value,
    name,
    label,
    errorMessage,
    type,
    icon,
    readOnly = false,
    inputOverlay,
    onFocus,
    onBlur,
    onMouseDown,
    onTouchEnd,
    innerRef
}) => {
    return (
        <InputContainer>
            {label && <label className="label">{label}</label>}
            <div className="input-field">
                <input
                    name={name}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    type={type}
                    readOnly={readOnly}
                    onMouseDown={onMouseDown}
                    onTouchEnd={onTouchEnd}
                    ref={innerRef}
                />
                {icon && <div className="icon">{icon}</div>}
                {inputOverlay && <div className="input-overlay">{inputOverlay}</div>}
            </div>
            <div className="error-message">{errorMessage}</div>
        </InputContainer>
    );
};

interface TextInputProps {
    name: string;
    label?: string;
    type?: 'password' | 'email' | 'number';
    icon?: JSX.Element | string;
}

const TextInput: React.FC<TextInputProps> = props => (
    <Field name={props.name}>
        {({ field, form }) => (
            <TextInputBase
                {...props}
                onChange={field.onChange}
                value={field.value}
                errorMessage={form.errors[field.name]}
            />
        )}
    </Field>
);

export default TextInput;
