import styled from '@ui/util/styled';
import { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import MainListItem from '../util/MainListItem';

export const ProductItemContainer = styled(MainListItem)`
  ${({ theme }) => `
        .col-1 {
            flex: 1;
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
