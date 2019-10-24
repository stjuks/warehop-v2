import styled from 'styled-components';
import { ContentContainer } from '../App/styles';

export const ProductsContainer = styled(ContentContainer)`
`;

export const SortingContainer = styled.div`
    ${({ theme }) => `
        background: ${theme.colors.lightGrey};
        border-bottom: 1px solid ${theme.colors.lightColor1};
    `}
    display: flex;
    padding: 0.75rem 1rem;

    > div {
        flex: 1;

        :not(:first-child) {
            margin-left: 0.2rem;
        }

        :not(:last-child) {
            margin-right: 0.25rem;
        }
    }
`;
