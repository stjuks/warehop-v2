import React, { useState, useEffect } from 'react';
import { FieldProps, Field } from 'formik';
import { FiChevronDown, FiX } from 'react-icons/fi';

import { ButtonContainer, MenuContainer, MenuItemContainer, WrapperContainer } from './styles';
import { TextInputBase, InputActionButtons } from '../TextInput';
import { mapSelectOptions } from '../../../util/helpers';
import { InputIndicatorContainer } from '../styles';

interface Option {
    label: string;
    value: any;
}

interface AriaSelectProps {
    name: string;
    label: string;
    options: any[];
    optionMap: {
        value?: string;
        label: string;
    };
    isClearable?: boolean;
}

const AriaSelectBase: React.FC<AriaSelectProps & FieldProps> = ({
    label,
    field,
    form,
    options,
    optionMap,
    isClearable
}) => {
    const [mappedOptions, setMappedOptions] = useState<Option[]>([]);
    const [isLoadingOptions, setLoadingOptions] = useState(false);
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
        const loadOptions = async () => {
            setLoadingOptions(true);

            const loadedOptions = await options;
            const _mappedOptions = mapSelectOptions({
                attrs: optionMap,
                values: loadedOptions
            });

            setMappedOptions(_mappedOptions);
            setLoadingOptions(false);
        };

        loadOptions();
    }, [optionMap, options]);

    const handleSelect = ({ value, label }) => {
        form.setFieldValue(field.name, value);
        setDisplayValue(label);
    };

    const handleClear = (e) => {
        e.stopPropagation();
        form.setFieldValue(field.name, undefined);
        setDisplayValue('');
    };

    const InputComponent = (
        <>
            <ButtonContainer>
                <div className="inner-btn-container">
                    <span className="value-container">{displayValue}</span>
                    <InputActionButtons
                        indicator={<FiChevronDown />}
                        action={isClearable && displayValue ? { icon: <FiX />, onClick: e => handleClear(e) } : undefined}
                    />
                </div>
            </ButtonContainer>
            {isLoadingOptions && 'Loading...'}
            <MenuContainer>
                <ul>
                    {mappedOptions.map((option: Option, i) => (
                        <li key={i}>
                            <MenuItemContainer
                                value={option}
                                text={option.label}
                                isActive={displayValue === option.label}
                            >
                                {option.label}
                            </MenuItemContainer>
                        </li>
                    ))}
                </ul>
            </MenuContainer>
        </>
    );

    return (
        <WrapperContainer className="select-wrapper" onSelection={handleSelect}>
            <TextInputBase
                label={label}
                name={`${field.name}Display`}
                inputComponent={InputComponent}
                value={displayValue}
                errorMessage={form.errors[field.name]}
            />
        </WrapperContainer>
    );
};

const AriaSelect: React.FC<AriaSelectProps> = props => <Field {...props} component={AriaSelectBase} />;

export default AriaSelect;
