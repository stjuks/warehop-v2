import React from 'react';
import { Formik, FormikBag } from 'formik';

import { FormContainer } from './styles';

import FormikOnChange from './util/FormikOnChange';
import { observer } from 'mobx-react-lite';

interface FormProps {
  initialValues: any;
  onSubmit: (values: any) => any;
  id: string;
  validationSchema?: any;
  onChange?: (values: any) => any;
  onError?: () => any;
  style?: React.CSSProperties;
}

const Form: React.FC<React.PropsWithChildren<FormProps>> = observer(
  ({ initialValues, onSubmit, validationSchema, id, children, onChange, style, onError }) => {
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
            <FormContainer id={id} onSubmit={formikProps.handleSubmit} style={style}>
              {onChange && <FormikOnChange onChange={onChange} />}
              {handleChildren(formikProps)}
            </FormContainer>
          </>
        )}
      </Formik>
    );
  }
);

export default Form;
