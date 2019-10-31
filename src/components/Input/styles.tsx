import styled from 'styled-components';
import { ContentContainer } from '../App/styles';

interface IInputContainerProps {
    value?: any;
}

export const InputContainer = styled.div<IInputContainerProps>`
    ${({ theme, value }) => `
        display: flex;
        flex-direction: column;
        min-height: 5rem;

        .label {
            height: 1.5rem;
            font-size: 0.875rem;
            display: flex;
            align-items: flex-end;
        }

        .input-wrapper {
            min-height: 2rem;
            display: flex;
            align-items: center;
            position: relative;
        }

        .input-underline {
            height: 1px;
            position: absolute;
            bottom: 0;
            width: 100%;
            background: ${theme.colors.lightText};

            :after {
                content: '';
                position: absolute;
                transition: all 0.2s;
                bottom: 0;
                height: 1px;
                transform-origin: left;
                width: 100%;
                background: ${theme.colors.text};
                transform: scaleX(${value ? 1 : 0});
            }
        }

        .input-field {
            background: transparent;
            border: none;
            flex: 1;
            min-height: 2rem;
            font-size: 1rem;
            padding: 0;
            font-weight: 500;
            color: ${theme.colors.text};

            :focus { 
                outline: none; 

                ~ .input-underline:after {
                    transform: scaleX(1);
                }
            }
        }

        .input-icon, 
        .input-clear {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1.5rem;
            height: 100%;
            color: ${theme.colors.lightText};
        }

        .input-clear { cursor: pointer; }

        .error-message {
            height: 1.5rem;
            color: ${theme.colors.danger};
            font-size: 0.75rem;
            display: flex;
            align-items: center;
        }
    `}
`;
