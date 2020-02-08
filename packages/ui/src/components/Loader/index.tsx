import React, { ChangeEvent } from 'react';
import { FiX } from 'react-icons/fi';

import { LoaderContainer } from './styles';

interface ILoaderProps {
  loadingText?: string;
}

function Loader({ loadingText }: ILoaderProps) {
  return (
    <LoaderContainer>
      <div className='lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {loadingText && <div className='loader-text'>{loadingText}</div>}
    </LoaderContainer>
  );
}

export default Loader;
