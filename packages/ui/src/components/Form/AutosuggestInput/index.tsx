import React, { useState } from 'react';
import { Field, FieldProps } from 'formik';
import ReactAutosuggest from 'react-autosuggest';

import { useDebounce } from '../../../util/hooks';
import { mapSelectOptions, MapSelectOptionAttributes } from '../../../util/helpers';
import { MenuItemContainer, MenuContainer } from '../util/DropdownMenu';
import { TextInputBase, InputActionButtons } from '../TextInput';
import { FiX } from 'react-icons/fi';
import Loader from '../util/Loader';

interface AutosuggestInputProps {
  name: string;
  label: string;
  suggestionMap: MapSelectOptionAttributes;
  getSuggestions: (query: string) => Promise<any[]> | any[];
  onSelect?: (...args: any) => any;
  onChange?: (value: string) => any;
}

const AutosuggestInputBase: React.FC<AutosuggestInputProps & FieldProps> = ({
  form,
  field,
  label,
  onSelect,
  suggestionMap,
  getSuggestions,
  onChange
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoadingSuggestions, setLoadingSuggestions] = useState(false);

  const getSuggestionValue = suggestion => suggestion.label;

  const renderSuggestion = suggestion => <MenuItemContainer>{suggestion.label}</MenuItemContainer>;

  const loadSuggestions = useDebounce(async query => {
    try {
      setLoadingSuggestions(true);
      const loadedSuggestions = await getSuggestions(query);
      const mappedSuggestions = mapSelectOptions(loadedSuggestions, suggestionMap);
      setSuggestions(mappedSuggestions);
      setLoadingSuggestions(false);
    } catch (err) {
      throw err;
    }
  }, 500);

  const handleChange = (e, { newValue }) => {
    if (onChange) onChange(newValue);
    form.setFieldValue(field.name, newValue);
  };

  const onSuggestionSelected = (e, rest) => {
    e.preventDefault();
    form.setFieldValue(field.name, rest.suggestionValue);
    if (onSelect) onSelect({ ...rest, formik: form });
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    loadSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    value: field.value || '',
    name: field.name,
    onChange: handleChange,
    className: 'value-container'
  };

  return (
    <TextInputBase
      label={label}
      name={field.name}
      value={field.value}
      inputComponent={
        <>
          <ReactAutosuggest
            suggestions={suggestions}
            onSuggestionSelected={onSuggestionSelected}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            inputProps={inputProps}
            renderSuggestion={renderSuggestion}
            getSuggestionValue={getSuggestionValue}
            renderSuggestionsContainer={({ containerProps, children, query }) => (
              <MenuContainer {...containerProps}>{children}</MenuContainer>
            )}
          />
          <InputActionButtons
            indicator={isLoadingSuggestions ? <Loader /> : undefined}
            action={
              field.value && {
                icon: <FiX />,
                onClick: () => form.setFieldValue(field.name, '')
              }
            }
          />
        </>
      }
      errorMessage={form.errors[field.name]}
    />
  );
};

const AutosuggestInput: React.FC<AutosuggestInputProps> = props => (
  <Field {...props} component={AutosuggestInputBase} />
);

export default AutosuggestInput;
