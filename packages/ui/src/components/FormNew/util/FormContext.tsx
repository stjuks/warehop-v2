import React from 'react';
import * as yup from 'yup';

export interface FormContext {
  changedField: {
    name: string;
    value: any;
  };
  fields: string[];
  validationSchema?: yup.ObjectSchema;
  setChangedField: (name: string, value: any) => void;
  addField: (name: string) => void;
}

export const FormContext = React.createContext<FormContext>(undefined as any);

export const FormProvider = FormContext.Provider;

export function useFormContext() {
  const form = React.useContext(FormContext);

  return form;
}
