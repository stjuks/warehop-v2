import styled from 'styled-components';
import theme from '@ui/styles/theme';

interface RadioLabelProps {
  count?: number;
}

export const RadioLabel = styled.span<RadioLabelProps>`
  position: relative;

  :before {
    content: '${({ count }) => count || 0}';
    position: absolute;
    z-index: 9999;
    background: ${theme.colors.white.rgb()};
    border: 1px solid ${theme.colors.midGrey.rgb()};
    min-width: 1.5rem;
    box-sizing: border-box;
    padding: 0 0.25rem;
    height: 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    left: 50%;
    top: -1.375rem;
    font-size: 0.75rem;
  }
`;
