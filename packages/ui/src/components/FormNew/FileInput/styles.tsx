import styled from 'styled-components';

export const FileInputContainer = styled.div`
  width: 100%;
  position: relative;

  input[type='file'] {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .input-field {
    white-space: nowrap;
    overflow: hidden;
    height: 100%;
  }
`;
