import React from 'react';

import { ToggleInputContainer } from './styles';
import { useFormikContext } from 'formik';
import { getObjectProperty } from '@ui/util/helpers';

interface ToggleInputProps {
  name: string;
  label: string;
}

const ToggleInput: React.FC<ToggleInputProps> = ({ name, label }) => {
  const { setFieldValue, values } = useFormikContext<any>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    setFieldValue(name, checked);
  };

  const value = JSON.stringify(getObjectProperty(values, name));

  return (
    <ToggleInputContainer>
      <input type="checkbox" onChange={handleChange} checked={value === 'true'} />
      <span className="indicator-container">
        <span className="indicator" />
      </span>
      <span className="label">{label}</span>
    </ToggleInputContainer>
  );
};

export default ToggleInput;
