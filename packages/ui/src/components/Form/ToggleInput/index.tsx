import React from 'react';

import { ToggleInputContainer } from './styles';
import { useFormikContext } from 'formik';

interface ToggleInputProps {
  name: string;
  label: string;
}

const ToggleInput: React.FC<ToggleInputProps> = ({ name, label }) => {
  const { setFieldValue } = useFormikContext<any>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    setFieldValue(name, checked);
  };

  return (
    <ToggleInputContainer>
      <input type="checkbox" onChange={handleChange} />
      <span className="indicator-container">
        <span className="indicator" />
      </span>
      <span className="label">{label}</span>
    </ToggleInputContainer>
  );
};

export default ToggleInput;
