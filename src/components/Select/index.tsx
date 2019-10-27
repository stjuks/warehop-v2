import React, { useState } from 'react';
import ReactSelect, { components } from 'react-select';
import { FiChevronDown, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { TiArrowDown, TiArrowUp } from 'react-icons/ti';

import { SelectContainer, SortButtonContainer } from './styles';

interface IOption {
    value: string | Object | Number | undefined;
    label: string;
}

interface ISelectProps {
    className: "menu-select" | "form-select";
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

function Select({
    options,
    className,
    defaultValue,
    isSortable,
    isSearchable = true
}: SelectProps) {
    return (
        <SelectContainer isSortable={isSortable}>
            <ReactSelect
                className={`${className}-container`}
                components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: isSortable
                        ? SortableDropdownIndicator
                        : CustomDropdownIndicator
                }}
                isSearchable={isSearchable}
                classNamePrefix={className}
                options={options}
                defaultValue={defaultValue}
            />
        </SelectContainer>
    );
}

export default Select;
