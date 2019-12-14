import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { ContentContainer } from '../App/styles';

export const NewProductContainer = styled(ContentContainer)``;

export const AddPurchaseItemBtn = styled(Link)`
    ${({ theme }) => `
        margin-left: auto;
        border-radius: 0.25rem;
        color: ${theme.colors.lightText};
        font-weight: 500;
        display: flex;
        align-items: center;
        
        white-space: nowrap;
    `}
`;

export const PurchaseItemContainer = styled.div`
    ${({ theme }) => `
        padding: 1rem 0;

        :not(:last-child) {
            border-bottom: 1px solid ${theme.colors.midGrey};
        }

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
