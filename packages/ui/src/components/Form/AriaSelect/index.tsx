import React, { useState, useEffect, useRef } from 'react';
import { FieldProps, Field } from 'formik';
import { FiChevronDown, FiX, FiSearch } from 'react-icons/fi';
import { useDebounce } from 'react-use';

import { ButtonContainer, WrapperContainer, MenuItemContainer, MenuContainer, SearchInput } from './styles';
import { TextInputBase, InputActionButtons } from '../TextInput';
import { mapSelectOptions, mapSelectOption } from '../../../util/helpers';
import { DropdownMenu } from '../util/DropdownMenu';
import { observer } from 'mobx-react-lite';

export interface Option {
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
    searchPlaceholder?: string;
    placeholder?: string;
    className?: string;
    label?: string;
    isClearable?: boolean;
    unregisterOnUnmount?: boolean;
    onChange?: (value: Option) => any;
    onSearch?: (query: string, mappedOptions: Option[]) => Option[] | Promise<Option[]>;
}

const AriaSelectBase: React.FC<AriaSelectProps & FieldProps> = observer(
    ({
        label,
        field,
        form,
        options,
        optionMap,
        isClearable,
        onChange,
        className,
        placeholder,
        onSearch,
        searchPlaceholder
    }) => {
        const [mappedOptions, setMappedOptions] = useState<Option[]>([]);
        const [searchOptions, setSearchOptions] = useState<Option[]>([]);
        const [searchQuery, setSearchQuery] = useState('');
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
        }, [options]);

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

        useDebounce(
            async () => {
                if (onSearch) {
                    const searchedOptions = await onSearch(searchQuery, mappedOptions);
                    setSearchOptions(searchedOptions);
                }
            },
            300,
            [searchQuery]
        );

        const handleMenuToggle = ({ isOpen }) => {
            if (!isOpen) {
                setSearchQuery('');
                setSearchOptions([]);
            }
        };

        return (
            <WrapperContainer className={className} onSelection={handleSelect} onMenuToggle={handleMenuToggle}>
                <TextInputBase
                    label={label}
                    name={`${field.name}Display`}
                    inputComponent={
                        <InputComponent
                            displayValue={displayValue}
                            placeholder={placeholder}
                            isClearable={isClearable}
                            options={searchQuery ? searchOptions : mappedOptions}
                            handleSearch={e => setSearchQuery(e.target.value)}
                            handleClear={handleClear}
                            searchQuery={searchQuery}
                            searchPlaceholder={searchPlaceholder}
                        />
                    }
                    value={displayValue}
                    errorMessage={form.errors[field.name]}
                />
            </WrapperContainer>
        );
    }
);

const InputComponent = ({
    displayValue,
    placeholder,
    isClearable,
    options,
    handleSearch,
    handleClear,
    searchQuery,
    searchPlaceholder
}) => (
    <>
        <ButtonContainer>
            <div className="inner-btn-container">
                <span className={`value-container ${!displayValue && `placeholder`}`}>
                    {displayValue || placeholder}
                </span>
                <InputActionButtons
                    indicator={<FiChevronDown />}
                    action={isClearable && displayValue ? { icon: <FiX />, onClick: e => handleClear(e) } : undefined}
                />
            </div>
        </ButtonContainer>
        <MenuContainer>
            <SearchInput placeholder={searchPlaceholder || 'Otsi'} onChange={handleSearch} value={searchQuery} />
            <ul className="item-list">
                {options.map((item, i) => {
                    return (
                        <li key={i}>
                            <MenuItemContainer value={item} text={item.label} data-active={displayValue === item.label}>
                                {item.label}
                            </MenuItemContainer>
                        </li>
                    );
                })}
            </ul>
        </MenuContainer>
    </>
);

const AriaSelect: React.FC<AriaSelectProps> = props => <Field {...props} component={AriaSelectBase} />;

export default AriaSelect;
