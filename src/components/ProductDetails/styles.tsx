import styled, { css } from 'styled-components';

const detailLabel = theme => `
    margin-bottom: 0.25rem;
    font-family: 'Red Hat Display', sans-serif;
    color: ${theme.colors.lightText};
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
`;

export const TitleContainer = styled.div`
    ${({ theme }) => `
        box-shadow: inset 2px 0 0 ${theme.colors.primary};
        padding: 0.5rem 0 0.5rem 1.5rem;

        .product-name {
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
            font-weight: 700;
            color: ${theme.colors.text};
        }

        .product-code {
            color: ${theme.colors.lightText};
            font-size: 1.25rem;
            font-weight: 500;
        }
    `}
`;

export const DetailLabel = styled.div`
    ${({ theme }) => `
        ${detailLabel(theme)};
        margin: 1rem 0;
    `}
`;

export const DetailCardContainer = styled.div`
    ${({ theme }) => `
        padding: 1rem;
        margin-top: 1rem;
        background: ${theme.colors.white};
        box-shadow: ${theme.lightShadow};
        border-radius: 0.5rem;
        border: 1px solid ${theme.colors.lightColor1};

        .row {
            display: flex;

            :not(:last-child) {
                margin-bottom: 1rem;
            }
        }

        .detail {
            flex: 1;
            padding: 0;
        }

        .detail-label {
            ${detailLabel(theme)}
        }

        .detail-value {
            color: ${theme.colors.text};
            font-weight: 500;
        }
    `}
`;

export const WarehouseRowContainer = styled.div`
    ${({ theme }) => `
        display: flex;
        font-weight: 500;
        padding: 0.5rem 0;
        color: ${theme.colors.text};

        :last-child {
            border-top: 1px solid ${theme.colors.lightColor1};
            font-weight: 700;
        }

        .warehouse-name {
            margin-right: auto;
        }
    `}
`;
