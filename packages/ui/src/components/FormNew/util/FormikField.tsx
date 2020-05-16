import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useFormikContext } from 'formik';
import { useFormContext } from './FormContext';
import { useEffectAfterMount } from './hooks';

interface FormikFieldProps {
  name: string;
}

const FormikField: React.FC<FormikFieldProps> = ({ children, name }) => {
  const formik = useFormikContext();
  const { getFieldMeta, setFieldError, setFieldValue } = formik;

  const { value, error } = getFieldMeta<string>(name);

  const { validationSchema, addField } = useFormContext();

  useEffect(() => {
    addField(name);
  }, []);

  useEffectAfterMount(() => {
    const schema: yup.Schema<any> = validationSchema?.fields[name];

    if (schema) {
      try {
        schema.validateSync(value);
        setFieldError(name, '');
      } catch (err) {
        
        setFieldError(name, err.message);
      }
    }
  }, [value]);

  return typeof children === 'function'
    ? children({ onChange: _value => setFieldValue(name, _value), error, value }, formik)
    : null;
};

export default FormikField;
