import React from 'react';
import { FieldProps, Field } from 'formik';
import Flatpickr from 'react-flatpickr';
import { Estonian } from 'flatpickr/dist/l10n/et';
import { FiCalendar } from 'react-icons/fi';
import moment from 'moment';

import { TextInputBase, TextInputBaseProps } from '../TextInput';

interface DateInputProps {
  name: string;
  label?: string;
  onChange?: (date: Date) => any;
  noFormik?: boolean;
  inputComponent?: (value: { value: string }, ref: React.Ref<any>) => React.ReactElement;
  className?: string;
  value?: string | Date;
}

const DateInputBase: React.FC<DateInputProps & Partial<FieldProps>> = ({
  name,
  label,
  form,
  field,
  inputComponent,
  onChange,
  className,
  value
}) => {
  const handleChange = date => {
    if (onChange) onChange(date[0]);
    if (form && field) form.setFieldValue(field.name, date[0]);
  };

  const formattedValue = field?.value
    ? moment(field.value).format('DD.MM.YYYY')
    : moment(value).format('DD.MM.YYYY');

  return (
    <Flatpickr
      value={formattedValue}
      onChange={handleChange}
      options={{
        locale: Estonian,
        disableMobile: true,
        dateFormat: 'd.m.Y'
      }}
      render={
        inputComponent ||
        (({ value }, ref) => {
          return (
            <TextInputBase
              className={className}
              value={value}
              name={name}
              label={label}
              inputFieldRef={ref}
              readOnly={true}
              indicator={<FiCalendar />}
              setFieldValue={form?.setFieldValue}
              errorMessage={form && field ? form.errors[field.name] : undefined}
              notClearable
            />
          );
        })
      }
    />
  );
};

const DateInput: React.FC<DateInputProps> = ({ noFormik, ...props }) =>
  noFormik ? <DateInputBase {...props} /> : <Field {...props} component={DateInputBase} />;

export default DateInput;
