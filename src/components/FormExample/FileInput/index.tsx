import React from 'react';
import { Field, FieldProps } from 'formik';

import { InputContainer } from '../styles';

interface DateInputProps {}

const DateInput: React.FC<DateInputProps & FieldProps> = () => {
    return <InputContainer></InputContainer>;
};

const DateInputField: React.FC<DateInputProps> = props => <Field {...props} component={DateInput} />;

export default DateInputField;
