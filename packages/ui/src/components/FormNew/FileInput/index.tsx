import React, { useState } from 'react';
import TextBasedInput, { InputAction } from '../TextBasedInput';
import { FileInputContainer } from './styles';
import { FiFile, FiX } from 'react-icons/fi';
import FormikField from '../util/FormikField';

interface BaseFileInputProps {
  className?: string;
  accept?: string;
  label?: string;
}

interface FileInputProps extends BaseFileInputProps {
  onChange: (value: File | undefined) => any;
  error?: string;
  value?: File | string;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  onChange,
  error,
  value,
  className,
  accept
}) => {
  const [isFocused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const file = e.target.files[0];

      if (file) onChange(file);
    }
  };

  const handleClear = () => {
    onChange(undefined);
  };

  const handleFocus = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false)
  };

  const displayValue = typeof value === 'string' ? value : value?.name;

  const actions: InputAction[] = [{ icon: <FiFile /> }];

  if (!!value) {
    actions.unshift({ icon: <FiX />, onClick: handleClear });
  }

  return (
    <TextBasedInput
      label={label}
      className={className}
      isFocused={isFocused}
      value={displayValue}
      actions={actions}
      error={error}
      inputComponent={
        <FileInputContainer>
          <input type="file" onChange={handleChange} accept={accept} {...handleFocus} />
          <div className="input-field">{displayValue || ''}</div>
        </FileInputContainer>
      }
    />
  );
};

interface FormikFileInputProps extends BaseFileInputProps {
  name: string;
}

export const FormikFileInput: React.FC<FormikFileInputProps> = ({ name, ...restProps }) => (
  <FormikField name={name}>
    {fieldProps => <FileInput {...restProps} {...fieldProps} />}
  </FormikField>
);

export default FileInput;
