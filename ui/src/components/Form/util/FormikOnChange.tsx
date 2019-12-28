import React, { useEffect } from 'react';
import { connect } from 'formik';
import usePrevious from 'react-use/lib/usePrevious';

interface FormikOnChangeProps {
    onChange: (values: any) => any;
    formik?: any;
}

const FormikOnChange: React.FC<FormikOnChangeProps> = ({ onChange, formik }) => {
    const { values } = formik;
    const prevValues = usePrevious(values);

    const findChangedField = () => {
        if (values instanceof Object) {
            const changedKey = Object.keys(values).find(key => prevValues[key] != values[key]);
            return { name: changedKey, value: changedKey ? values[changedKey] : undefined };
        }
    };

    useEffect(() => {
        if (prevValues) onChange({ prevValues, nextValues: values, changedField: findChangedField(), formik });
    }, [values]);

    return null;
};

export default connect(FormikOnChange);