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
import { Formik } from 'formik';
import { LoadMoreButton } from './styles';

const Purchases = observer(() => {
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

    const sortOptions = [
        {
            label: 'Sorteeri',
            options: [
                { label: 'Kood', value: 'Kood' },
                { label: 'Müügihind', value: 'Müügihind' },
                { label: 'Kogus', value: 'Kogus' },
                { label: 'Nimetus', value: 'Nimetus' }
            ]
        }
    ];

    useEffect(() => {
        invoiceStore.fetchPurchases();
    }, []);

    const paidOptions = [
        { label: 'Kõik', value: 'all' },
        { label: 'Makstud', value: 'paid' },
        { label: 'Maksmata', value: 'notPaid' }
    ];

    const initialFilterValues = {
        sortOptions: undefined
    };

    return (
        <>
            <Header title="Ostuarved" components={headerIcons} />
            <SortingContainer>
                <Formik initialValues={initialFilterValues} onSubmit={values => console.log(values)}>
                    {/* <SelectStyled
                        name="sortOptions"
                        options={sortOptions[0].options}
                        optionMap={{ label: 'label' }}
                        placeholder="Sorteeri"
                    /> */}
                </Formik>

                {/* <MenuSelect
                    isSearchable={false}
                    isSortable={true}
                    options={sortOptions}
                    defaultValue={sortOptions[0].options[0]}
                /> */}
                <Radio
                    options={paidOptions}
                    name="radio-paid"
                    onSelect={value => console.log(value)}
                    defaultValue={paidOptions[0].value}
                />
            </SortingContainer>
            <ContentContainer>
                {invoiceStore.purchases.map(purchase => (
                    <PurchaseItem {...purchase} key={purchase.id} />
                ))}
                {invoiceStore.paginatedPurchases.pageInfo.hasNextPage && (
                    <LoadMoreButton onClick={() => invoiceStore.fetchMorePurchases()}><FiRefreshCw />Lae juurde</LoadMoreButton>
                )}
            </ContentContainer>
        </>
    );
});

export default Purchases;
