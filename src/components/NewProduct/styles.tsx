import styled, { css } from 'styled-components';
import { ContentContainer } from '../App/styles';

interface IFormRowContainerProps {
    flex?: number[];
}

export const NewProductContainer = styled(ContentContainer)`
    ${({ theme }) => `
        .form-subtitle {
            text-transform: uppercase;
            color: ${theme.colors.text};
            font-family: 'Red Hat Display', sans-serif;
            font-size: 0.875rem;
            font-weight: 500;
            margin: 0.5rem 0 1rem 0;
        }
    `}
`;

const createFlex = (flex: number[]) => {
    let styles = '';

    flex.forEach(
        (f, i) =>
            (styles += `
        > :nth-child(${i + 1}) {
            flex: ${f};
        }
    `)
    );

    return css`
        ${styles}
    `;
};

export const FormRowContainer = styled.div<IFormRowContainerProps>`
    ${({ flex = [1, 1] }) => `
        display: flex;

        > * {
            min-width: 0;

            :not(:last-child) {
                padding-right: 0.5rem;
            }

            :not(:first-child) {
                padding-left: 0.5rem;
            }
        }

        ${createFlex(flex)}
    `}
`;

export const AddWarehouseButton = styled.button`
    ${({ theme }) => `
        text-align: center;
        padding: 0.5rem;
        border-radius: 0.5rem;
        font-weight: 500;
        border: 1px dashed ${theme.colors.text};
        width: 100%;
        color: ${theme.colors.text};

        :hover, 
        :focus {
            background: ${theme.colors.lightColor1};
            outline: none;
        }
    `}
`;
