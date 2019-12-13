import React, { useState } from 'react';
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
    onChange?: (e: React.ChangeEvent<any>) => any;
    value?: string;
    errorMessage?: any;
    inputComponent?: JSX.Element;
    indicator?: string | JSX.Element;
    type?: 'text' | 'number' | 'password' | 'email';
    isClearable?: boolean;
    setFieldValue?: (field: string, value: any) => any;
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
                <InputIndicatorContainer style={{ cursor: 'pointer', zIndex: 9999 }}>
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
    isClearable,
    setFieldValue
}) => {
    const [isFocused, setFocused] = useState(false);

    const handleClear = e => {
        e.stopPropagation();
        console.log('xd');
        if (setFieldValue) setFieldValue(name, '');
    };

    return (
        <InputContainer>
            <LabelContainer>{label}</LabelContainer>
            <InputFieldContainer
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                isFocused={isFocused || (value != null && value != '')}
                className="input-field"
            >
                {inputComponent || (
                    <>
                        <input
                            onChange={onChange}
                            value={value}
                            type={type}
                            name={name}
                            autoComplete="off"
                            className="value-container"
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
