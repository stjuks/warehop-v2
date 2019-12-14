import React, { PropsWithChildren, useEffect, useState } from 'react';
import {
    Formik,
    FieldArray as FormikFieldArray,
    Field as FormikField,
    FormikProps,
    useFormikContext,
    connect
} from 'formik';
import usePrevious from 'react-use/lib/usePrevious';

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
    id: string;
    validationSchema?: any;
    onChange: () => any;
}

export const FieldBase: React.FC<FieldProps> = ({ unregisterOnUnmount, name, children, formik, ...restProps }) => {
    const { setValues, values } = formik;

    const unregisterFormValue = () => {
        const newValues = {};

        if (values instanceof Object) {
            Object.keys(values).forEach(key => {
                if (key !== name) newValues[key] = values[key];
            });
        }

        setValues(newValues);
    };

    useEffect(() => {
        return () => {
            if (unregisterOnUnmount) {
                unregisterFormValue();
            }
        };
    }, []);

    return <FormikField {...restProps} name={name} children={children} />;
};

interface FormikOnChangeProps {
    onChange: (values: any) => any;
    formik?: any;
}

const FormikOnChangeBase: React.FC<FormikOnChangeProps> = ({ onChange, formik }) => {
    const { values } = formik;
    const prevValues = usePrevious(values);

    const findChangedField = () => {
        if (values instanceof Object) {
            const changedKey = Object.keys(values).find(key => prevValues[key] != values[key]);
            return { name: changedKey, value: changedKey ? values[changedKey] : undefined };
        }
    };

    useEffect(() => {
        if (prevValues) onChange({ prevValues, nextValues: values, changedField: findChangedField(), formik });
    }, [values]);

    return null;
};

export const FormikOnChange = connect(FormikOnChangeBase);

export const Field = connect(FieldBase);

export const FieldArray: React.FC<FieldArrayProps & PropsWithChildren<any>> = ({ name, children }) => (
    <FormikFieldArray name={name} render={arrayHelpers => children(arrayHelpers)} />
);

const Form: React.FC<FormProps & React.PropsWithChildren<any>> = ({
    initialValues,
    onSubmit,
    validationSchema,
    id,
    children,
    onChange
}) => {
    const handleChildren = formikProps => {
        if (children instanceof Function) return children(formikProps);
        else return children;
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount={false}
        >
            {formikProps => (
                <>
                    <FormContainer id={id} onSubmit={formikProps.handleSubmit}>
                        {onChange && <FormikOnChange onChange={onChange} />}
                        {handleChildren(formikProps)}
                    </FormContainer>
                </>
            )}
        </Formik>
    );
};

export default Form;
