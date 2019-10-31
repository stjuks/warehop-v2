import React, { useState } from 'react';
import ReactSelect, { components } from 'react-select';
import { FiChevronDown, FiArrowUp, FiArrowDown } from 'react-icons/fi';

import {
    FormSelectContainer,
    MenuSelectContainer,
    SortButtonContainer
} from './styles';

interface IOption {
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

export function MenuSelect({
    options,
    defaultValue,
    isSortable = false,
    isSearchable = true
}: SelectProps) {
    return (
        <MenuSelectContainer isSortable={isSortable}>
            <ReactSelect
                className="menu-select-container"
                components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: isSortable
                        ? SortableDropdownIndicator
                        : CustomDropdownIndicator
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
    options: IOption[];
    isSearchable?: boolean;
    defaultValue?: IOption;
    label: string;
    name: string;
    error?: string;
}

export function FormSelect({
    options,
    isSearchable = false,
    defaultValue,
    label,
    name,
    error
}: IFormSelectProps) {
    const DropdownIndicator = () => <FiChevronDown />;

    return (
        <FormSelectContainer value={defaultValue}>
            <label className="label" htmlFor={name}>
                {label}
            </label>
            <div className="input-wrapper">
                <ReactSelect
                    className="form-select-container"
                    isSearchable={isSearchable}
                    classNamePrefix="form-select"
                    options={options}
                    components={{
                        IndicatorSeparator: () => null,
                        DropdownIndicator: DropdownIndicator
                    }}
                    name={name}
                    defaultValue={defaultValue}
                />
                <div className="input-underline" />
            </div>
            <div className="error-message">{error}</div>
        </FormSelectContainer>
    );
}
