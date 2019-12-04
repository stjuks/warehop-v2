import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.div`
    ${({ theme }) => `
        color: ${theme.colors.text};
        background: ${theme.colors.lightGrey};
        border: 1px solid ${theme.colors.lightColor1};
    `}

    position: relative;
    border-radius 2rem 2rem 0 0;
    border-width: 1px 1px 0 1px;
    padding: 0 1rem;
    height: 3.5rem;
    display: flex
    align-items: center;
    justify-content: space-around;
`;

export const FooterItemContainer = styled.div`
    text-decoration: none;
    text-align: center;
    font-family: 'Red Hat Display', sans-serif;
    font-weight: 500;
    display: flex;
    align-items: center;

    .footer-item__active {
        font-weight: 700;
    }

    ${({ theme }) => `
        color: ${theme.colors.text};
    `}
`;

export const IconContainer = styled.div`
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LabelContainer = styled.div`
    margin-top: 0.25rem;
    font-size: 0.75rem;
    width: 3rem;
`;
