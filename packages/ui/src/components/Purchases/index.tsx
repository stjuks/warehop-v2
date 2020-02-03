import React, { useContext, useEffect, useState } from 'react';
import { FiPlusCircle, FiSliders, FiRefreshCw } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';
import { PaginatedData, Invoice } from '@shared/types';

import ContentContainer from '@ui/components/util/ContentContainer';
import { SortingContainer, NewItemButtonContainer } from '../Products/styles';
import history from '../../util/history';
import routes from '../../util/routes';
import InvoiceStoreContext from '../../stores/InvoiceStore';

import Header from '../Header';
import HeaderSearch from '../HeaderSearch';
import Radio from '../Radio';
import InvoiceItem from '../InvoiceItem';
import { LoadMoreButton } from './styles';

const Purchases = observer(() => {
    const [paidFilter, setPaidFilter] = useState<boolean | undefined>(undefined);
    const [searchResults, setSearchResults] = useState<PaginatedData<Invoice>>({
        data: [],
        pageInfo: {
            hasNextPage: false,
            cursor: undefined
        }
    });
    const [searchQuery, setSearchQuery] = useState('');

    const invoiceStore = useContext(InvoiceStoreContext);

    const headerIcons = [
        <HeaderSearch onChange={setSearchQuery} placeholder="Otsi arvet" />,
        <button style={{ display: 'flex' }}>
            <FiSliders />
        </button>,
        <NewItemButtonContainer onClick={() => history.push(routes.purchaseForm)}>
            <FiPlusCircle />
        </NewItemButtonContainer>
    ];

    useEffect(() => {
        const handleSearch = async () => {
            const searchedPurchases = await invoiceStore.fetchPurchases({
                generalQuery: searchQuery
            });
            setSearchResults(searchedPurchases);
        };

        handleSearch();
    }, [searchQuery]);

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
                {!searchQuery
                    ? invoiceStore.purchases.map(purchase => <InvoiceItem {...purchase} key={purchase.id} />)
                    : searchResults.data.map(purchase => <InvoiceItem {...purchase} key={purchase.id} />)}
                {invoiceStore.paginatedPurchases.pageInfo.hasNextPage && !searchQuery && (
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
