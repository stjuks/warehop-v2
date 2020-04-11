import React, { useContext, useRef } from 'react';
import { observer, useObserver } from 'mobx-react-lite';
import UIStoreContext from '@ui/stores/UIStore';

import { ContentContainerStyled, LoadingOverlay } from './styles';
import Loader from '@ui/components/Loader';

export interface ContentContainerProps {
  padded?: boolean;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children, padded }) => {
  const uiStore = useContext(UIStoreContext);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (containerRef && containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  const handleChildren = children => {
    if (children instanceof Function) {
      return children(scrollToTop);
    }
    return children;
  };

  return useObserver(() => (
    <ContentContainerStyled padded={padded} ref={containerRef} id="content-container">
      {handleChildren(children)}
      {uiStore.isLoading && (
        <LoadingOverlay>
          <Loader />
        </LoadingOverlay>
      )}
    </ContentContainerStyled>
  ));
};

export default ContentContainer;
