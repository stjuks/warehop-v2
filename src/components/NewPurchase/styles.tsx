import styled, { css } from 'styled-components';
import { ContentContainer } from '../App/styles';

export const NewProductContainer = styled(ContentContainer)``;

export const AddPurchaseItemBtn = styled.button`
    ${({ theme }) => `
        margin-left: auto;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        color: ${theme.colors.lightText};
        font-weight: 500;
        white-space: nowrap;
    `}
`;

export const PurchaseItemContainer = styled.div`
    ${({ theme }) => `
        padding: 0.75rem 1rem;
        margin: 1rem 0;
        box-shadow: ${theme.lightShadow};
        border-radius: 0.25rem;
        background: ${theme.colors.white};

        .row {
            display: flex;
            padding: 0.25rem 0;
            color: ${theme.colors.lightText};
        }

        .item-sum,
        .item-quantity-price,
        .item-actions {
            margin-left: auto;
        }

        .row-1 {
            color: ${theme.colors.text};
            font-weight: 500;
        }

        .row-2,
        .row-3 {
            font-size: 0.875rem;
        }

        .edit-item-btn {
            color: ${theme.colors.primary};
            margin-right: .5rem;
        }

        .delete-item-btn {
            color: ${theme.colors.danger};
        }
    `}
`;
