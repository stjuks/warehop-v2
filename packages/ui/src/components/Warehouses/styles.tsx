import styled from 'styled-components';
import theme from '@ui/styles/theme';

export const WarehouseItemContainer = styled.div`
  padding: 0 1.5rem;
  color: ${theme.colors.text.rgb()};
  font-weight: 500;
  height: 3.5rem;
  outline: none;

  display: flex;
  align-items: center;

  :not(:last-child) {
    border-bottom: 1px solid ${theme.colors.midGrey.rgb()};
  }

  :hover,
  :focus,
  :focus-within {
    background: ${theme.colors.lightColor1.rgb()};

    .actions {
      opacity: 1;
    }
  }

  .actions {
    margin-left: auto;
    opacity: 0.25;
    display: flex;

    button {
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
      margin-left: 0.5rem;
      color: ${theme.colors.lightText.rgb()};
      font-size: 1.125rem;
      display: flex;
      justify-content: center;
      align-items: center;

      :hover,
      :focus {
        background: ${theme.colors.lightGrey.rgb()};
      }
    }
  }
`;

export const AddWarehouseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 3.5rem;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s;
  color: ${theme.colors.primary.rgb()};
  border-top: 1px solid ${theme.colors.midGrey.rgb()};
  background: ${theme.colors.lightGrey.rgb()};
  z-index: 999;
  box-shadow: ${theme.shadows.lightShadow};

  :hover,
  :focus {
    background: ${theme.colors.lightColor1.rgb()};
  }

  .react-icon {
    margin-right: 0.5rem;
  }
`;
