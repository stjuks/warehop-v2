import React from 'react';
import { FiFile } from 'react-icons/fi';

import { FileInputContainer } from './styles';
import Input from '../Input';

interface FileInputProps {
    value: File | null;
    setFieldValue: Function;
    name: string;
    label: string;
}

const FileInput: React.FC<FileInputProps> = ({ name, setFieldValue, value, label }) => {
    const handleChange = e => {
        const file = e.currentTarget.files[0];
        setFieldValue(name, file);
    };

    return (
        <FileInputContainer>
            <Input icon={<FiFile />} name={name} readOnly={true} value={value ? value.name : ''} label={label} />
            <input type="file" onChange={handleChange} className="file-input" />
        </FileInputContainer>
    );
};

export default FileInput;
