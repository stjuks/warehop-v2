import styled from 'styled-components';

interface InputFieldProps {
    isFocused?: boolean;
}

export const FormContainer = styled.form`
    padding: 0.75rem;
`;

export const FormTitle = styled.h3`
    ${({ theme }) => `
        padding: 0.25rem 1rem;
        text-transform: uppercase;
        box-shadow: inset 2px 0 0 ${theme.colors.primary};
        color: ${theme.colors.text};
        font-family: 'Red Hat Display', sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        margin: 1rem 0 1rem 0;
    `}
`;

export const InputContainer = styled.div.attrs({ className: 'input-container' })`
    display: flex;
    margin: 0.25rem;
    flex-direction: column;
    min-width: 11rem;
`;

export const LabelContainer = styled.label.attrs({ className: 'label' })`
    height: 1.5rem;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
`;

export const InputFieldContainer = styled.div<InputFieldProps>`
    ${({ isFocused, theme }) => `
        min-height: 2.5rem;
        display: flex;
        box-shadow: 0 1px 0 ${theme.colors.lightText};
        position: relative;

        .flatpickr-input[readonly] {
            cursor: default;
        }

        :after {
            content: '';
            height: 1px;
            width: ${isFocused ? '100%' : '0%'};
            transition: all .2s;
            position: absolute;
            background: ${theme.colors.primary};
            bottom: 0;
        }

        .value-container,
        .select-btn {
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

export const ErrorMessageContainer = styled.div.attrs({ className: 'error-message' })`
    ${({ theme }) => `
        height: 1.5rem;
        color: ${theme.colors.danger};
        font-size: 0.75rem;
        display: flex;
        align-items: center;
    `}
`;

export const InputIndicatorContainer = styled.div.attrs({ className: 'input-indicator' })`
    ${({ theme }) => `
        color: ${theme.colors.lightText};
        min-width: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    `}
`;
