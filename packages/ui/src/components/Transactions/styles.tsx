import styled from '@ui/util/styled';
import { TransactionType } from '@shared/types';
import { ContentContainer } from '../App/styles';
import MainListItem from '../util/MainListItem';

export const ProductsContainer = styled(ContentContainer)``;

export const SortingContainer = styled.div`
  ${({ theme }) => `
        background: ${theme.colors.lightGrey};
        border-bottom: 1px solid ${theme.colors.lightColor1};
    `}
  display: flex;
  padding: 0.5rem 0.75rem;
  align-items: center;

  > * {
    flex: 1;
    padding: 0.25rem;
  }
`;

export const NewItemButtonContainer = styled.button`
  ${({ theme }) => `
        display: flex;
        color: ${theme.colors.primary};
        text-shadow: ${theme.blueShadow};
        cursor: pointer;

        && svg {
            stroke-width: 2;
            font-size: 2rem;
        }
    `}
`;

interface TransactionItemContainerProps {
  type: TransactionType;
}

export const TransactionItemContainer = styled(MainListItem)<TransactionItemContainerProps>`  
  .content {
    font-weight: 500;
  }

  .col {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .col-1 {
    margin-right: auto;
  }

  .col-2 {
    text-align: right;
  }

  .invoice-nr,
  .date,
  .sum,
  .partner-name {
    padding: 0.25rem 0;
  }

  ${({ theme, type }) => `
    .invoice-nr,
    .date {
      color: ${theme.colors.lightText};
      font-size: 0.875rem;
    }

    .sum {
      color: ${type === 'EXPENSE' ? theme.colors.danger : theme.colors.success};

      :before {
        content: ${type === 'EXPENSE' ? '\'-\'' : '\'+\''};
      }
    }
  `}
`;
