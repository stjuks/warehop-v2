import styled from '@ui/util/styled';
import { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

export const MainListItemContainer = styled(Link)`
    animation: ${fadeIn} 0.3s;
    ${({ theme }) => `
        padding: 1rem;
        display: flex;
        align-items: center;
        position: relative;

        :hover,
        :focus {
            outline: none;
            background: ${theme.colors.lightGrey};
            box-shadow: ${theme.lightShadow};
            
            :after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 4px;
                background: ${theme.colors.primary};
            }
        }

        .col-2 {
            width: 2rem;
            color: ${theme.colors.lightText};
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }

        :not(:first-child) {
            border-top: 1px solid ${theme.colors.lightColor1};
        }
    `}
`;
