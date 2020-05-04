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
import { FETCH_PURCHASES, FETCH_INVOICE_COUNTS } from '@ui/api/invoice';
import { useGraphQLQuery } from '@ui/util/hooks';
import { RadioLabel } from './styles';

const Purchases = observer(() => {
  const [filter, setFilter] = useLocalStorage<InvoiceSearchInput | undefined>(
    'purchasesFilter',
    undefined
  );

  const [searchQuery, setSearchQuery] = useState('');

  const uiStore = useContext(UIStoreContext);

  const [purchases, [fetchMorePurchases], { loading: isLoadingPurchases }] = useGraphQLQuery(
    FETCH_PURCHASES,
    {
      variables: { ...filter, pagination: { limit: 25 }, generalQuery: searchQuery },
      loadOnMount: true,
    }
  );
  const [purchaseCounts] = useGraphQLQuery(FETCH_INVOICE_COUNTS, {
    variables: { type: 'PURCHASE' },
    loadOnMount: true,
  });

  const headerIcons = [
    <HeaderSearch onChange={setSearchQuery} placeholder="Otsi arvet" />,
    <NewItemButtonContainer onClick={() => uiStore.goTo(routes.purchaseForm)}>
      <FiPlusCircle />
    </NewItemButtonContainer>,
  ];

  const paidOptions = [
    {
      label: <RadioLabel count={purchaseCounts?.unpaid}>Maksmata</RadioLabel>,
      value: { isPaid: false, isLocked: true },
    },
    {
      label: <RadioLabel count={purchaseCounts?.paid}>Makstud</RadioLabel>,
      value: { isPaid: true, isLocked: true },
    },
    {
      label: <RadioLabel count={purchaseCounts?.unlocked}>Kinnitamata</RadioLabel>,
      value: { isPaid: undefined, isLocked: false },
    },
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
      <ContentContainer isLoading={isLoadingPurchases} key={JSON.stringify(filter)}>
        {purchases?.data.map((purchase) => (
          <InvoiceItem {...purchase} key={purchase.id} />
        ))}
        {purchases?.pageInfo.hasNextPage && <LoadMoreButton onClick={() => fetchMorePurchases()} />}
      </ContentContainer>
    </>
  );
});

export default Purchases;
