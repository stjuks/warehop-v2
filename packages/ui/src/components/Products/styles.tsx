import styled from '@ui/util/styled';
import { ContentContainer } from '../App/styles';

export const ProductsContainer = styled(ContentContainer)``;

export const SortingContainer = styled.div`
  ${({ theme }) => `
    background: ${theme.colors.lightGrey};
    border-bottom: 1px solid ${theme.colors.lightColor1};

    display: flex;
    flex-direction: column;
    padding: 0.5rem 0.75rem;
    flex-wrap: wrap;
    
    > * {
      padding: 0.25rem;
    }

    .row {
      display: flex;
      align-items: center;

      .select-wrapper {
        flex: 1;
      }
    }

    .action-btn {
      width: 2rem;
      height: 2rem;
      margin-left: 0.5rem;
      color: ${theme.colors.text};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;

      :hover,
      :focus {
        background: ${theme.colors.midGrey};
      }
    }

    > {
      flex: 1;
      padding: 0.25rem;
    }
  `}
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
