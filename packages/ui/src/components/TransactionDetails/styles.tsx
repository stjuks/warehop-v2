import styled from 'styled-components';
import theme from '@ui/styles/theme';
import { TransactionType } from '@shared/types';

interface TransactionTitleProps {
  type: TransactionType;
}

export const TransactionTitle = styled.div<TransactionTitleProps>`
  font-weight: 500;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0.5rem 0;
  justify-content: center;
  padding-left: 1.25rem;

  :before {
    content: '';
    position: absolute;
    left: 0;
    height: 100%;
    width: 2px;
    background: ${theme.colors.primary.rgb()};
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .col-2 {
    margin-left: auto;
  }

  .row {
    display: flex;
    align-items: center;
  }

  .partner-name {
    padding-right: 2rem;
    flex: 1;
    font-size: 1.5rem;
  }

  .partner-name,
  .status,
  .sum {
    padding: 0.25rem 0;
  }

  .status {
    margin-left: 0.625rem;

    :before {
      color: ${theme.colors.darkGrey.rgb()};
      margin-right: 0.625rem;
      content: '·';
    }
  }

  .sum {
    color: ${({ type }) =>
      type === 'INCOME' ? theme.colors.success.rgb() : theme.colors.danger.rgb()};
    font-size: 1.25rem;
    font-weight: 500;

    :before {
      color: ${({ type }) =>
        type === 'INCOME' ? theme.colors.success.rgb() : theme.colors.danger.rgb()};
      content: ${({ type }) => (type === 'INCOME' ? "'+'" : "'-'")};
    }
  }
`;
