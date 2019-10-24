import styled from 'styled-components';

export const ProductItemContainer = styled.div`
    padding: 1rem 0;
    display: flex;
    align-items: center;

    .col-1 {
        flex: 1;
    }

    .col-2 {
        text-align: right;
        width: 2rem;
        ${({ theme }) => `color: ${theme.colors.lightText};`}
    }

    :not(:first-child) {
        ${({ theme }) => `border-top: 1px solid ${theme.colors.lightColor1};`}
    }

    .row-1,
    .row-2 {
        display: flex;
        padding: 0.25rem 0;
    }

    .row-1 {
        font-weight: 500;
        ${({ theme }) => `color: ${theme.colors.text};`}
    }

    .row-2 {
        font-size: 0.875rem;
        font-weight: 500;
        ${({ theme }) => `color: ${theme.colors.lightText};`}
    }

    .product-name,
    .product-code {
        margin-right: auto;
    }
`;
