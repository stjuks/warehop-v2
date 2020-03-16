import styled, { Color } from '@ui/util/styled';
import Link from '../util/Link';
import currency from 'currency.js';
import ContentContainer from '../util/ContentContainer';
import { detailCardStyles } from '../ProductDetails/styles';

interface InvoiceHeroProps {
  paidSum: number;
}

export const InvoiceDetailsContainer = styled(ContentContainer)`
  padding: 1rem;
`;

export const InvoiceHero = styled.div<InvoiceHeroProps>`
  ${({ theme, paidSum }) => `
    padding: 0.5rem 0 0.5rem 1.25rem;
    position: relative;

    .row-1 {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .row-1,
    .row-2 {
      display: flex;
      align-items: center;

      .col-2 {
        margin-left: auto;
        position: relative;

        :before {
          content: '${currency(paidSum)}€ /';
          white-space: nowrap;
          position: absolute;
          font-size: 0.75rem;
          right: 0;
          top: -0.875rem;
          color: ${theme.colors.lightText};
          font-weight: 400;
        }
      }
    }

    :before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        height: 100%;
        width: 2px;
        background: ${theme.colors.primary};
    }

    .row-2 {
        font-weight: 500;
        color: ${theme.colors.lightText};
    }
  `}
`;

interface IsPaidStyledProps {
  isPaid: boolean;
  isLocked: boolean;
}

export const IsPaidStyled = styled.div<IsPaidStyledProps>`
  padding: 0.25rem 0.5rem;
  margin-left: auto;
  border-radius: 1rem;
  font-size: 0.875rem;
  display: inline-block;

  ${({ isPaid, theme, isLocked }) => {
    let color: Color = theme.colors.lightText;

    if (isLocked === false) color = theme.colors.primary;
    else if (isPaid) color = theme.colors.success;
    else color = theme.colors.danger;

    return `
      background: ${color.opacity(0.075)};
      color: ${color};
    `;
  }}
`;

export const TransactionItem = styled(Link)`
  ${({ theme }) => `
    ${detailCardStyles(theme)}

    display: flex;
    align-items: center;

    .sum  {
      font-weight: 500;
    }
    
    .expense-arrow,
    .income-arrow {
      margin-right: 0.5rem;
      font-size: 0.75rem;
    }

    .expense-arrow {
      color: ${theme.colors.danger};
    }

    .income-arrow {
      color: ${theme.colors.success};
    }

    .indicator {
      color: ${theme.colors.lightText};
      margin-left: 0.5rem;
    }

    .date {
      margin-left: auto;
      font-size: 0.875rem;
      color: ${theme.colors.lightText};
    }

    transition: all .2s;

    :hover,
    :focus {
      outline: none;
      transform: translateY(5%);
      box-shadow: 0 0 0 rgba(0, 0, 0, .05);
    }
  `}
`;
