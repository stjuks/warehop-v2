import styled from 'styled-components';
import { ContentContainer } from '../App/styles';

export const NewProductContainer = styled(ContentContainer)`
`;

export const FormRowContainer = styled.div`
    display: flex;

    > * {
        flex: 1;
        min-width: 0;

        :not(:last-child) {
            padding-right: 0.5rem;
        }

        :not(:first-child) {
            padding-left: 0.5rem;
        }
    }
`;
