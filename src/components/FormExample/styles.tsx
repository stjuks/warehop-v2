import styled from 'styled-components';

interface InputFieldProps {
    isFocused?: boolean;
}

export const InputContainer = styled.div.attrs({ className: 'input-container' })`
    display: flex;
    flex-direction: column;
`;

export const LabelContainer = styled.label.attrs({ className: 'label' })`
    height: 1.5rem;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
`;

export const InputFieldContainer = styled.div<InputFieldProps>`
    ${({ isFocused, theme }) => `
        height: 2.5rem;
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
