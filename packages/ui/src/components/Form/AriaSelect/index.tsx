import React, { useState, useEffect, useRef } from 'react';
import { FieldProps, Field } from 'formik';
import { FiChevronDown, FiX, FiSearch } from 'react-icons/fi';
import { useDebounce } from 'react-use';

import {
  ButtonContainer,
  WrapperContainer,
  MenuItemContainer,
  MenuContainer,
  SearchInput,
  ActionButton,
  SearchContainer
} from './styles';
import { TextInputBase, InputActionButtons } from '../TextInput';
import {
  mapSelectOptions,
  mapSelectOption,
  MapSelectOptionAttributes
} from '../../../util/helpers';
import { observer } from 'mobx-react-lite';
import Loader from '../util/Loader';

export interface Option {
  label: string;
  value: any;
}

interface AriaSelectProps {
  name: string;
  options: any[];
  optionMap?: MapSelectOptionAttributes;
  searchPlaceholder?: string;
  placeholder?: string;
  className?: string;
  value?: any;
  label?: string;
  action?: {
    onClick: () => any;
    label: string | React.ReactElement;
  };
  isClearable?: boolean;
  noFormik?: boolean;
  unregisterOnUnmount?: boolean;
  onChange?: (value: Option) => any;
  onMenuOpen?: () => any;
  onSearch?: (query: string, mappedOptions: Option[]) => any;
}

const AriaSelectBase: React.FC<AriaSelectProps & Partial<FieldProps>> = observer(
  ({
    label,
    field,
    form,
    name,
    options,
    optionMap,
    isClearable,
    onChange,
    className,
    placeholder,
    onSearch,
    searchPlaceholder,
    value,
    action,
    onMenuOpen
  }) => {
    const [mappedOptions, setMappedOptions] = useState<Option[]>([]);
    const [searchOptions, setSearchOptions] = useState<Option[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [displayValue, setDisplayValue] = useState('');

    const [isLoadingOptions, setLoadingOptions] = useState(false);
    const [isLoadingSearch, setLoadingSearch] = useState(false);

    const fieldValue = field ? field.value : value;

    useEffect(() => {
      const loadOptions = async () => {
        setLoadingOptions(true);

        const loadedOptions = await options;

        setMappedOptions(mapSelectOptions(loadedOptions, optionMap));
        setLoadingOptions(false);
      };

      loadOptions();
    }, [options]);

    useEffect(() => {
      if (fieldValue) setDisplayValue(mapSelectOption(fieldValue, optionMap).label);
    }, [fieldValue])

    const handleSelect = ({ value, label }) => {
      if (onChange) onChange({ value, label });
      else if (form && field) {
        form.setFieldValue(field.name, value);
      }
      setDisplayValue(label);
    };

    const handleClear = e => {
      e.stopPropagation();
      if (form && field) form.setFieldValue(field.name, undefined);
      if (onChange) onChange({ value: undefined, label: '' });
      setDisplayValue('');
    };

    useDebounce(
      async () => {
        if (onSearch) {
          setLoadingSearch(true);
          await onSearch(searchQuery, mappedOptions);
          setLoadingSearch(false);
        }
      },
      300,
      [searchQuery]
    );

    const handleMenuToggle = ({ isOpen }) => {
      if (!isOpen) {
        setSearchQuery('');
      } else {
        if (onMenuOpen) onMenuOpen();
      }
    };

    return (
      <WrapperContainer
        className={className || ''}
        onSelection={handleSelect}
        onMenuToggle={handleMenuToggle}
      >
        <TextInputBase
          label={label}
          name={`${name}Display`}
          inputComponent={
            <InputComponent
              displayValue={displayValue}
              placeholder={placeholder}
              isClearable={isClearable}
              options={mappedOptions}
              handleSearch={e => setSearchQuery(e.target.value)}
              handleClear={handleClear}
              searchQuery={searchQuery}
              searchPlaceholder={searchPlaceholder}
              isSearchable={onSearch !== undefined}
              isLoadingSearch={isLoadingSearch}
              action={action}
            />
          }
          value={displayValue}
          errorMessage={form && field && form.errors[field.name]}
        />
      </WrapperContainer>
    );
  }
);

const InputComponent: React.FC<any> = observer(
  ({
    displayValue,
    placeholder,
    isClearable,
    options,
    handleSearch,
    handleClear,
    searchQuery,
    searchPlaceholder,
    isSearchable,
    isLoadingSearch,
    action
  }) => {

    const handleActionKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.key === 'Enter' && action) {
        action.onClick();
      }
    };

    const handleActionClick = (e: MouseEvent) => {
      e.preventDefault();
      if (action) action.onClick();
    };

    return (
      <>
        <ButtonContainer>
          <div className="inner-btn-container">
            <span className={`value-container ${!displayValue && `placeholder`}`}>
              {displayValue || placeholder}
            </span>
            <InputActionButtons
              indicator={<FiChevronDown />}
              action={
                isClearable && displayValue
                  ? { icon: <FiX />, onClick: e => handleClear(e) }
                  : undefined
              }
            />
          </div>
        </ButtonContainer>
        <MenuContainer>
          {isSearchable && (
            <SearchContainer>
              <SearchInput
                placeholder={searchPlaceholder || 'Otsi'}
                onChange={handleSearch}
                value={searchQuery}
              />
              {isLoadingSearch && <Loader />}
            </SearchContainer>
          )}
          <ul className="item-list">
            {options.map((item, i) => {
              return (
                <MenuItemContainer
                  key={i}
                  value={item}
                  text={item.label}
                  data-active={displayValue === item.label}
                >
                  {item.label}
                </MenuItemContainer>
              );
            })}
          </ul>
          {action && (
            <ActionButton onClick={handleActionClick} onKeyDown={handleActionKeyDown}>
              {action.label}
            </ActionButton>
          )}
        </MenuContainer>
      </>
    );
  }
);

const AriaSelect: React.FC<AriaSelectProps> = observer(({ noFormik, ...restProps }) =>
  noFormik ? <AriaSelectBase {...restProps} /> : <Field {...restProps} component={AriaSelectBase} />
);

export default AriaSelect;
