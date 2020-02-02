import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import UIStoreContext from '@ui/stores/UIStore';

import { ContentContainerStyled, LoadingOverlay } from './styles';
import Loader from '@ui/components/Loader';

export interface ContentContainerProps {}

const ContentContainer: React.FC<ContentContainerProps> = observer(({ children }) => {
    const uiStore = useContext(UIStoreContext);

    return (
        <ContentContainerStyled>
            {children}
            {uiStore.isLoading && (
                <LoadingOverlay>
                    <Loader />
                </LoadingOverlay>
            )}
        </ContentContainerStyled>
    );
});

export default ContentContainer;
