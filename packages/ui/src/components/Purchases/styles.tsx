import styled from 'styled-components';
import { ProductItemContainer } from '../ProductItem/styles';
import AriaSelect from '../Form/AriaSelect';

interface DaysLeftStyledProps {
    diff: number | undefined;
    isPaid: boolean;
}

export const PurchaseItemContainer = styled(ProductItemContainer)`
    ${({ theme }) => `
        .sum,
        .days-left {
            margin-left: auto;
        }
    `}
`;

export const DaysLeftStyled = styled.div<DaysLeftStyledProps>`
    margin-left: auto;
    position: relative;

    :before {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        content: '';
        background: red;
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.075;
        padding: 0.15rem 0.5rem;
        border-radius: 2rem;
        background: currentColor;
    }

    ${({ theme, isPaid, diff }) => {
        if (isPaid) return `color: ${theme.colors.success};`;
        if (diff !== undefined) {
            if (diff <= 1) return `color: ${theme.colors.danger};`;
            if (diff <= 3) return `color: ${theme.colors.warning};}`;
            return `color: ${theme.colors.lightText};`;
        }
    }}
`;

export const SelectStyled = styled(AriaSelect)`
    ${({ theme }) => `
        label {
            text-transform: uppercase;
            font-size: 0.75rem;
            color: ${theme.colors.lightText};
        }

        .input-container { margin: 0; }

        .error-message { display: none; }

        .input-field {
            box-shadow: none;
            border-radius: 2rem;

            :hover,
            :focus { 
                background: transparent;
            }

            ::after {
                content: none;
            }
        }

        .select-btn {
            background: ${theme.colors.white};
            border: 1px solid ${theme.colors.midGrey};
            border-radius: 1.25rem;
            transition: border-color .2s;
        }

        .select-btn:focus,
        .select-btn:hover,
        .select-btn[aria-expanded="true"] {
            border-color: ${theme.colors.lightText};
        }

        .select-btn[aria-expanded="true"] {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }

        .value-container {
            font-size: 0.875rem;
        }

        .inner-btn-container {
            padding: 0 0.5rem;
        }

        .select-menu {
            box-shadow: none;
            border: 1px solid ${theme.colors.lightText};
            top: 100%;
            border-top-width: 0;
            border-radius: 0 0 0.25rem 0.25rem;
        }

        .placeholder {
            color: ${theme.colors.lightText};
            font-weight: 400;
        }
    `}
`;
