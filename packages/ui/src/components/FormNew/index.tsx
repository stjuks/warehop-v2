import React, { useReducer } from 'react';
import * as yup from 'yup';

import { Formik, useFormikContext } from 'formik';
import { FormProvider, FormContext } from './util/FormContext';

import { FormikAutosuggestInput } from './AutosuggestInput';
import { FormikDateInput } from './DateInput';
import { FormikFileInput } from './FileInput';
import { FormikSelectInput } from './SelectInput';
import { FormikTextInput } from './TextInput';
import { FormikToggleInput } from './ToggleInput';

interface FormProps {
  initialValues: object;
  id: string;
  onSubmit: (values: any) => any;
  validationSchema?: yup.ObjectSchema;
}

const initialState = {
  changedField: undefined,
  fields: []
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
    addField
  };

  return ctx;
};

const Form: React.FC<FormProps> = ({ children, initialValues, onSubmit, id, validationSchema }) => {
  const form = useForm();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange={false}
    >
      <FormProvider value={{ ...form, validationSchema }}>
        <InnerForm id={id} validationSchema={validationSchema}>
          {children}
        </InnerForm>
      </FormProvider>
    </Formik>
  );
};

const InnerForm: React.FC<{
  id: string;
  validationSchema?: yup.ObjectSchema;
}> = ({ children, id, validationSchema }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <form onSubmit={handleSubmit} id={id} style={{ padding: '0.75rem' }}>
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
