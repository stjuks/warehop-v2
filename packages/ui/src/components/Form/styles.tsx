import styled from '@ui/util/styled';

interface InputFieldProps {
  isFocused?: boolean;
  isMounted?: boolean;
  hasValue?: boolean;
}

export const FormContainer = styled.form`
  padding: 0.75rem;
`;

export const FormTitle = styled.h3`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    padding: 0.25rem 1rem;
    text-transform: uppercase;
    color: ${theme.colors.text};
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    margin: 1rem 0 1.5rem 0.25rem;
    position: relative;

    :before {
      content: '';
      position: absolute;
      background: ${theme.colors.primary};
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  `}
`;

export const InputContainer = styled.div.attrs(({ className }) => ({
  className: `input-container ${className}`
}))`
  display: flex;
  margin: 0.25rem;
  flex-direction: column;
`;

export const LabelContainer = styled.label.attrs({ className: 'label' })`
  height: 1.5rem;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
`;

export const InputFieldContainer = styled.div<InputFieldProps>`
  ${({ isFocused, theme, hasValue, isMounted = true }) => `
        min-height: 2.5rem;
        display: flex;
        box-shadow: 0 1px 0 ${theme.colors.lightText};
        position: relative;
        background: ${isFocused ? theme.colors.midGrey : 'transparent'};
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        transition: background .2s;


        .flatpickr-input[readonly] {
            cursor: default;
        }

        :after {
            content: '';
            height: 1px;
            width: ${isFocused || hasValue ? '100%' : '0%'};
            transition: ${isMounted ? 'width .2s' : 'none'};
            position: absolute;
            background: ${theme.colors.primary};
            bottom: 0;
        }

        .value-container,
        .select-btn,
        .react-autosuggest__container {
            flex: 1;
            width: 100%;
            height: 100%;
        }

        .value-container {
            padding-left: 0.5rem;
            display: flex;
            align-items: center;
            outline: none;
            background: transparent;
            font-size: 1rem;
            font-weight: 500;
            min-height: 2.5rem;
        }

        textarea {
            padding-top: 0.75rem;
            font-family: 'Roboto', sans-serif;
        }
    `}
`;

export const ErrorMessageContainer = styled.div.attrs({
  className: 'error-message'
})`
  ${({ theme }) => `
        height: 1.5rem;
        color: ${theme.colors.danger};
        font-size: 0.75rem;
        display: flex;
        align-items: center;
    `}
`;

export const InputIndicatorContainer = styled.div.attrs({
  className: 'input-indicator'
})`
  ${({ theme }) => `
        color: ${theme.colors.lightText};
        min-width: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    `}
`;
