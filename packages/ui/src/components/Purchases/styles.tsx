import styled from 'styled-components';

interface RadioLabelProps {
  count?: number;
}

export const RadioLabel = styled.span<RadioLabelProps>`
  ${({ theme, count }) => `
    position: relative;

    :before {
      content: '${count || 0}';
      position: absolute;
      z-index: 9999;
      background: ${theme.colors.white};
      border: 1px solid ${theme.colors.midGrey};
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateX(-50%);
      left: 50%;
      top: -1.375rem;
      font-size: 0.75rem;
    }
  `}
`;
