import React, { useEffect } from 'react';
import { Field } from 'formik';
import { useDebounce } from '../../util/hooks';

const Persist = ({ name, setValues, values }) => {
    useEffect(() => {
        const savedState: string | null = localStorage.getItem(name);
        const stateObject: Object = JSON.parse(savedState || '{}');

        if (stateObject !== {}) {
            setValues({ ...values, ...stateObject });
        }
    }, [name, setValues]);

    const Input = ({ form }) => {
        useDebounce(() => {
            if (form.dirty) {
                localStorage.setItem(name, JSON.stringify(form.values));
            }
        }, 300);

        return <input type="hidden" />;
    };

    return <Field component={Input} />;
};

export default Persist;
