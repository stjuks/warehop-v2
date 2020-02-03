import styled from '@ui/util/styled';
import ContentContainer from '../util/ContentContainer';

export const InvoiceDetailsContainer = styled(ContentContainer)`
    padding: 1rem;
`;

export const InvoiceHero = styled.div`
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
        }
    }

    ${({ theme }) => `
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
}

export const IsPaidStyled = styled.div<IsPaidStyledProps>`
    padding: 0.25rem 0.5rem;
    margin-left: auto;
    border-radius: 1rem;
    font-size: 0.875rem;

    ${({ isPaid, theme }) => `
        background: ${isPaid ? theme.colors.success.opacity(0.075) : theme.colors.danger.opacity(0.075)};
        color: ${isPaid ? theme.colors.success : theme.colors.danger};
    `}
`;
