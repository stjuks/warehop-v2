import React from 'react';
import { Field, FieldProps } from 'formik';

import { InputContainer } from '../styles';

interface RadioInputProps {}

const RadioInput: React.FC<RadioInputProps & FieldProps> = () => {
    return <InputContainer></InputContainer>;
};

const RadioInputField: React.FC<RadioInputProps> = props => <Field {...props} component={RadioInput} />;

export default RadioInputField;
