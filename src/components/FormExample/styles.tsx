import styled from 'styled-components';

export const InputContainer = styled.div.attrs({ className: 'input-container' })`
    display: flex;
    flex-direction: column;

    .input-field {
        display: flex;
        position: relative;

        input {
            flex: 1;
            height: 2rem;
            width: 100%;
        }

        .icon {
            width: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .input-overlay {
            position: absolute;
            width: 100%;
            height: 100%;
        }
    }
`;
