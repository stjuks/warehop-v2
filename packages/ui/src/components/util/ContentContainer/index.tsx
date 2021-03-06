import React, { useContext, useRef } from 'react';
import { observer, useObserver } from 'mobx-react-lite';
import UIStoreContext from '@ui/stores/UIStore';

import { ContentContainerStyled, LoadingOverlay, ContentContainerWrapper } from './styles';
import Loader from '@ui/components/Loader';

export interface ContentContainerProps {
  padded?: boolean;
  isLoading?: boolean;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children, padded, isLoading }) => (
  <ContentContainerWrapper>
    {isLoading ? (
      <LoadingOverlay>
        <Loader />
      </LoadingOverlay>
    ) : (
      <ContentContainerStyled padded={padded} id="content-container">
        {children}
      </ContentContainerStyled>
    )}
  </ContentContainerWrapper>
);

export default ContentContainer;
