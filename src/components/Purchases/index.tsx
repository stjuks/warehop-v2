import React, { useContext, useEffect, useState } from 'react';
import { FiSearch, FiPlusCircle } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';

import { ContentContainer } from '../App/styles';
import { SortingContainer } from '../Products/styles';
import history from '../../common/history';
import routes from '../../common/routes';

import Header from '../Header';
import ProductItem from '../ProductItem';
import Footer from '../Footer';
import { MenuSelect } from '../Select';
import { ProductStoreContext } from '../../stores/ProductStore';
import HeaderSearch from '../HeaderSearch';
import Loader from '../Loader';
import Radio from '../Radio';
import { PurchaseStoreContext } from '../../stores/PurchaseStore';
import PurchaseItem from './PurchaseItem';

const Purchases = observer(() => {
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
        purchaseStore.fetchPurchases();
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
                <MenuSelect
                    isSearchable={false}
                    isSortable={true}
                    options={sortOptions}
                    defaultValue={sortOptions[0].options[0]}
                />
                <Radio
                    options={paidOptions}
                    name="radio-paid"
                    onSelect={value => console.log(value)}
                    defaultValue={paidOptions[0].value}
                />
            </SortingContainer>
            <ContentContainer>
                {purchaseStore.purchases.map(purchase => (
                    <PurchaseItem {...purchase} key={purchase.id} />
                ))}
            </ContentContainer>
        </>
    );
});

export default Purchases;
