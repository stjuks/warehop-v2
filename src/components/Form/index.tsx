import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Formik, FieldArray as FormikFieldArray, Field as FormikField, FormikProps, useFormikContext } from 'formik';

import { FormContainer } from './styles';

interface FieldArrayProps {
    name: string;
}

interface FieldProps {
    name: string;
    unregisterOnUnmount?: boolean;
    [x: string]: any;
}

interface FormProps {
    initialValues: any;
    onSubmit: (values: any) => any;
    validationSchema?: any;
    id: string;
}

export const Field: React.FC<FieldProps> = ({ unregisterOnUnmount, name, children, ...restProps }) => {
    const { setValues, values } = useFormikContext();

    const unregisterFormValue = () => {
        const newValues = {};

        if (values instanceof Object) {
            Object.keys(values).forEach(key => {
                if (key !== name) newValues[key] = values[key];
            });
        }

        setValues(newValues);
    };

    useEffect(
        () => () => {
            if (unregisterOnUnmount) {
                unregisterFormValue();
            }
        },
        []
    );

    return <FormikField {...restProps} name={name} children={children} />;
};

export const FieldArray: React.FC<FieldArrayProps & PropsWithChildren<any>> = ({ name, children }) => (
    <FormikFieldArray name={name} render={arrayHelpers => children(arrayHelpers)} />
);

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
