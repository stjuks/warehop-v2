import React, { useState, useRef, useEffect } from 'react';
import { FieldProps, Field, FormikProps } from 'formik';
import { FiX } from 'react-icons/fi';

import {
  InputContainer,
  LabelContainer,
  InputFieldContainer,
  ErrorMessageContainer,
  InputIndicatorContainer
} from '../styles';

export interface TextInputBaseProps {
  name: string;
  label?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => any;
  value?: string;
  errorMessage?: any;
  inputComponent?: JSX.Element;
  indicator?: string | JSX.Element;
  inputMode?: 'text' | 'decimal' | 'numeric' | 'email' | 'tel';
  type?: 'text' | 'number' | 'password' | 'email' | 'tel';
  setFieldValue?: (field: string, value: any) => any;
  inputFieldRef?: any;
  readOnly?: boolean;
  onFocus?: (isFocused: boolean) => any;
  isTextarea?: boolean;
  validate?: any;
  className?: string;
  notClearable?: boolean;
}

interface InputActionProps {
  action?: {
    icon: JSX.Element;
    onClick: (e: any) => any;
  };
  indicator?: JSX.Element | string;
}

export const InputActionButtons: React.FC<InputActionProps> = ({ action, indicator }) => {
  return (
    <>
      {action && (
        <InputIndicatorContainer style={{ cursor: 'pointer', zIndex: 4 }} onClick={action.onClick}>
          {action.icon}
        </InputIndicatorContainer>
      )}
      {indicator && <InputIndicatorContainer>{indicator}</InputIndicatorContainer>}
    </>
  );
};

export const TextInputBase: React.FC<TextInputBaseProps> = ({
  label,
  onChange,
  value,
  errorMessage,
  name,
  inputComponent,
  type,
  inputMode,
  indicator,
  setFieldValue,
  inputFieldRef,
  readOnly,
  onFocus,
  isTextarea,
  className,
  notClearable
}) => {
  const [isFocused, setFocused] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (setFieldValue) setFieldValue(name, null);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleFocus = isFocused => {
    setFocused(isFocused);
    if (onFocus) onFocus(isFocused);
  };

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  return (
    <InputContainer className={className || ''}>
      {label && <LabelContainer>{label}</LabelContainer>}
      <InputFieldContainer
        onFocus={() => handleFocus(true)}
        onBlur={() => handleFocus(false)}
        isFocused={isFocused}
        isMounted={isMounted}
        hasValue={value != null && value !== ''}
        className="input-field"
      >
        {inputComponent || (
          <>
            {isTextarea ? (
              <textarea
                ref={inputFieldRef || inputRef}
                onChange={onChange}
                value={value || ''}
                name={name}
                autoComplete="off"
                className="value-container"
              />
            ) : (
              <input
                ref={inputFieldRef || inputRef}
                onChange={onChange}
                inputMode={inputMode}
                value={value || ''}
                type={type}
                name={name}
                autoComplete="off"
                className="value-container"
                readOnly={readOnly}
              />
            )}
            <InputActionButtons
              indicator={indicator}
              action={
                value && !notClearable ? { icon: <FiX />, onClick: e => handleClear(e) } : undefined
              }
            />
          </>
        )}
      </InputFieldContainer>
      <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
    </InputContainer>
  );
};

const TextInput: React.FC<TextInputBaseProps> = props => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    form: FormikProps<any>
  ) => {
    const { type } = props;
    let value: any = e.target.value;

    if (type === 'number' && !isNaN(value)) value = Number(value);
    if (value === '') value = null;

    form.setFieldValue(props.name, value);
  };

  return (
    <Field name={props.name} validate={props.validate}>
      {({ field, form }: FieldProps) => (
        <TextInputBase
          setFieldValue={form.setFieldValue}
          onChange={e => handleChange(e, form)}
          value={field.value}
          name={field.name}
          errorMessage={form.errors[field.name]}
          {...props}
        />
      )}
    </Field>
  );
};

export default TextInput;
