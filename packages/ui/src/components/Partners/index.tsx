import React, { useContext, useEffect, useState } from 'react';
import { FiPlusCircle, FiRefreshCw } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';
import { LoadMoreButton } from '../Purchases/styles';

import ContentContainer from '../util/ContentContainer';
import { SortingContainer, NewItemButtonContainer } from './styles';
import history from '@ui/util/history';
import routes from '@ui/util/routes';

import Radio from '../Radio';
import Header from '../Header';
import HeaderSearch from '../HeaderSearch';
import PartnerStoreContext from '@ui/stores/PartnerStore';
import PartnerListItem from '../PartnerListItem';
import { PartnerType, SearchPartnerInput } from '@shared/types';

const Partners = observer(() => {
    const partnerStore = useContext(PartnerStoreContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [partnerType, setPartnerType] = useState<PartnerType>('CLIENT');

    const headerIcons = [
        <HeaderSearch onChange={setSearchQuery} placeholder="Otsi partnerit" />,
        <NewItemButtonContainer onClick={() => history.push(routes.productForm)}>
            <FiPlusCircle />
        </NewItemButtonContainer>
    ];

    const filter: SearchPartnerInput = {
        generalQuery: searchQuery,
        type: partnerType
    }

    useEffect(() => {
        partnerStore.fetchPartners(filter);
    }, [partnerStore, searchQuery, partnerType]);

    const partnerTypeOptions: { label: string; value: PartnerType }[] = [
        { label: 'Kliendid', value: 'CLIENT' },
        { label: 'Tarnijad', value: 'VENDOR' }
    ];

    return (
        <>
            <Header title="Partnerid" components={headerIcons} />
            <SortingContainer>
                <Radio
                    options={partnerTypeOptions}
                    name="radio-partner-type"
                    onSelect={setPartnerType}
                    defaultValue={partnerTypeOptions[0].value}
                />
            </SortingContainer>
            <ContentContainer>
                {partnerStore.partners.map(partner => (
                    <PartnerListItem {...partner} key={partner.id} />
                ))}
                {partnerStore.paginatedPartners.pageInfo.hasNextPage && (
                    <LoadMoreButton onClick={() => partnerStore.fetchMorePartners(filter)}>
                        <FiRefreshCw />
                        Lae juurde
                    </LoadMoreButton>
                )}
            </ContentContainer>
        </>
    );
});

export default Partners;
