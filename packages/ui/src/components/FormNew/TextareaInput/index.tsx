import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

import TextBasedInput, { InputAction } from '../TextBasedInput';
import FormikField from '../util/FormikField';
import { TextareaInputContainer } from './styles';

interface BaseTextareaInputProps {
  className?: string;
  label?: string;
  indicator?: string | React.ReactElement;
}

interface TextareaInputProps extends BaseTextareaInputProps {
  value: string;
  onChange: (value: string | number | undefined) => any;
  error?: string;
  className?: string;
}

const TextareaInput: React.FC<TextareaInputProps> = ({
  label,
  onChange,
  error,
  value,
  className,
  indicator,
}) => {
  const [isFocused, setFocused] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange(undefined);
  };

  const actions: InputAction[] = [];

  if (indicator) {
    actions.push({ icon: indicator });
  }

  if (!!value) {
    actions.unshift({ icon: <FiX />, onClick: handleClear });
  }

  const handleFocus = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  return (
    <TextareaInputContainer
      label={label}
      className={className}
      isFocused={isFocused}
      value={value}
      error={error}
      inputComponent={
        <textarea
          onChange={handleChange}
          value={value || ''}
          className="input-field"
          {...handleFocus}
        />
      }
      actions={actions}
    />
  );
};

interface FormikTextareaInputProps extends BaseTextareaInputProps {
  name: string;
}

export const FormikTextareaInput: React.FC<FormikTextareaInputProps> = ({ name, ...restProps }) => (
  <FormikField name={name}>
    {(fieldProps) => <TextareaInput {...fieldProps} {...restProps} />}
  </FormikField>
);

export default TextareaInput;
