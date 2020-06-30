import styled from 'styled-components';
import { ProductItemContainer } from '../ProductItem/styles';

export const PartnerListItemContainer = styled(ProductItemContainer as any)`
  .col-1 {
    .row-2 {
      display: block;

      .react-icon {
        margin-right: 0.5rem;
        opacity: 0.5;
      }

      .contact-detail {
        display: flex;
        align-items: center;
        font-weight: 400;

        :not(:last-child) {
          margin-bottom: 0.5rem;
        }
      }
    }
  }
`;
