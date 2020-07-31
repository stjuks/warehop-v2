import styled from 'styled-components';
import mixins from '@ui/styles/mixins';

export const ToastsContainer = styled.div`
  ${mixins.engulfFixed}

  display: flex;
  flex-direction: column;
  align-items: center;

  pointer-events: none;
  box-sizing: border-box;
  padding: 1rem;
  z-index: 9999;
`