import React, { useContext, useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';
import { InvoiceSearchInput } from '@shared/types';

import ContentContainer from '@ui/components/util/ContentContainer';
import { SortingContainer, NewItemButtonContainer } from '../Products/styles';
import routes from '../../util/routes';
import InvoiceStoreContext from '../../stores/InvoiceStore';

import Header from '../Header';
import HeaderSearch from '../HeaderSearch';
import Radio from '../Radio';
import InvoiceItem from '../InvoiceItem';
import LoadMoreButton from '../util/LoadMoreButton';
import UIStoreContext from '@ui/stores/UIStore';
import { useLocalStorage } from 'react-use';
import { FETCH_PURCHASES } from '@ui/api/invoice';
import { useGraphQLQuery } from '@ui/util/hooks';

const paidOptions = [
  { label: 'Maksmata', value: { isPaid: false, isLocked: true } },
  { label: 'Makstud', value: { isPaid: true, isLocked: true } },
  { label: 'Kinnitamata', value: { isPaid: undefined, isLocked: false } },
];

const Purchases = observer(() => {
  const [filter, setFilter] = useLocalStorage<InvoiceSearchInput | undefined>(
    'purchasesFilter',
    undefined
  );

  const [searchQuery, setSearchQuery] = useState('');

  const uiStore = useContext(UIStoreContext);

  const [purchases, [fetchMorePurchases]] = useGraphQLQuery(FETCH_PURCHASES, {
    variables: { ...filter, pagination: { limit: 5 }, generalQuery: searchQuery },
    loadOnMount: true,
  });

  const headerIcons = [
    <HeaderSearch onChange={setSearchQuery} placeholder="Otsi arvet" />,
    <NewItemButtonContainer onClick={() => uiStore.goTo(routes.purchaseForm)}>
      <FiPlusCircle />
    </NewItemButtonContainer>,
  ];

  return (
    <>
      <Header title="Ostuarved" components={headerIcons} />
      <SortingContainer>
        <Radio
          options={paidOptions}
          name="radio-paid"
          onSelect={(value) => setFilter({ ...filter, isLocked: true, ...value })}
          defaultValue={filter || paidOptions[0].value}
        />
      </SortingContainer>
      <ContentContainer>
        {purchases?.data.map((purchase) => (
          <InvoiceItem {...purchase} key={purchase.id} />
        ))}
        {purchases?.pageInfo.hasNextPage && <LoadMoreButton onClick={() => fetchMorePurchases()} />}
      </ContentContainer>
    </>
  );
});

export default Purchases;
