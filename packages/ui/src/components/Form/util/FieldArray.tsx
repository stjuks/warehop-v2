import React, { PropsWithChildren } from 'react';
import { FieldArray as FormikFieldArray } from 'formik';

interface FieldArrayProps {
  name: string;
}

const FieldArray: React.FC<FieldArrayProps & PropsWithChildren<any>> = ({ name, children }) => (
  <FormikFieldArray name={name} render={arrayHelpers => children(arrayHelpers)} />
);

export default FieldArray;
