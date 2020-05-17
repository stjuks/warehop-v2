import styled from 'styled-components';
import TextBasedInput from '../TextBasedInput';

export const TextareaInputContainer = styled(TextBasedInput)`
  .input-container,
  textarea {
    height: auto;
    min-height: 2.5rem;
  }

  textarea {
    padding: 0.5rem;
  }
`;
