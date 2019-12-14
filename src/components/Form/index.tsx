import React, { PropsWithChildren } from 'react';
import { Formik, FieldArray as FormikFieldArray } from 'formik';
import * as yup from 'yup';

import { FormContainer } from './styles';

import DateInput from './DateInput';
import TextInput from './TextInput';
import AriaSelect from './AriaSelect';
import FileInput from './FileInput';

interface FormValues {
    username: string;
    password: string;
    creationDate: Date;
    userType?: number;
    userFile?: File;
}

const FormExample = () => {
    const initialValues: FormValues = {
        userType: undefined,
        username: '',
        password: '',
        creationDate: new Date(),
        userFile: undefined
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
        userType: yup.mixed().required('Please select user type.'),
        creationDate: yup.mixed().required('Please enter date.')
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
            validateOnBlur={false}
            validateOnMount={false}
        >
            {formikProps => (
                <form onSubmit={formikProps.handleSubmit} style={{ padding: '1rem' }}>
                    <TextInput name="username" label="Kasutajanimi" />
                    <TextInput name="password" label="Parool" />
                    <AriaSelect
                        name="userType"
                        label="Kasutaja tüüp"
                        options={options}
                        optionMap={{ value: 'id', label: 'name' }}
                        isClearable={true}
                    />
                    <DateInput name="creationDate" label="Loomise aeg" />
                    <FileInput name="userFile" label="Fail" />
                    <button type="submit">Submit</button>
                </form>
            )}
        </Formik>
    );
};

interface FieldArrayProps {
    name: string;
}

export const FieldArray: React.FC<FieldArrayProps & PropsWithChildren<any>> = ({ name, children }) => (
    <FormikFieldArray name={name} render={arrayHelpers => children(arrayHelpers)} />
);

interface FormProps {
    initialValues: any;
    onSubmit: (values: any) => any;
    validationSchema?: any;
    id: string;
}

const Form: React.FC<FormProps & React.PropsWithChildren<any>> = ({
    initialValues,
    onSubmit,
    validationSchema,
    id,
    children
}) => (
    <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
    >
        {formikProps => (
            <FormContainer id={id} onSubmit={formikProps.handleSubmit}>
                {children(formikProps)}
            </FormContainer>
        )}
    </Formik>
);

export default Form;
