import React from 'react';
import Input from '../Input';

const FileInput = ({ name, setFieldValue }) => {
    const handleChange = e => {
        const file = e.currentTarget.files[0];
        setFieldValue(name, file);
    };

    return (
        <input type="file" onChange={handleChange} />
    );
};

export default FileInput;
