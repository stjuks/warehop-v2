import React from 'react';
import { Formik } from 'formik';

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

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnBlur={false}
            validateOnMount={true}
            isInitialValid={false}
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
