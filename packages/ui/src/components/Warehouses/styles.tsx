import styled from 'styled-components';

export const WarehouseItemContainer = styled.div`
  ${({ theme }) => `
    padding: 0 1rem;
    color: ${theme.colors.text};
    font-weight: 500;
    height: 3.5rem;
    outline: none;

    display: flex;
    align-items: center;

    :not(:last-child) {
      border-bottom: 1px solid ${theme.colors.midGrey};
    }

    :hover,
    :focus,
    :focus-within {
      background: ${theme.colors.lightColor1};

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
        color: ${theme.colors.lightText};
        font-size: 1.25rem;
        display: flex;
        justify-content: center;
        align-items: center;

        :hover,
        :focus {
          background: ${theme.colors.lightGrey};
        }
      } 
    } 
  `}
`;

export const AddWarehouseButton = styled.button`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    height: 3.5rem;
    font-weight: 500;
    color: ${theme.colors.primary};
    border-top: 1px solid ${theme.colors.midGrey};
    background: ${theme.colors.lightGrey};

    :hover,
    :focus {
      background: ${theme.colors.lightColor1};
    }

    .react-icon {
      margin-right: 0.5rem;
    }
  `}
`
