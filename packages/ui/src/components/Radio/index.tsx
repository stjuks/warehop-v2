import React, { useContext, useEffect, useState } from 'react';

import { RadioContainer, RadioOptionContainer } from './styles';

export interface RadioProps {
  options: {
    label: string;
    value: any;
  }[];
  name: string;
  onSelect: (value: any) => void;
  defaultValue?: any;
}

const Radio: React.FC<RadioProps> = ({ options, name, onSelect, defaultValue }) => {
  const [value, setValue] = useState(undefined);

  const handleSelect = selectedValue => {
    setValue(selectedValue);
    onSelect(selectedValue);
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      onSelect(defaultValue);
    }
  }, []);

  return (
    <RadioContainer>
      {options.map((option, i) => (
        <RadioOptionContainer key={i}>
          <input
            type='radio'
            name={name}
            id={`${name}${i}`}
            onChange={() => handleSelect(option.value)}
            checked={value === option.value}
          />
          <label htmlFor={`${name}${i}`}>{option.label}</label>
        </RadioOptionContainer>
      ))}
    </RadioContainer>
  );
};

export default Radio;
