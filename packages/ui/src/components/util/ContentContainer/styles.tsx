import styled from '@ui/util/styled';
import { keyframes } from 'styled-components';

interface ContentContainerStyledProps {
  padded?: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

export const ContentContainerWrapper = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  min-height: 0;
`;

export const ContentContainerStyled = styled.div<ContentContainerStyledProps>`
  position: relative;

  :after {
    animation: 0.3s ${fadeIn} ease-in-out;
    content: '';
    position: absolute;
    pointer-events: none;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    opacity: 0;
  }

  ${({ theme, padded }) => `
    background: ${theme.colors.lightGrey};
    flex: 1;
    overflow: auto;
    
    :after {
      background: ${theme.colors.lightGrey};
    }
    
    ${padded ? 'padding: 1rem;' : ''}
  `}
`;

export const LoadingOverlay = styled.div`
  ${({ theme }) => `
    background: ${theme.colors.lightGrey.opacity(0.75)};

    .loading-message {
        font-family: 'Roboto', sans-serif;
        color: ${theme.colors.lightText};
    }
  `}
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
