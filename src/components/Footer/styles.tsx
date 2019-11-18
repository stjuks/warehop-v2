import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ILabelContainerProps {
    isActive?: boolean;
}

export const FooterContainer = styled.div`
    ${({ theme }) => `
        color: ${theme.colors.text};
        background: ${theme.colors.lightGrey};
        border: 1px solid ${theme.colors.lightColor1};
    `}

    border-radius 2rem 2rem 0 0;
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

export const LabelContainer = styled.div<ILabelContainerProps>`
    ${({ isActive }) => `
        margin-top: 0.25rem;
        font-size: 0.75rem;
        ${isActive && 'font-weight: 700;'}
    `}
`;
