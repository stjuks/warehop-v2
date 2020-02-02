import styled from '@ui/util/styled';
import { Link } from 'react-router-dom';

export const ProductItemContainer = styled(Link)`
    ${({ theme }) => `
        padding: 1rem;
        display: flex;
        align-items: center;
        position: relative;

        :hover,
        :focus {
            outline: none;
            background: ${theme.colors.lightGrey};
            box-shadow: ${theme.lightShadow};
            
            :after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 4px;
                background: ${theme.colors.primary};
            }
        }

        .col-1 {
            flex: 1;
        }

        .col-2 {
            width: 2rem;
            color: ${theme.colors.lightText};
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }

        :not(:first-child) {
            border-top: 1px solid ${theme.colors.lightColor1};
        }

        .row-1,
        .row-2 {
            display: flex;
            align-items: center;
            padding: 0.25rem 0;
        }

        .row-1 {
            font-weight: 500;
            color: ${theme.colors.text};
        }

        .row-2 {
            font-size: 0.875rem;
            font-weight: 500;
            color: ${theme.colors.lightText};
        }

        .product-name,
        .product-code {
            margin-right: auto;
        }
    `}
`;
