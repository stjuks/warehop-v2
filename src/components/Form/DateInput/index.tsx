import React from 'react';
import { FieldProps, Field } from 'formik';
import Flatpickr from 'react-flatpickr';
import { Estonian } from 'flatpickr/dist/l10n/et';
import { FiCalendar } from 'react-icons/fi';
import moment from 'moment';

import { InputContainer } from '../styles';
import { TextInputBase } from '../TextInput';

interface DateInputProps {
    name: string;
    label: string;
}

const DateInputBase: React.FC<DateInputProps & FieldProps> = ({ name, label, form, field }) => {
    const handleChange = date => {
        form.setFieldValue(field.name, date[0]);
    };

    const formattedValue = field.value ? moment(field.value).format('DD.MM.YYYY') : '';

    return (
        <Flatpickr
            value={formattedValue}
            onChange={handleChange}
            options={{
                locale: Estonian,
                disableMobile: true,
                dateFormat: 'd.m.Y'
            }}
            render={({ value }, ref) => {
                return (
                    <TextInputBase
                        value={value}
                        name={field.name}
                        label={label}
                        inputFieldRef={ref}
                        readOnly={true}
                        indicator={<FiCalendar />}
                        setFieldValue={form.setFieldValue}
                        errorMessage={form.errors[field.name]}
                    />
                );
            }}
        />
    );
};

const DateInput: React.FC<DateInputProps> = props => <Field {...props} component={DateInputBase} />;

export default DateInput;
