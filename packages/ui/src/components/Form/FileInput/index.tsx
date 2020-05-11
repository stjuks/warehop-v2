import React, { useState, useEffect } from 'react';
import { FieldProps, Field } from 'formik';

import { FileInputStyled } from './styles';
import { TextInputBase, InputActionButtons } from '../TextInput';
import { FiFile, FiX } from 'react-icons/fi';

interface FileInputProps {
  name: string;
  label: string;
  accept?: string;
}

const FileInputBase: React.FC<FileInputProps & FieldProps> = ({ form, field, label, accept }) => {
  const [displayValue, setDisplayValue] = useState('');

  const handleChange = (e) => {
    const file = e.target.files[0];
    form.setFieldValue(field.name, file);
  };

  const handleClear = (e?: any) => {
    e?.stopPropagation();
    form.setFieldValue(field.name, undefined);
    setDisplayValue('');
  };

  useEffect(() => {
    if (field.value) {
      if (typeof field.value === 'string') setDisplayValue(field.value);
      else if (field.value instanceof File) {
        setDisplayValue(field.value.name);
      }
    } else setDisplayValue('');
  }, [field.value]);

  const InputComponent = (
    <>
      <FileInputStyled type="file" onChange={handleChange} accept={accept} />
      <input
        onChange={handleChange}
        readOnly={true}
        value={displayValue}
        className="value-container"
        tabIndex={-1}
      />
      <InputActionButtons
        indicator={<FiFile />}
        action={field.value && { icon: <FiX />, onClick: (e) => handleClear(e) }}
      />
    </>
  );

  return (
    <TextInputBase
      value={displayValue}
      readOnly={true}
      name={field.name}
      label={label}
      inputComponent={InputComponent}
      errorMessage={form.errors[field.name]}
    />
  );
};

const FileInput: React.FC<FileInputProps> = (props) => (
  <Field {...props} component={FileInputBase} />
);

export default FileInput;
