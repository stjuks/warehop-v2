import React from 'react';

import { ToggleInputContainer } from './styles';
import FormikField from '../util/FormikField';

interface BaseToggleInputProps {
  name: string;
  label: string;
}

interface ToggleInputProps extends BaseToggleInputProps {
  value: boolean;
  onChange: (value: boolean) => any;
}

const ToggleInput: React.FC<ToggleInputProps> = ({ name, label, onChange, value }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    onChange(checked);
  };

  return (
    <ToggleInputContainer>
      <input type="checkbox" onChange={handleChange} checked={value === true} name={name} />
      <span className="indicator-container">
        <span className="indicator" />
      </span>
      <span className="label">{label}</span>
    </ToggleInputContainer>
  );
};

export const FormikToggleInput: React.FC<BaseToggleInputProps> = props => (
  <FormikField name={props.name}>
    {fieldProps => <ToggleInput {...props} {...fieldProps} />}
  </FormikField>
);

export default ToggleInput;
