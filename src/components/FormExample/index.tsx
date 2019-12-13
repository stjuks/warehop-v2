import React from 'react';
import { Formik, Form } from 'formik';
import moment from 'moment';
import * as yup from 'yup';
import { FiChevronDown } from 'react-icons/fi';

import DateInput from './DateInput';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import { request } from '../../api';
import AriaSelect from './AriaSelect';

interface FormValues {
    userType: number | undefined;
    username: string;
    password: string;
}

const FormExample = () => {
    const initialValues: FormValues = {
        userType: undefined,
        username: '',
        password: ''
    };

    const validationSchema = yup.object({
        username: yup
            .string()
            .max(12, 'Username must be less than 12 characters.')
            .min(3, 'Username must be more than 3 characters.')
            .required('Please enter username.'),
        password: yup
            .string()
            .max(32, 'Password must be less than 32 characters.')
            .min(6, 'Password must be more than 6 characters.')
            .required('Please enter password.'),
        userType: yup.mixed().required('Please select user type.')
    });

    const handleSubmit = values => {
        alert(JSON.stringify(values));
    };

    const options = [
        { id: 1, name: 'Admin' },
        { id: 2, name: 'Guest' }
    ];

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
        >
            {formikProps => (
                <form onSubmit={formikProps.handleSubmit} style={{ padding: '1rem' }}>
                    <TextInput name="username" label="Kasutajanimi" />
                    <TextInput name="password" label="Parool" type="password" />
                    <AriaSelect
                        name="userType"
                        label="Kasutaja tüüp"
                        options={options}
                        optionMap={{ value: 'id', label: 'name' }}
                        isClearable={true}
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
        </Formik>
    );
};

export default FormExample;
