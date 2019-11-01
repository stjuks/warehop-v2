import React, { useContext, useEffect, useState } from 'react';
import { Field } from 'formik';

const Persist = ({ name, setValues }) => {
    useEffect(() => {
        const savedState: string | null = localStorage.getItem(name);
        const stateObject: Object = JSON.parse(savedState || '{}');

        if (stateObject !== {}) {
            setValues(stateObject);
        }
    }, []);

    const Input = ({ form }) => {
        useEffect(() => {
            if (form.dirty) {
                localStorage.setItem(name, JSON.stringify(form.values));
            }
        }, []);

        return <input type="hidden" />;
    };

    return <Field component={Input} />;
};

export default Persist;
