import React, { ChangeEvent, useState } from 'react';
import { Field, FieldProps } from 'formik';

import { InputContainer } from '../styles';
import { FileInputStyled } from './styles';
import { TextInputBase, InputActionButtons } from '../TextInput';
import { FiFile, FiX } from 'react-icons/fi';

interface FileInputProps {
    name: string;
    label: string;
}

const FileInputBase: React.FC<FileInputProps & FieldProps> = ({ form, field, label }) => {
    const [displayValue, setDisplayValue] = useState('');

    const handleChange = e => {
        const file = e.target.files[0];
        if (file) {
            form.setFieldValue(field.name, file);
            setDisplayValue(file.name);
        } else {
            setDisplayValue('');
        }
    };

    const handleClear = e => {
        e.stopPropagation();
        form.setFieldValue(field.name, undefined);
        setDisplayValue('');
    };

    const InputComponent = (
        <>
            <FileInputStyled type="file" onChange={handleChange} />
            <input onChange={handleChange} readOnly={true} value={displayValue} className="value-container" />
            <InputActionButtons indicator={<FiFile />} action={field.value && { icon: <FiX />, onClick: e => handleClear(e) }} />
        </>
    );

    return (
        <TextInputBase
            value={displayValue}
            readOnly={true}
            name={field.name}
            label={label}
            inputComponent={InputComponent}
        />
    );
};

const FileInput: React.FC<FileInputProps> = props => <Field {...props} component={FileInputBase} />;

export default FileInput;
