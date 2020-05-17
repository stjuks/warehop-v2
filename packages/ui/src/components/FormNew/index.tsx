import React, { useReducer, useEffect } from 'react';
import * as yup from 'yup';
import { useDebounce } from 'react-use';

import { Formik, useFormikContext, FormikProps, FormikContextType } from 'formik';
import { FormProvider, FormContext, useFormContext } from './util/FormContext';

import { FormikAutosuggestInput } from './AutosuggestInput';
import { FormikDateInput } from './DateInput';
import { FormikFileInput } from './FileInput';
import { FormikSelectInput } from './SelectInput';
import { FormikTextInput } from './TextInput';
import { FormikToggleInput } from './ToggleInput';
import { loadFromLocalStorage, saveToLocalStorage } from '@ui/util/helpers';

interface FormProps {
  initialValues: object;
  id: string;
  onSubmit: (values: any) => any;
  onChange?: (args: { value: any; name: string }, formik: FormikContextType<any>) => any;
  validationSchema?: yup.ObjectSchema;
}

const initialState = {
  changedField: undefined,
  fields: [],
};

const formReducer = (state, msg) => {
  switch (msg.type) {
    case 'SET_CHANGED_FIELD':
      return { ...state, changedField: msg.payload };
    case 'ADD_FIELD':
      return { ...state, fields: [...state.fields, msg.payload] };
    default:
      return state;
  }
};

const useForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const setChangedField = (name: string, value: any) => {
    dispatch({ type: 'SET_CHANGED_FIELD', payload: { name, value } });
  };

  const addField = (name: string) => {
    dispatch({ type: 'ADD_FIELD', payload: name });
  };

  const ctx: FormContext = {
    ...state,
    setChangedField,
    addField,
  };

  return ctx;
};

const Form: React.FC<FormProps> = ({
  children,
  initialValues,
  onSubmit,
  id,
  validationSchema,
  onChange,
}) => {
  const form = useForm();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange={false}
    >
      <FormProvider value={{ ...form, validationSchema }}>
        <InnerForm id={id} validationSchema={validationSchema} onChange={onChange}>
          {children}
        </InnerForm>
      </FormProvider>
    </Formik>
  );
};

const cleanFormStorage = () => localStorage.removeItem('formData');

const InnerForm: React.FC<{
  id: string;
  validationSchema?: yup.ObjectSchema;
  onChange?: (args: { value: any; name: string }, formik: FormikContextType<any>) => any;
}> = ({ children, id, onChange }) => {
  const formik = useFormikContext<any>();
  const { changedField } = useFormContext();

  const { values, setValues } = formik;

  useEffect(() => {
    if (onChange) onChange(changedField, formik);
  }, [changedField]);

  useEffect(() => {
    window.addEventListener('beforeunload', cleanFormStorage);

    const loadedValues = loadFromLocalStorage(`formData.${id}`);

    if (loadedValues) setValues(loadedValues);
  }, []);

  useDebounce(() => {
    saveToLocalStorage(`formData.${id}`, values);
  }, 300, [values]);

  return (
    <form onSubmit={formik.handleSubmit} id={id} style={{ padding: '0.75rem' }}>
      {children}
    </form>
  );
};

export default Form;

export const AutosuggestInput = FormikAutosuggestInput;
export const DateInput = FormikDateInput;
export const FileInput = FormikFileInput;
export const SelectInput = FormikSelectInput;
export const TextInput = FormikTextInput;
export const ToggleInput = FormikToggleInput;
