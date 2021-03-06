import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { Estonian } from 'flatpickr/dist/l10n/et';
import moment from 'moment';
import TextBasedInput, { InputAction } from '../TextBasedInput';
import { FiX, FiCalendar } from 'react-icons/fi';
import FormikField from '../util/FormikField';

interface BaseDateInputProps {
  className?: string;
  label?: string;
  isClearable?: boolean;
}

interface DateInputProps extends BaseDateInputProps {
  value: string | Date;
  onChange: (value: Date | undefined) => any;
  error?: string;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, error, onChange, className, isClearable }) => {
  const [isFocused, setFocused] = useState(false);

  const handleChange = (values: Date[]) => {
    onChange(values[0]);
  };

  const handleClear = () => {
    onChange(undefined);
  };

  const handleFocus = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  const displayValue = value ? moment(value).format('DD.MM.YYYY') : '';

  const actions: InputAction[] = [{ icon: <FiCalendar /> }];

  if (isClearable && !!value) {
    actions.unshift({ icon: <FiX />, onClick: handleClear });
  }

  return (
    <Flatpickr
      onChange={handleChange}
      value={displayValue}
      options={{ locale: Estonian, disableMobile: true, dateFormat: 'd.m.Y' }}
      render={(_: any, ref: React.RefObject<HTMLInputElement>) => (
        <TextBasedInput
          className={className}
          isFocused={isFocused}
          inputComponent={<input ref={ref} className="input-field" size={1} {...handleFocus} />}
          label={label}
          value={displayValue}
          actions={actions}
          error={error}
        />
      )}
    />
  );
};

interface FormikDateInputProps extends BaseDateInputProps {
  name: string;
}

export const FormikDateInput: React.FC<FormikDateInputProps> = ({ name, ...restProps }) => (
  <FormikField name={name}>
    {(fieldProps) => <DateInput {...restProps} {...fieldProps} />}
  </FormikField>
);

export default DateInput;
