import React, { useState } from 'react';
import { useDebounce } from 'react-use';
import { Formik, FormikBag } from 'formik';

import { FormContainer } from './styles';

import FormikOnChange from './util/FormikOnChange';
import { observer } from 'mobx-react-lite';

interface FormProps {
  initialValues: any;
  persist?: boolean;
  onSubmit: (values: any) => any;
  id: string;
  validationSchema?: any;
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
    persist
  }) => {
    const [values, setValues] = useState({});

    const handleChildren = formikProps => {
      if (children instanceof Function) return children(formikProps);
      else return children;
    };

    const handleSubmit = async (values, formikBag) => {
      const { setErrors, errors } = formikBag;

      try {
        await onSubmit(values);
        localStorage.removeItem(id);
      } catch (err) {
        setErrors({ ...errors, __thrownError: err });
      }
    };

    const handleChange = values => {
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

    return (
      <Formik
        initialValues={handleInitialValues()}
        onSubmit={async (values, formikBag) => await handleSubmit(values, formikBag)}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
      >
        {formikProps => (
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
