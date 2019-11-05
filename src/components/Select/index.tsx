import React, { useState, useEffect } from 'react';
import { Field, FieldProps } from 'formik';
import ReactSelect, { components } from 'react-select';
import { FiChevronDown, FiArrowUp, FiArrowDown, FiX, FiPlusCircle } from 'react-icons/fi';
import objectMapper from 'object-mapper';

import { FormSelectContainer, MenuSelectContainer, SortButtonContainer, AddButtonContainer } from './styles';

import { InputContainer } from '../Input/styles';
import { mapSelectOptions, mapSelectOption } from '../../util/helpers';

export interface IOption {
    value: string | Object | Number | undefined;
    label: string;
}

interface ISelectProps {
    defaultValue?: IOption;
    isSortable?: boolean;
    isSearchable?: boolean;
}

interface ISelectWithGroupsProps extends ISelectProps {
    options: {
        label: string;
        options: IOption[];
    }[];
}

interface ISelectWithoutGroupsProps extends ISelectProps {
    options: IOption[];
}

type SelectProps = ISelectWithGroupsProps | ISelectWithoutGroupsProps;

const CustomDropdownIndicator = () => {
    return (
        <div
            style={{
                marginRight: '0.5rem',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <FiChevronDown />
        </div>
    );
};

const SortableDropdownIndicator = () => {
    const [sortDirection, setSortDirection] = useState(1);
    return (
        <>
            <CustomDropdownIndicator />
            <SortButtonContainer
                className="sort-buttons"
                onMouseDown={e => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onTouchEnd={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSortDirection(sortDirection * -1);
                }}
                sortDirection={sortDirection}
                onClick={() => setSortDirection(sortDirection * -1)}
            >
                <FiArrowUp />
                <FiArrowDown />
            </SortButtonContainer>
        </>
    );
};

export function MenuSelect({ options, defaultValue, isSortable = false, isSearchable = true }: SelectProps) {
    return (
        <MenuSelectContainer isSortable={isSortable}>
            <ReactSelect
                className="menu-select-container"
                components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: isSortable ? SortableDropdownIndicator : CustomDropdownIndicator
                }}
                isSearchable={isSearchable}
                classNamePrefix="menu-select"
                options={options}
                defaultValue={defaultValue}
            />
        </MenuSelectContainer>
    );
}

interface IFormSelectProps {
    options: any[];
    label?: string | null;
    name: string;
    isSearchable?: boolean;
    isRequired?: boolean;
    defaultValue?: any;
    labelAttribute: string;
    withAddOption?: {
        title: string;
        onClick: () => void;
    };
    value?: any;
    error?: string;
    placeholder?: string;
}

export function FormSelect({
    options,
    isSearchable = false,
    isRequired,
    defaultValue,
    label,
    name,
    error,
    labelAttribute,
    value,
    withAddOption,
    placeholder = 'Vali...'
}: IFormSelectProps) {
    const SelectField: React.SFC<FieldProps> = ({ field, form }) => {
        const [isFocused, setFocused] = useState(false);

        const DropdownIndicator = () => <FiChevronDown className="indicator-icon dropdown-indicator" />;

        const handleClear = e => {
            if (e.cancelable) e.preventDefault();
            e.stopPropagation();
            form.setFieldValue(field.name, null);
        };

        const ClearIndicator = () => (
            <button type="button" onClick={handleClear} onMouseDown={handleClear} onTouchEnd={handleClear}>
                <FiX className="indicator-icon clear-indicator" />
            </button>
        );

        const AddOptionButton = props => {
            const { data } = props;
            return withAddOption && data.addButton ? (
                <div>
                    <AddButtonContainer type="button" onClick={withAddOption.onClick}>
                        <FiPlusCircle />&nbsp;{withAddOption.title}
                    </AddButtonContainer>
                </div>
            ) : (
                <components.Option {...props} />
            );
        };

        const modifyOptions = () => {
            return [{ addButton: true }, ...mapSelectOptions(labelAttribute, options)];
        };

        return (
            <FormSelectContainer isFocused={isFocused} value={mapSelectOption(labelAttribute, value)}>
                <ReactSelect
                    value={mapSelectOption(labelAttribute, field.value)}
                    className="form-select-container"
                    isSearchable={isSearchable}
                    classNamePrefix="form-select"
                    options={modifyOptions()}
                    isClearable={!isRequired}
                    openMenuOnFocus={true}
                    tabSelectsValue={false}
                    menuShouldScrollIntoView={true}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={placeholder}
                    onChange={(option: any) => form.setFieldValue(field.name, option.value)}
                    components={{
                        IndicatorSeparator: () => null,
                        DropdownIndicator: DropdownIndicator,
                        ClearIndicator: ClearIndicator,
                        Option: AddOptionButton
                    }}
                    name={name}
                    defaultValue={mapSelectOption(labelAttribute, defaultValue)}
                />
                <div className="input-underline" />
            </FormSelectContainer>
        );
    };

    return (
        <InputContainer>
            {label && (
                <label className="label" htmlFor={name}>
                    {label}
                </label>
            )}
            <div className="input-wrapper">
                <Field name={name} component={SelectField} options={options} />
            </div>
            <div className="error-message">{error}</div>
        </InputContainer>
    );
}

export default {
    FormSelect,
    MenuSelect
};
