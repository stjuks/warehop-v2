import React, { useContext, useEffect, useState } from 'react';
import { FiPlusCircle, FiRefreshCw } from 'react-icons/fi';
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
import { LoadMoreButton } from './styles';
import UIStoreContext from '@ui/stores/UIStore';

const Purchases = observer(() => {
  const [paidFilter, setPaidFilter] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  const invoiceStore = useContext(InvoiceStoreContext);
  const uiStore = useContext(UIStoreContext);

  const headerIcons = [
    <HeaderSearch onChange={setSearchQuery} placeholder="Otsi arvet" />,
    <NewItemButtonContainer onClick={() => uiStore.setRoute(routes.purchaseForm)}>
      <FiPlusCircle />
    </NewItemButtonContainer>
  ];

  const filter: InvoiceSearchInput = {
    isPaid: paidFilter,
    generalQuery: searchQuery
  };

  useEffect(() => {
    invoiceStore.fetchSales(filter);
  }, [paidFilter, searchQuery]);

  const paidOptions = [
    { label: 'Kõik', value: undefined },
    { label: 'Makstud', value: true },
    { label: 'Maksmata', value: false }
  ];

  return (
    <>
      <Header title="Müügiarved" components={headerIcons} />
      <SortingContainer>
        <Radio
          options={paidOptions}
          name="radio-paid"
          onSelect={value => setPaidFilter(value)}
          defaultValue={paidOptions[0].value}
        />
      </SortingContainer>
      <ContentContainer>
        {invoiceStore.sales.map(purchase => (
          <InvoiceItem {...purchase} key={purchase.id} />
        ))}
        {invoiceStore.paginatedSales.pageInfo.hasNextPage && (
          <LoadMoreButton onClick={() => invoiceStore.fetchMoreSales(filter)}>
            <FiRefreshCw />
            Lae juurde
          </LoadMoreButton>
        )}
      </ContentContainer>
    </>
  );
});

export default Purchases;
