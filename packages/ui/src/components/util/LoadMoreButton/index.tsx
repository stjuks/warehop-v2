import React from 'react';
import styled from '@ui/util/styled';
import { FiRefreshCw } from 'react-icons/fi';

const StyledButton = styled.button`
  padding: 1rem;
  width: 100%;
  outline: none;
  font-family: 'Roboto';
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;

  .react-icon {
    margin-right: 0.5rem;
    stroke-width: 3;
  }

  ${({ theme }) => `
    background: ${theme.colors.lightColor1};
    color: ${theme.colors.lightText};
    border: solid ${theme.colors.midGrey};
    border-width: 1px 0 0 0;

    :hover,
    :focus {
        color: ${theme.colors.primary};
    }
  `}
`;

interface LoadMoreButtonProps {
  onClick: () => any;
  title?: string;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick, title }) => {
  return (
    <StyledButton onClick={onClick}>
      <FiRefreshCw />
      {title || 'Lae veel'}
    </StyledButton>
  );
};

export default LoadMoreButton;
