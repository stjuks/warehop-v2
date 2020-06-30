import styled from 'styled-components';
import theme from '@ui/styles/theme';
import { ContentContainer } from '../App/styles';

export const ProductsContainer = styled(ContentContainer as any)``;

export const SortingContainer = styled.div`
  background: ${theme.colors.lightGrey.rgb()};
  border-bottom: 1px solid ${theme.colors.lightColor1.rgb()};

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

  > {
    flex: 1;
    padding: 0.25rem;
  }
`;

export const NewItemButtonContainer = styled.button`
  display: flex;
  color: ${theme.colors.primary.rgb()};
  text-shadow: ${theme.shadows.blueShadow};
  cursor: pointer;

  && svg {
    stroke-width: 2;
    font-size: 2rem;
  }
`;
