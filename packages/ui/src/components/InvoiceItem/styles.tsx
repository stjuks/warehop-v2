import styled, { Color } from '@ui/util/styled';
import { ProductItemContainer } from '../ProductItem/styles';

interface DaysLeftStyledProps {
  diff: number | undefined;
  isPaid: boolean;
  isLocked: boolean;
}

export const InvoiceItemContainer = styled(ProductItemContainer)`
  .sum,
  .days-left {
    margin-left: auto;
  }
`;

export const DaysLeftStyled = styled.div<DaysLeftStyledProps>`
  margin-left: auto;
  position: relative;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.875rem;

  ${({ theme, isPaid, diff, isLocked }) => {
    let color: Color = theme.colors.lightText;

    if (isLocked === false) color = theme.colors.lightText;
    else if (isPaid) color = theme.colors.success;
    else if (diff !== undefined) {
      if (diff <= 3) color = theme.colors.warning;
      if (diff <= 1) color = theme.colors.danger;
    }

    return `
            color: ${color};
            background: ${color.opacity(0.075)};
        `;
  }}
`;
