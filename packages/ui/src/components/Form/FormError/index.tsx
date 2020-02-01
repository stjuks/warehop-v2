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
}

const FormError: React.FC<FormErrorProps> = ({ messages }) => {
    const [message, setMessage] = useState('');
    const formikContext = useFormikContext();

    const errors: any = formikContext.errors;
    const error = errors.__thrownError;

    const handleMessage = errorMessage => {
        if (errorMessage) setMessage(errorMessage);
        else setMessage('Viga.');
    };

    const handleError = useCallback(() => {
        if (messages && error) {
            if (error.code) {
                const code: ErrorCode = error.code;
                const errorMessages = messages[code];

                if (code === 'EntityAlreadyExistsError' && errorMessages) {
                    if (error.fields) {
                        error.fields.forEach(field => {
                            const errorMessage = errorMessages[field];

                            if (errorMessage) handleMessage(errorMessage);
                        });
                    }
                }
            }
        }
    }, [messages, error]);

    useEffect(() => {
        handleError();
    }, [handleError]);

    return error ? <FormErrorContainer>{message}</FormErrorContainer> : null;
};

export default FormError;
