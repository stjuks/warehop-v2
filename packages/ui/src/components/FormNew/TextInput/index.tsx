import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

import TextBasedInput, { InputAction } from '../TextBasedInput';
import FormikField from '../util/FormikField';

interface BaseTextInputProps {
  className?: string;
  label?: string;
  type?: 'text' | 'decimal' | 'numeric' | 'email' | 'tel';
  indicator?: string | React.ReactElement;
}

interface TextInputProps extends BaseTextInputProps {
  value: string;
  onChange: (value: string | number | undefined) => any;
  error?: string;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  onChange,
  error,
  value,
  className,
  type,
  indicator
}) => {
  const [isFocused, setFocused] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    onBlur: () => setFocused(false)
  };

  return (
    <TextBasedInput
      label={label}
      className={className}
      isFocused={isFocused}
      value={value}
      error={error}
      inputComponent={
        <input
          onChange={handleChange}
          value={value || ''}
          className="input-field"
          inputMode={type || 'text'}
          {...handleFocus}
        />
      }
      actions={actions}
    />
  );
};

interface FormikTextInputProps extends BaseTextInputProps {
  name: string;
}

export const FormikTextInput: React.FC<FormikTextInputProps> = ({ name, ...restProps }) => (
  <FormikField name={name}>
    {fieldProps => <TextInput {...fieldProps} {...restProps} />}
  </FormikField>
);

export default TextInput;
