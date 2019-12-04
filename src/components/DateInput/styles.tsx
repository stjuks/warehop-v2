import styled from 'styled-components';

export const DateInputContainer = styled.div`
    position: relative;

    .SingleDatePicker {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .SingleDatePicker_picker {
        opacity: 1;
    }

    .DateInput_input {
        padding: 0;
        font-size: 0px;
        background: transparent;
    }

    .DateInput,
    .SingleDatePickerInput,
    .DateInput_input {
        background: transparent;
        width: 100%;
        height: 3.5rem;
    }

    .SingleDatePickerInput__withBorder {
        border: none;
    }

    .SingleDatePickerInput {
        background: transparent;
    }

    .DateInput_input__focused {
        border: none;
        background: transparent;
    }
`;
