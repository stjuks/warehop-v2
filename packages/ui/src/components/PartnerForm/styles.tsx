import { css } from 'styled-components';
import styled from '@ui/util/styled';
import { ContentContainer } from '../App/styles';

interface IFormRowContainerProps {
    flex?: number[];
}

export const ProductFormContainer = styled(ContentContainer)`
    ${({ theme }) => `
        .form-subtitle {
            padding: 0.25rem 1rem;
            text-transform: uppercase;
            box-shadow: inset 2px 0 0 ${theme.colors.primary};
            color: ${theme.colors.text};
            font-family: 'Red Hat Display', sans-serif;
            font-size: 0.875rem;
            font-weight: 500;
            margin: 1rem 0 1rem 0;
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
        padding: 0.5rem;
        border-radius: 0.25rem;
        font-weight: 500;
        border: 1px dashed ${theme.colors.text};
        width: 100%;
        color: ${theme.colors.text};
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
        justify-content: center;

        :hover, 
        :focus {
            background: ${theme.colors.lightColor1};
            outline: none;
        }
    `}
`;

export const TrashButtonContainer = styled.div`
    ${({ theme }) => `
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        
        && {
            padding: 0;
            padding-bottom: 1.75rem;
        }

        button {
            color: ${theme.colors.lightText};
        }
    `}
`;
