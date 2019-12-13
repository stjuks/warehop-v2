import React, { useState, useRef } from 'react';
import { FieldProps, Field, FormikErrors } from 'formik';

import {
    InputContainer,
    LabelContainer,
    InputFieldContainer,
    ErrorMessageContainer,
    InputIndicatorContainer
} from '../styles';
import { FiX } from 'react-icons/fi';

interface InputProps {
    name: string;
    label: string;
    onChange?: (e: any) => any;
    value?: string;
    errorMessage?: any;
    inputComponent?: JSX.Element;
    indicator?: string | JSX.Element;
    type?: 'text' | 'number' | 'password' | 'email';
    setFieldValue?: (field: string, value: any) => any;
    inputFieldRef?: any;
    readOnly?: boolean;
    onFocus?: (isFocused: boolean) => any;
}

interface InputActionProps {
    action?: {
        icon: JSX.Element;
        onClick: (e: Event) => any;
    };
    indicator?: JSX.Element | string;
}

export const InputActionButtons: React.FC<InputActionProps> = ({ action, indicator }) => {
    return (
        <>
            {action && (
                <InputIndicatorContainer style={{ cursor: 'pointer', zIndex: 4 }}>
                    {React.cloneElement(action.icon, { onClick: action.onClick })}
                </InputIndicatorContainer>
            )}
            {indicator && <InputIndicatorContainer>{indicator}</InputIndicatorContainer>}
        </>
    );
};

export const TextInputBase: React.FC<InputProps> = ({
    label,
    onChange,
    value,
    errorMessage,
    name,
    inputComponent,
    type = 'text',
    indicator,
    setFieldValue,
    inputFieldRef,
    readOnly,
    onFocus
}) => {
    const [isFocused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClear = e => {
        e.stopPropagation();
        if (setFieldValue) setFieldValue(name, '');
        if (inputRef.current) inputRef.current.focus();
    };
    
    const handleFocus = isFocused => {
        setFocused(isFocused);
        if (onFocus) onFocus(isFocused);
    }

    return (
        <InputContainer>
            <LabelContainer>{label}</LabelContainer>
            <InputFieldContainer
                onFocus={() => handleFocus(true)}
                onBlur={() => handleFocus(false)}
                isFocused={isFocused || (value != null && value != '')}
                className="input-field"
            >
                {inputComponent || (
                    <>
                        <input
                            ref={inputFieldRef || inputRef}
                            onChange={onChange}
                            value={value}
                            type={type}
                            name={name}
                            autoComplete="off"
                            className="value-container"
                            readOnly={readOnly}
                        />
                        <InputActionButtons
                            indicator={indicator}
                            action={value ? { icon: <FiX />, onClick: e => handleClear(e) } : undefined}
                        />
                    </>
                )}
            </InputFieldContainer>
            <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
        </InputContainer>
    );
};

const TextInput: React.FC<InputProps> = props => (
    <Field name={props.name}>
        {({ field, form }: FieldProps) => (
            <TextInputBase
                setFieldValue={form.setFieldValue}
                onChange={field.onChange}
                value={field.value}
                name={field.name}
                errorMessage={form.errors[field.name]}
                {...props}
            />
        )}
    </Field>
);

export default TextInput;
