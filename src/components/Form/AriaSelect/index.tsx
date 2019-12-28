import React, { useState, useEffect } from 'react';
import { FieldProps, Field } from 'formik';
import { FiChevronDown, FiX } from 'react-icons/fi';
import { Menu, MenuItem } from 'react-aria-menubutton';

import { ButtonContainer, WrapperContainer } from './styles';
import { TextInputBase, InputActionButtons } from '../TextInput';
import { mapSelectOptions, mapSelectOption } from '../../../util/helpers';
import { DropdownMenu } from '../util/DropdownMenu';

interface Option {
    label: string;
    value: any;
}

interface AriaSelectProps {
    name: string;
    options: any[];
    optionMap?: {
        value?: string;
        label: string;
    };
    placeholder?: string;
    className?: string;
    label?: string;
    isClearable?: boolean;
    unregisterOnUnmount?: boolean;
    onChange?: (value: Option) => any;
}

const AriaSelectBase: React.FC<AriaSelectProps & FieldProps> = ({
    label,
    field,
    form,
    options,
    optionMap,
    isClearable,
    onChange,
    className,
    placeholder
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

            if (field.value) {
                setDisplayValue(mapSelectOption({ attrs: optionMap, value: field.value }).label);
            }

            setMappedOptions(_mappedOptions);
            setLoadingOptions(false);
        };

        loadOptions();
    }, []);

    const handleSelect = ({ value, label }) => {
        if (onChange) onChange({ value, label });
        else {
            form.setFieldValue(field.name, value);
            setDisplayValue(label);
        }
    };

    const handleClear = e => {
        e.stopPropagation();
        form.setFieldValue(field.name, undefined);
        setDisplayValue('');
    };

    const InputComponent = (
        <>
            <ButtonContainer>
                <div className="inner-btn-container">
                    <span className={`value-container ${!displayValue && `placeholder`}`}>
                        {displayValue || placeholder}
                    </span>
                    <InputActionButtons
                        indicator={<FiChevronDown />}
                        action={
                            isClearable && displayValue ? { icon: <FiX />, onClick: e => handleClear(e) } : undefined
                        }
                    />
                </div>
            </ButtonContainer>
            <DropdownMenu
                items={mappedOptions}
                menuProps={{ as: Menu }}
                menuItemProps={item => ({
                    as: MenuItem,
                    value: item,
                    text: item.label,
                    isActive: displayValue === item.label
                })}
            />
        </>
    );

    return (
        <WrapperContainer className={className} onSelection={handleSelect}>
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
