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

const Purchases = observer(() => {
  const [filter, setFilter] = useState<InvoiceSearchInput | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  const invoiceStore = useContext(InvoiceStoreContext);
  const uiStore = useContext(UIStoreContext);

  const headerIcons = [
    <HeaderSearch onChange={setSearchQuery} placeholder="Otsi arvet" />,
    <NewItemButtonContainer onClick={() => uiStore.goTo(routes.saleForm)}>
      <FiPlusCircle />
    </NewItemButtonContainer>
  ];

  useEffect(() => {
    if (filter) invoiceStore.fetchSales({ ...filter, generalQuery: searchQuery });
  }, [filter, searchQuery]);

  const paidOptions = [
    { label: 'Maksmata', value: { isPaid: false } },
    { label: 'Makstud', value: { isPaid: true } },
    { label: 'Kinnitamata', value: { isPaid: undefined, isLocked: false } }
  ];

  return (
    <>
      <Header title="Müügiarved" components={headerIcons} />
      <SortingContainer>
        <Radio
          options={paidOptions}
          name="radio-paid"
          onSelect={value => setFilter({ ...filter, isLocked: true, ...value })}
          defaultValue={paidOptions[0].value}
        />
      </SortingContainer>
      <ContentContainer>
        {invoiceStore.sales.map(sale => (
          <InvoiceItem {...sale} key={sale.id} />
        ))}
        {invoiceStore.paginatedSales.pageInfo.hasNextPage && (
          <LoadMoreButton onClick={() => invoiceStore.fetchMoreSales(filter)} />
        )}
      </ContentContainer>
    </>
  );
});

export default Purchases;
