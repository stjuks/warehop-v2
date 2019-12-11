import React from 'react';
import { Formik, Form } from 'formik';
import moment from 'moment';
import * as yup from 'yup';
import { FiChevronDown } from 'react-icons/fi';

import DateInput from './DateInput';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import { request } from '../../api';

interface FormValues {
    date: moment.Moment;
    file: File | null;
    radio: 'tere' | 'headaega' | 'aitäh';
    userType: number | null;
    username: string;
    password: string;
}

const FormExample = () => {
    const initialValues: FormValues = {
        date: moment(),
        file: null,
        radio: 'tere',
        userType: null,
        username: '',
        password: ''
    };

    const validationSchema = yup.object({
        username: yup.string().required('Palun sisesta kasutajanimi.')
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
                <form onSubmit={formikProps.handleSubmit}>
                    <TextInput name="username" label="Kasutajanimi" />
                    <TextInput name="password" label="Parool" type="password" />
                    <SelectInput
                        name="userType"
                        label="Kasutaja tüüp"
                        options={options}
                        mapValues={{ value: 'id', label: 'name' }}
                        asyncOptions={request.get({
                            url: '/mock',
                            mockData: [
                                { value: 'tere', label: 'xd' },
                                { value: 'lol', label: 'ahah' }
                            ]
                        })}
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
        </Formik>
    );
};

export default FormExample;
