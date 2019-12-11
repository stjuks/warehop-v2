import React, { useState, useEffect } from 'react';
import { Field, FieldProps } from 'formik';
import ReactSelect from 'react-select';
import { FiChevronDown } from 'react-icons/fi';

import { InputContainer } from '../styles';
import { mapSelectOptions, MapSelectOptionArgs, mapSelectOption } from '../../../util/helpers';
import TextInput, { TextInputBase } from '../TextInput';

interface Option {
    value: any;
    label: string;
}

interface SelectInputProps {
    name: string;
    label: string;
    options: any[];
    defaultValue?: any;
    mapValues?: { label: string; value?: string };
    asyncOptions?: Promise<any>;
}

const SelectInputBase: React.FC<SelectInputProps & FieldProps> = ({
    options,
    mapValues,
    form,
    field,
    defaultValue,
    asyncOptions,
    label
}) => {
    const [transformedOptions, setTransformedOptions] = useState<Option[]>([]);
    const [isLoadingOptions, setLoadingOptions] = useState(false);

    const handleChange = value => {
        form.setFieldValue(field.name, value.value);
    };

    const loadOptions = async () => {
        setLoadingOptions(true);
        let mappedOptions = (await asyncOptions) || options;

        if (mapValues) {
            mappedOptions = mapSelectOptions({
                labelAttribute: mapValues.label,
                valueAttribute: mapValues.value,
                values: mappedOptions
            });
        }

        setTransformedOptions(mappedOptions);
        setLoadingOptions(false);
    };

    useEffect(() => {
        loadOptions();
    }, [options, asyncOptions]);

    return (
        <InputContainer>
            <div className="label">{label}</div>
            <ReactSelect
                classNamePrefix="react-select"
                onChange={handleChange}
                options={transformedOptions}
                isSearchable={true}
                placeholder={isLoadingOptions && 'Loading...'}
            />
        </InputContainer>
    );
};

const SelectInput: React.FC<SelectInputProps> = props => <Field {...props} component={SelectInputBase} />;

export default SelectInput;
