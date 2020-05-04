import React, { useContext, useEffect, useState } from 'react';

import { RadioContainer, RadioOptionContainer } from './styles';
import { isEqual } from '@ui/util/helpers';

export interface RadioProps {
  options: {
    label: string | React.ReactElement;
    value: any;
  }[];
  name: string;
  onSelect: (value: any) => void;
  defaultValue?: any;
}

const Radio: React.FC<RadioProps> = ({ options, name, onSelect, defaultValue }) => {
  const [value, setValue] = useState(undefined);

  const handleSelect = (selectedValue) => {
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
      {options.map((option, i) => {
        return (
          <RadioOptionContainer key={i}>
            <input
              type="radio"
              name={name}
              id={`${name}${i}`}
              onChange={() => handleSelect(option.value)}
              checked={isEqual(value, option.value)}
            />
            <label htmlFor={`${name}${i}`}>{option.label}</label>
          </RadioOptionContainer>
        );
      })}
    </RadioContainer>
  );
};

export default Radio;
