import React, { useState, useEffect, useCallback } from 'react';
import { useFormikContext } from 'formik';

import { FormErrorContainer } from './styles';
import { ErrorCode } from '@shared/types';

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

    const formikErrors: any = formikContext.errors;

    const handleErrors = useCallback(() => {
        const errorMessages: string[] = [];

        if (fields) {
            fields.forEach(field => {
                if (formikErrors[field]) errorMessages.push(formikErrors[field]);
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
        <FormErrorContainer>
            <ul>
                {errors.map(msg => (
                    <li key={msg}>{msg}</li>
                ))}
            </ul>
        </FormErrorContainer>
    ) : null;
};

export default FormError;
