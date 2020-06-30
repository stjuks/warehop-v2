import styled from 'styled-components';
import theme from '@ui/styles/theme';

import MainListItem from '../util/MainListItem';

export const ProductItemContainer = styled(MainListItem)`
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
    color: ${theme.colors.text.rgb()};
  }

  .row-2 {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${theme.colors.lightText.rgb()};
  }

  .product-name,
  .product-code {
    margin-right: auto;
  }
`;
