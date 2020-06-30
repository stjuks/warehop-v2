import styled from 'styled-components';
import theme from '@ui/styles/theme';

export const InvoiceItemListItemContainer = styled.div`
  padding: 1rem;
  background: ${theme.colors.white.rgb()};
  box-shadow: ${theme.shadows.lightShadow};
  position: relative;
  border-radius: 0.25rem;

  :not(:last-child) {
    margin-bottom: 1.5rem !important;
  }

  .action-items {
    position: absolute;
    right: -0.25rem;
    top: -1rem;
    display: flex;
    font-size: 1.125rem;

    .btn {
      color: ${theme.colors.lightText.rgb()};
      display: flex;
      padding: 0.375rem;
      border-radius: 5rem;
      background: ${theme.colors.white.rgb()};
      box-shadow: ${theme.shadows.lightShadow};

      &.btn__delete {
        margin-right: 0.5rem;
      }

      :hover,
      :focus {
        color: ${theme.colors.primary.rgb()};
      }
    }
  }

  .row {
    display: flex;
    padding: 0.25rem 0;
    color: ${theme.colors.lightText.rgb()};
  }

  .attr-2,
  .attr-4,
  .attr-6 {
    margin-left: auto;
  }

  .row-1 {
    color: ${theme.colors.text.rgb()};
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
    color: ${theme.colors.primary.rgb()};
    margin-right: 0.5rem;
  }

  .delete-item-btn {
    color: ${theme.colors.danger.rgb()};
  }
`;
