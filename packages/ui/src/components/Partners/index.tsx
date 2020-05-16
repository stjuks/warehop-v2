import React, { useContext, useState } from 'react';
import { FiPlusCircle, FiRefreshCw } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';
import LoadMoreButton from '../util/LoadMoreButton';

import ContentContainer from '../util/ContentContainer';
import { SortingContainer, NewItemButtonContainer } from './styles';
import routes from '@ui/util/routes';

import Radio from '../Radio';
import Header from '../Header';
import HeaderSearch from '../HeaderSearch';
import PartnerListItem from '../PartnerListItem';
import { PartnerType, SearchPartnerInput } from '@shared/types';
import UIStoreContext from '@ui/stores/UIStore';
import { useGraphQLQuery } from '@ui/util/hooks';
import { FETCH_PARTNERS } from '@ui/api/partner';
import { useLocalStorage } from 'react-use';

const Partners = observer(() => {
  const uiStore = useContext(UIStoreContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [partnerType, setPartnerType] = useLocalStorage<PartnerType>('partnerType', 'CLIENT');

  const filter: SearchPartnerInput = {
    generalQuery: searchQuery,
    type: partnerType,
    pagination: { limit: 5 },
  };

  const [partners, { fetchMore: fetchMorePartners, loading: isLoadingPartners }] = useGraphQLQuery(
    FETCH_PARTNERS,
    {
      loadOnMount: true,
      variables: filter,
    }
  );

  const headerIcons = [
    <HeaderSearch onChange={setSearchQuery} placeholder="Otsi partnerit" />,
    <NewItemButtonContainer onClick={() => uiStore.goTo(routes.partnerForm)}>
      <FiPlusCircle />
    </NewItemButtonContainer>,
  ];

  const partnerTypeOptions: { label: string; value: PartnerType }[] = [
    { label: 'Kliendid', value: 'CLIENT' },
    { label: 'Tarnijad', value: 'VENDOR' },
  ];

  return (
    <>
      <Header title="Partnerid" components={headerIcons} />
      <SortingContainer>
        <Radio
          options={partnerTypeOptions}
          name="radio-partner-type"
          onSelect={setPartnerType}
          defaultValue={partnerType}
        />
      </SortingContainer>
      <ContentContainer isLoading={isLoadingPartners}>
        {partners?.data.map((partner) => (
          <PartnerListItem {...partner} key={partner.id} />
        ))}
        {partners?.pageInfo.hasNextPage && (
          <LoadMoreButton onClick={() => fetchMorePartners()}>
            <FiRefreshCw />
            Lae juurde
          </LoadMoreButton>
        )}
      </ContentContainer>
    </>
  );
});

export default Partners;
