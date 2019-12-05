import React from 'react';
import { Formik, FieldArray } from 'formik';

import { FormSelectProps, FormSelect } from '../Select';
import Input from '../Input';
import Textarea from '../Textarea';
import FileInput from '../FileInput';
import DateInput from '../DateInput';

interface SelectModel extends FormSelectProps {
    type: 'select';
}

interface FileInputProps {
    type: 'file';
    name: string;
    label: string;
}

interface DateInputProps {
    type: 'date';
    name: string;
    label: string;
}

interface InputProps {
    type: 'text' | 'textarea';
    name: string;
    label: string;
}

interface InputRowProps {
    type: 'inputRow';
    flex: number[];
    fields: (SelectModel | InputProps | FileInputProps | DateInputProps)[];
}

interface CustomFieldProps {
    type: 'customField';
    component: (props) => any;
}

export type FormModel = (
    | SelectModel
    | InputProps
    | InputRowProps
    | CustomFieldProps
    | FileInputProps
    | DateInputProps
)[];

interface FormProps {
    initialValues: Object;
    id: string;
    model: FormModel;
    onSubmit: (values) => any;
}

const Form: React.FC<FormProps> = ({ initialValues, model, onSubmit, id }) => {
    const inputTypes = ({ props, formikProps }) => ({
        text: (
            <Input
                {...props}
                setFieldValue={formikProps.setFieldValue}
                value={formikProps.values[props.name]}
                onChange={formikProps.handleChange}
            />
        ),
        select: <FormSelect {...props} value={formikProps.values[props.name]} />,
        textarea: (
            <Textarea
                {...props}
                setFieldValue={formikProps.setFieldValue}
                value={formikProps.values[props.name]}
                onChange={formikProps.handleChange}
            />
        ),
        file: (
            <FileInput
                name={props.name}
                setFieldValue={formikProps.setFieldValue}
                value={formikProps.values[props.name]}
                label={props.label}
            />
        ),
        date: (
            <DateInput
                name={props.name}
                setFieldValue={formikProps.setFieldValue}
                value={formikProps.values[props.name]}
                label={props.label}
            />
        )
    });

    const elementTypes = ({ props, formikProps }) => {
        return {
            ...inputTypes({ props, formikProps }),
            inputRow: (
                <div style={{ display: 'flex' }}>
                    {props.fields &&
                        props.fields.map(({ type, ...restProps }, i) => (
                            <div style={{ flex: props.flex[i] }} key={i}>
                                {inputTypes({ props: restProps, formikProps })[type]}
                            </div>
                        ))}
                </div>
            ),
            customField: props.component && props.component(formikProps)
        };
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {formikProps => (
                <form id={id} onSubmit={formikProps.handleSubmit}>
                    {model.map(({ type, ...restProps }, i) => (
                        <React.Fragment key={i}>{elementTypes({ props: restProps, formikProps })[type]}</React.Fragment>
                    ))}
                </form>
            )}
        </Formik>
    );
};

export default Form;
