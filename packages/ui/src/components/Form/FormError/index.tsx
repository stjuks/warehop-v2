import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useFormikContext } from 'formik';

import { FormErrorContainer } from './styles';
import { ErrorCode } from '@shared/types';
import { getObjectProperty } from '@ui/util/helpers';

interface FormErrorProps {
  messages?: {
    [key in ErrorCode]?: {
      [key: string]: string;
    };
  };
  fields?: string[];
}

const FormError: React.FC<FormErrorProps> = ({ messages, fields }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const formikContext = useFormikContext();
  const containerRef = useRef<HTMLDivElement>(null);

  const formikErrors: any = formikContext.errors;

  const handleErrors = useCallback(() => {
    const errorMessages: any[] = [];

    if (fields) {
      fields.forEach(field => {
        const message = getObjectProperty(formikErrors, field);
        if (typeof message === 'string') errorMessages.push(message);
      });
    }

    const thrownError = formikErrors.__thrownError;

    if (messages && thrownError) {
      if (thrownError.code) {
        const code: ErrorCode = thrownError.code;
        const codeMessages = messages[code];

        if (code === 'EntityAlreadyExistsError' && codeMessages) {
          if (thrownError.fields) {
            thrownError.fields.forEach(field => {
              const errorMessage: any = codeMessages[field];

              if (errorMessage) errorMessages.push(errorMessage);
            });
          }
        } else {
          errorMessages.push('Viga.');
        }
      }
    }

    setErrors(errorMessages);
  }, [messages, formikErrors, fields]);

  useEffect(() => {
    handleErrors();
  }, [handleErrors]);

  return errors.length > 0 ? (
    <FormErrorContainer ref={containerRef}>
      <ul>
        {errors.map(msg => (
          <li key={msg}>{msg}</li>
        ))}
      </ul>
    </FormErrorContainer>
  ) : null;
};

export default FormError;
