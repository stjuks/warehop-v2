import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { ContentContainer } from '../App/styles';
import { SortingContainer } from '../Products/styles';

import Header from '../Header';
import HeaderSearch from '../HeaderSearch';
import { PurchaseStoreContext } from '../../stores/PurchaseStore';
import PurchaseItem from './PurchaseItem';

const Sales = observer(() => {
    const purchaseStore = useContext(PurchaseStoreContext);

    const headerIcons = [<HeaderSearch onChange={value => null} placeholder="Otsi arvet" />];

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
        // purchaseStore.fetchPurchases();
    }, []);

    const paidOptions = [
        {
            label: 'Kõik',
            value: 'all'
        },
        {
            label: 'Makstud',
            value: 'paid'
        },
        {
            label: 'Maksmata',
            value: 'notPaid'
        }
    ];

    return (
        <>
            <Header title="Ostuarved" components={headerIcons} />
            <SortingContainer>
                
            </SortingContainer>
            <ContentContainer>
                {purchaseStore.purchases.map(purchase => (
                    <PurchaseItem {...purchase} key={purchase.id} />
                ))}
            </ContentContainer>
        </>
    );
});

export default Sales;
