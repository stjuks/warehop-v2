import React from 'react';
import styled from 'styled-components';
import theme from '@ui/styles/theme';
import { FiRefreshCw } from 'react-icons/fi';

const StyledButton = styled.button`
  padding: 1rem;
  width: 100%;
  outline: none;
  font-family: ${theme.fonts.primary};
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;

  .react-icon {
    margin-right: 0.5rem;
    stroke-width: 3;
  }

  background: ${theme.colors.lightColor1.rgb()};
  color: ${theme.colors.lightText.rgb()};
  border: solid ${theme.colors.midGrey.rgb()};
  border-width: 1px 0 0 0;

  :hover,
  :focus {
    color: ${theme.colors.primary.rgb()};
  }
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
