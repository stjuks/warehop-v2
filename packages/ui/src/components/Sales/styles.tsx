import styled from '../../util/styled';
import { ProductItemContainer } from '../ProductItem/styles';

interface DaysLeftStyledProps {
    diff: number | undefined;
    isPaid: boolean;
}

export const PurchaseItemContainer = styled(ProductItemContainer)`
    ${({ theme }) => `
        .sum,
        .days-left {
            margin-left: auto;
        }
    `}
`;

export const DaysLeftStyled = styled.div<DaysLeftStyledProps>`
    margin-left: auto;
    ${({ theme, isPaid, diff }) => {
        if (isPaid) return `color: ${theme.colors.success};`;
        if (diff !== undefined) {
            if (diff <= 1) return `color: ${theme.colors.danger};`;
            if (diff <= 3) return `color: ${theme.colors.warning};`;
        }
    }}
`;
