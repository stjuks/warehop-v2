import React, { useContext, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';
import { InvoiceSearchInput } from '@shared/types';
import { FETCH_SALES, FETCH_INVOICE_COUNTS } from '@ui/api/invoice';

import { useGraphQLQuery } from '@ui/util/hooks';
import ContentContainer from '@ui/components/util/ContentContainer';
import { SortingContainer, NewItemButtonContainer } from '../Products/styles';
import routes from '../../util/routes';

import Header from '../Header';
import HeaderSearch from '../HeaderSearch';
import Radio from '../Radio';
import InvoiceItem from '../InvoiceItem';
import LoadMoreButton from '../util/LoadMoreButton';
import UIStoreContext from '@ui/stores/UIStore';
import { useLocalStorage } from 'react-use';
import { RadioLabel } from '../Purchases/styles';

const Sales = observer(() => {
  const [filter, setFilter] = useLocalStorage<InvoiceSearchInput | undefined>(
    'salesFilter',
    undefined
  );

  const [searchQuery, setSearchQuery] = useState('');

  const uiStore = useContext(UIStoreContext);

  const [sales, { fetchMore: fetchMoreSales}] = useGraphQLQuery(FETCH_SALES, {
    variables: { ...filter, pagination: { limit: 25 }, generalQuery: searchQuery },
    loadOnMount: true,
  });

  const [saleCounts] = useGraphQLQuery(FETCH_INVOICE_COUNTS, {
    variables: { type: 'SALE' },
    loadOnMount: true,
  });

  const headerIcons = [
    <HeaderSearch onChange={setSearchQuery} placeholder="Otsi arvet" />,
    <NewItemButtonContainer onClick={() => uiStore.goTo(routes.saleForm.new)}>
      <FiPlusCircle />
    </NewItemButtonContainer>,
  ];

  const paidOptions = [
    {
      label: <RadioLabel count={saleCounts?.unpaid}>Maksmata</RadioLabel>,
      value: { isPaid: false, isLocked: true },
    },
    {
      label: <RadioLabel count={saleCounts?.paid}>Makstud</RadioLabel>,
      value: { isPaid: true, isLocked: true },
    },
    {
      label: <RadioLabel count={saleCounts?.unlocked}>Kinnitamata</RadioLabel>,
      value: { isLocked: false },
    },
  ];

  return (
    <>
      <Header title="Müügiarved" components={headerIcons} />
      <SortingContainer>
        <Radio
          options={paidOptions}
          name="radio-paid"
          onSelect={setFilter}
          defaultValue={filter || paidOptions[0].value}
        />
      </SortingContainer>
      <ContentContainer>
        {sales?.data.map((sale) => (
          <InvoiceItem {...sale} key={sale.id} />
        ))}
        {sales?.pageInfo.hasNextPage && <LoadMoreButton onClick={() => fetchMoreSales()} />}
      </ContentContainer>
    </>
  );
});

export default Sales;
