import React from 'react';
import { Formik, FieldArray } from 'formik';

import { FormContainer } from './styles';

import { FormSelectProps, FormSelect } from '../Select';
import Input, { InputProps } from '../Input';
import Textarea from '../Textarea';
import FileInput, { FileInputProps } from '../FileInput';
import DateInput, { DateInputProps } from '../DateInput';
import Radio, { RadioProps } from '../Radio';

/* interface BaseInput {
    name: string;
    label: string;
}

interface SelectModel extends FormSelectProps {
    type: 'select';
}

interface FileInputModel extends BaseInput {
    type: 'file';
}

interface DateInputModel extends BaseInput {
    type: 'date';
}

interface RadioInputModel extends RadioProps {
    type: 'radio';
}

interface InputModel extends BaseInput {
    type: 'text' | 'textarea';
}

interface InputRowModel {
    type: 'inputRow';
    flex: number[];
    fields: FormElement[];
}

interface CustomFieldModel {
    type: 'customField';
    component: (props) => any;
}

interface SubtitleModel {
    type: 'subtitle';
    text: string;
}

interface FieldArrayModel {
    type: 'fieldArray';
    name: string;
    render: (props) => React.ReactElement;
}

type FormInputElement = SelectModel | InputModel | FileInputModel | DateInputModel | RadioInputModel;
type FormElement = FormInputElement | InputRowModel | CustomFieldModel | SubtitleModel | FieldArrayModel;

export type FormModel = FormElement[];

interface FormProps {
    initialValues: Object;
    id: string;
    model: FormModel;
    onSubmit: (values) => any;
    padding?: string;
}

export const generateFormFromJSON: any = (args: { model: FormModel; formikProps: any }) => {
    const { model, formikProps } = args;

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
        ),
        radio: <Radio onSelect={value => formikProps.setFieldValue(props.name, value)} {...props} />
    });

    const elementTypes = ({ props, formikProps }) => {
        return {
            ...inputTypes({ props, formikProps }),
            inputRow: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {props.fields &&
                        props.fields.map(({ type, ...restProps }, i) => (
                            <div style={{ flex: props.flex[i] }} key={i}>
                                {elementTypes({ props: restProps, formikProps })[type]}
                            </div>
                        ))}
                </div>
            ),
            customField: props.component && props.component(formikProps),
            subtitle: <h4 className="form-subtitle">{props.text}</h4>,
            fieldArray: (
                <FieldArray name={props.name} render={arrayHelpers => props.render({ formikProps, arrayHelpers })} />
            )
        };
    };

    return model.map(({ type, ...restProps }, i) => (
        <React.Fragment key={i}>{elementTypes({ props: restProps, formikProps })[type]}</React.Fragment>
    ));
}; */

const Form = ({ initialValues, model, onSubmit, id }) => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            { /*formikProps => (
                <FormContainer id={id} onSubmit={formikProps.handleSubmit}>
                    {generateFormFromJSON({ model, formikProps })}
                </FormContainer>
            ) */}
        </Formik>
    );
};

export default Form;
