import React from 'react';
import { Field, FieldProps } from 'formik';

import { InputContainer } from '../styles';

interface FileInputProps {}

const FileInput: React.FC<FileInputProps & FieldProps> = () => {
    return <InputContainer></InputContainer>;
};

const FileInputField: React.FC<FileInputProps> = props => <Field {...props} component={FileInput} />;

export default FileInputField;
