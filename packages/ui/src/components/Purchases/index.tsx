import React, { useContext, useEffect, useState } from 'react';
import { FiPlusCircle, FiSliders, FiRefreshCw } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';

import ContentContainer from '@ui/components/util/ContentContainer';
import { SortingContainer, NewItemButtonContainer } from '../Products/styles';
import history from '../../util/history';
import routes from '../../util/routes';
import InvoiceStoreContext from '../../stores/InvoiceStore';

import Header from '../Header';
import HeaderSearch from '../HeaderSearch';
import Radio from '../Radio';
import PurchaseItem from './PurchaseItem';
import { LoadMoreButton } from './styles';

const Purchases = observer(() => {
    const [paidFilter, setPaidFilter] = useState<boolean | undefined>(undefined);

    const invoiceStore = useContext(InvoiceStoreContext);

    const headerIcons = [
        <HeaderSearch onChange={value => null} placeholder="Otsi arvet" />,
        <button style={{ display: 'flex' }}>
            <FiSliders />
        </button>,
        <NewItemButtonContainer onClick={() => history.push(routes.newPurchase)}>
            <FiPlusCircle />
        </NewItemButtonContainer>
    ];

    useEffect(() => {
        invoiceStore.fetchPurchases({ isPaid: paidFilter });
    }, [paidFilter]);

    const paidOptions = [
        { label: 'Kõik', value: undefined },
        { label: 'Makstud', value: true },
        { label: 'Maksmata', value: false }
    ];

    return (
        <>
            <Header title="Ostuarved" components={headerIcons} />
            <SortingContainer>
                <Radio
                    options={paidOptions}
                    name="radio-paid"
                    onSelect={value => setPaidFilter(value)}
                    defaultValue={paidOptions[0].value}
                />
            </SortingContainer>
            <ContentContainer>
                {invoiceStore.purchases.map(purchase => (
                    <PurchaseItem {...purchase} key={purchase.id} />
                ))}
                {invoiceStore.paginatedPurchases.pageInfo.hasNextPage && (
                    <LoadMoreButton onClick={() => invoiceStore.fetchMorePurchases({ isPaid: paidFilter })}>
                        <FiRefreshCw />
                        Lae juurde
                    </LoadMoreButton>
                )}
            </ContentContainer>
        </>
    );
});

export default Purchases;
