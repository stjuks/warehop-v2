import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import UIStoreContext from '@ui/stores/UIStore';

import { ContentContainerStyled, LoadingOverlay } from './styles';
import Loader from '@ui/components/Loader';

export interface ContentContainerProps {
    padded?: boolean;
}

const ContentContainer: React.FC<ContentContainerProps> = observer(({ children, padded }) => {
    const uiStore = useContext(UIStoreContext);

    return (
        <ContentContainerStyled padded={padded}>
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
