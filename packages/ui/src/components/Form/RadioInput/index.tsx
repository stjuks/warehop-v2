import React from 'react';
import { Field, FieldProps, useFormikContext } from 'formik';

import { InputContainer } from '../styles';
import { RadioInputContainer } from './styles';
import { getObjectProperty, isEqual } from '@ui/util/helpers';

interface RadioInputProps {
  name: string;
  label: string;
  value: any;
}

const RadioInput: React.FC<RadioInputProps> = ({ label, name, value }) => {
  const { values, setFieldValue } = useFormikContext<any>();

  const handleChange = (e) => {
    setFieldValue(name, value);
  };

  const fieldValue = JSON.stringify(getObjectProperty(values, name));

  const isChecked = isEqual(JSON.stringify(getObjectProperty(values, name)), JSON.stringify(value));

  return (
    <RadioInputContainer>
      <input type="radio" name={name} onChange={handleChange} checked={isChecked} value={fieldValue} />
      {label}
    </RadioInputContainer>
  );
};

export default RadioInput;
