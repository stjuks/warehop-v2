import React, { useState } from 'react';
import { useDebounce } from 'react-use';
import { Formik } from 'formik';
import * as yup from 'yup';

import { FormContainer } from './styles';

import FormikOnChange from './util/FormikOnChange';
import { observer } from 'mobx-react-lite';

interface FormProps {
  initialValues: any;
  persist?: boolean;
  onSubmit: (values: any) => any;
  id: string;
  validationSchema?: yup.object;
  onChange?: (values: any) => any;
  onError?: () => any;
  style?: React.CSSProperties;
}

const Form: React.FC<React.PropsWithChildren<FormProps>> = observer(
  ({
    initialValues,
    onSubmit,
    validationSchema,
    id,
    children,
    onChange,
    style,
    onError,
    persist,
  }) => {
    const [values, setValues] = useState({});

    const handleChildren = (formikProps) => {
      if (children instanceof Function) return children(formikProps);
      else return children;
    };

    const handleSubmit = async (values, formikBag) => {
      const { setErrors, errors } = formikBag;

      try {
        await onSubmit(values);
        localStorage.removeItem(id);
      } catch (err) {
        if (onError) onError();
        setErrors({ ...errors, __thrownError: err });
      }
    };

    const handleChange = (values) => {
      if (onChange) onChange(values);
      setValues(values.nextValues);
    };

    const handleInitialValues = () => {
      if (persist) {
        let savedValues = localStorage.getItem(id);

        if (savedValues) return JSON.parse(savedValues);
      }

      return initialValues;
    };

    useDebounce(
      () => {
        if (Object.keys(values).length > 0) {
          localStorage.setItem(id, JSON.stringify(values));
        }
      },
      500,
      [persist ? values : undefined]
    );

    const validate = async (values) => {
      try {
        if (validationSchema) {
          await validationSchema.validate(values, { abortEarly: false });
        }
        return true;
      } catch (err) {
        const errorMap = {};
        err.inner.forEach((error) => (errorMap[error.path] = error.message));
        if (onError) onError();
        return errorMap;
      }
    };

    return (
      <Formik
        initialValues={handleInitialValues()}
        onSubmit={async (values, formikBag) => await handleSubmit(values, formikBag)}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
        validate={validate}
      >
        {(formikProps) => (
          <>
            <FormContainer id={id} onSubmit={formikProps.handleSubmit} style={style}>
              {(onChange || persist) && <FormikOnChange onChange={handleChange} />}
              {handleChildren(formikProps)}
            </FormContainer>
          </>
        )}
      </Formik>
    );
  }
);

export default Form;
