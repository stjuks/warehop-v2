import styled from '../../util/styled';
import { ContentContainer } from '../App/styles';

export const ProductsContainer = styled(ContentContainer)``;

export const SortingContainer = styled.div`
    ${({ theme }) => `
        background: ${theme.colors.lightGrey};
        border-bottom: 1px solid ${theme.colors.lightColor1};
    `}
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0.75rem;
    flex-wrap: wrap;

    > * {
        flex: 1;
        padding: 0.25rem;
    }
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
