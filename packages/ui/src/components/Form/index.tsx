import React from 'react';
import { Formik, FormikBag } from 'formik';

import { FormContainer } from './styles';

import FormikOnChange from './util/FormikOnChange';

interface FormProps {
    initialValues: any;
    onSubmit: (values: any) => any;
    id: string;
    validationSchema?: any;
    onChange?: (values: any) => any;
}

const Form: React.FC<React.PropsWithChildren<FormProps>> = ({
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

    const handleSubmit = async (values, formikBag) => {
        const { setErrors, errors } = formikBag;

        try {
            await onSubmit(values);
        } catch (err) {
            setErrors({ ...errors, __thrownError: err });
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values, formikBag) => await handleSubmit(values, formikBag)}
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
