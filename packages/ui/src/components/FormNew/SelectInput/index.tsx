import React, { useState, useEffect } from 'react';
import { FiX, FiChevronDown } from 'react-icons/fi';
import { SelectInputContainer, SelectMenuWrapper } from './styles';
import TextBasedInput, { InputAction } from '../TextBasedInput';
import { Button, Menu, MenuItem } from 'react-aria-menubutton';
import FormikField from '../util/FormikField';
import { useDebounce } from 'react-use';

interface BaseSelectInputProps {
  optionLabel: (option: any) => string;
  isClearable?: boolean;
  searchProps?: {
    onSearch: (query: string) => void | any[] | Promise<any[]>;
    placeholder?: string;
    debounce?: number;
  };
  options?: any[];
  label?: string;
  menuAction?: { label: string | React.ReactElement; onClick: () => any };
  className?: string;
}

interface SelectInputProps extends BaseSelectInputProps {
  onChange: (value: any) => any;
  value: any;
  error?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  optionLabel,
  options,
  searchProps,
  menuAction,
  onChange,
  value,
  error,
  isClearable,
  className,
}) => {
  const [isFocused, setFocused] = useState(false);
  const [isOpened, setOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOptions, setSearchOptions] = useState<any[] | undefined>(undefined);

  const handleSelection = (value: any) => {
    onChange(value);
  };

  const handleClear = () => {
    onChange(undefined);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleActionKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      menuAction?.onClick();
    }
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    menuAction?.onClick();
  };

  const handleFocus = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  const handleMenuToggle = ({ isOpen }) => {
    if (!isOpen) {
      setOpened(false);
      setSearchQuery('');
    } else {
      setOpened(true);
    }
  };

  useDebounce(
    () => {
      const fetchOptions = async () => {
        const searchResults = await searchProps?.onSearch(searchQuery);

        if (searchQuery) {
          if (Array.isArray(searchResults)) setSearchOptions(searchResults);
        } else {
          setSearchOptions(undefined);
        }
      };

      fetchOptions();
    },
    searchProps?.debounce || 200,
    [searchQuery]
  );

  const displayValue = value ? optionLabel(value) : '';

  const actions: InputAction[] = [{ icon: <FiChevronDown /> }];

  if (!!value && isClearable) {
    actions.unshift({ icon: <FiX />, onClick: handleClear });
  }

  const _options = searchQuery && searchOptions ? searchOptions : options;

  return (
    <SelectInputContainer
      onSelection={handleSelection}
      onMenuToggle={handleMenuToggle}
      data-opened={isOpened}
      className={className}
    >
      <TextBasedInput
        label={label}
        isFocused={isFocused}
        value={displayValue}
        error={error}
        inputComponent={
          <SelectMenuWrapper className="select-btn-wrapper">
            <Button className="select-menu-btn input-field" {...handleFocus}>
              {displayValue}
            </Button>
            <Menu className="select-menu" data-has-action={!!menuAction}>
              <>
                {searchProps && (
                  <input
                    onChange={handleSearch}
                    value={searchQuery}
                    className="search-input"
                    placeholder={searchProps.placeholder || 'Otsi'}
                  />
                )}
                <div className="options-list">
                  {_options?.map((option, i) => (
                    <MenuItem key={i} className="select-menu-item" value={option}>
                      {optionLabel(option)}
                    </MenuItem>
                  ))}
                </div>
                {menuAction && (
                  <MenuItem
                    className="action-btn"
                    onClick={handleActionClick}
                    onKeyDown={handleActionKeyDown}
                  >
                    {menuAction.label}
                  </MenuItem>
                )}
              </>
            </Menu>
          </SelectMenuWrapper>
        }
        actions={actions}
      />
    </SelectInputContainer>
  );
};

interface FormikSelectInputProps extends BaseSelectInputProps {
  name: string;
}

export const FormikSelectInput: React.FC<FormikSelectInputProps> = ({ name, ...restProps }) => (
  <FormikField name={name}>
    {(fieldProps) => <SelectInput {...restProps} {...fieldProps} />}
  </FormikField>
);

export default SelectInput;
