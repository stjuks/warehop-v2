import styled, { keyframes } from 'styled-components';
import theme from '@ui/styles/theme';

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

  background: ${theme.colors.lightGrey.rgb()};
  flex: 1;
  overflow: auto;

  :after {
    background: ${theme.colors.lightGrey.rgb()};
  }

  ${({ padded }) => (padded ? 'padding: 1rem;' : '')}
`;

export const LoadingOverlay = styled.div`
  background: ${theme.colors.lightGrey.opacity(0.75)};

  .loading-message {
    font-family: ${theme.fonts.primary};
    color: ${theme.colors.lightText.rgb()};
  }

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
