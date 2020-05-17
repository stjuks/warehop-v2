import React, { useState, useEffect } from 'react';
import { FormikProps, useFormikContext } from 'formik';
import { FiX } from 'react-icons/fi';
import FormikField from '../util/FormikField';
import TextBasedInput, { InputAction } from '../TextBasedInput';
import ReactAutosuggest from 'react-autosuggest';
import { useDebounce } from 'react-use';
import { AutosuggestInputContainer, DefaultSuggestionItem } from './styles';

interface SuggestionSection {
  title: string;
  suggestions: any[];
}

interface BaseAutosuggestInputProps {
  suggestions: any[] | SuggestionSection[];
  fetchSuggestions: (value: string | undefined) => void;
  suggestionLabel: (
    suggestion: any,
    props: { isHighlighted: boolean }
  ) => string | React.ReactElement;
  label?: string;
  multiSection?: boolean;
}

interface AutosuggestInputProps extends BaseAutosuggestInputProps {
  value: string;
  error?: string;
  onSelect: (value: any) => void;
  onChange: (value: string | undefined) => void;
}

const AutosuggestInput: React.FC<AutosuggestInputProps> = ({
  value,
  onChange,
  error,
  label,
  suggestions,
  suggestionLabel,
  onSelect,
  multiSection,
  fetchSuggestions,
}) => {
  const [isFocused, setFocused] = useState(false);
  const [localValue, setLocalValue] = useState('');

  const handleSuggestionSelect = (e: React.KeyboardEvent, { suggestionValue }) => {
    e.preventDefault();
    onSelect(suggestionValue);
  };

  const handleSuggestionsChange = () => {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, { method }) => {
    onChange(e.target.value);
    if (method === 'type') {
      setLocalValue(e.target.value);
    }
  };

  const handleClear = () => {
    onChange(undefined);
  };

  const handleSuggestionRender = (suggestion: any, { isHighlighted }) => {
    const suggestionElement = suggestionLabel(suggestion, { isHighlighted });

    if (typeof suggestionElement === 'string') {
      return (
        <DefaultSuggestionItem isHighlighted={isHighlighted}>
          {suggestionElement}
        </DefaultSuggestionItem>
      );
    } else {
      return 'jou';
    }
  };

  useDebounce(
    () => {
      if (localValue) fetchSuggestions(localValue);
    },
    300,
    [localValue]
  );

  const handleFocus = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  const actions: InputAction[] = [];

  if (!!value) {
    actions.push({ icon: <FiX />, onClick: handleClear });
  }

  const inputProps = {
    value: value || '',
    onChange: handleChange,
    className: 'input-field',
    ...handleFocus,
  };

  return (
    <TextBasedInput
      isFocused={isFocused}
      label={label}
      value={value}
      error={error}
      actions={actions}
      inputComponent={
        <AutosuggestInputContainer className="autosuggest-container">
          <ReactAutosuggest
            suggestions={suggestions || []}
            onSuggestionSelected={handleSuggestionSelect}
            onSuggestionsClearRequested={() => null}
            onSuggestionsFetchRequested={handleSuggestionsChange}
            shouldRenderSuggestions={() => true}
            getSuggestionValue={(suggestion) => suggestion}
            multiSection={multiSection}
            renderSuggestion={handleSuggestionRender}
            renderSectionTitle={(section) => <strong>{section.title}</strong>}
            getSectionSuggestions={(section) => section.suggestions}
            inputProps={inputProps}
          />
        </AutosuggestInputContainer>
      }
    />
  );
};

interface FormikAutosuggestInputProps extends BaseAutosuggestInputProps {
  name: string;
  onSelect: (value: any, formik: FormikProps<any>) => void;
}

export const FormikAutosuggestInput: React.FC<FormikAutosuggestInputProps> = ({
  name,
  onSelect,
  ...restProps
}) => {
  const formik = useFormikContext();

  return (
    <FormikField name={name}>
      {(fieldProps) => {
        const handleChange = (value: string) => {
          fieldProps.onChange(value);
        };

        const handleSelect = (value: any) => {
          onSelect(value, formik);
        };

        return (
          <AutosuggestInput
            {...restProps}
            {...fieldProps}
            onSelect={handleSelect}
            onChange={handleChange}
          />
        );
      }}
    </FormikField>
  );
};

export default AutosuggestInput;
