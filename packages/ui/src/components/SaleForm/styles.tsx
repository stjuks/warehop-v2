import styled from '@ui/util/styled';
import Link from '../util/Link';

export const AddPurchaseItemBtn = styled.button`
  ${({ theme }) => `
    color: ${theme.colors.primary};
    padding: 0.125rem 0.5rem;
    border: 1px solid ${theme.colors.primary};
    border-radius: 5rem;
    text-transform: none;
    white-space: nowrap;
    margin-left: 1rem;
    display: flex;
    align-items: center;
  `}
`;

export const PurchaseItemContainer = styled.div`
  ${({ theme }) => `
    padding: 1rem;
    background: ${theme.colors.white};
    box-shadow: ${theme.lightShadow};
    position: relative;
    border-radius: 0.25rem;

    :not(:last-child) { margin-bottom: 1.5rem !important; }

    .action-items {
      position: absolute;
      right: -0.25rem;
      top: -1rem;
      display: flex;
      font-size: 1.125rem;

      .btn { 
        color: ${theme.colors.lightText};
        display: flex; 
        padding: 0.375rem;
        border-radius: 5rem;
        background: ${theme.colors.white};
        box-shadow: ${theme.lightShadow};

        &.btn__delete {
            margin-right: 0.5rem;
        }

        :hover, :focus {
            color: ${theme.colors.primary};
        }
      }
    }

    .row {
      display: flex;
      padding: 0.25rem 0;
      color: ${theme.colors.lightText};
    }

    .attr-2,
    .attr-4,
    .attr-6 {
      margin-left: auto;
    }

    .row-1 {
        color: ${theme.colors.text};
      font-weight: 500;
    }

    .row-2 {
      font-weight: 500;
    }

    .row-2,
    .row-3 {
      font-size: 0.875rem;
    }

    .edit-item-btn {
      color: ${theme.colors.primary};
      margin-right: .5rem;
    }

    .delete-item-btn {
      color: ${theme.colors.danger};
    }
  `}
`;
