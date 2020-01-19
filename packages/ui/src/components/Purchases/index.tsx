import React, { useContext, useEffect, useState } from 'react';
import { FiPlusCircle, FiSliders } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';

import { ContentContainer } from '../App/styles';
import { SortingContainer, NewItemButtonContainer } from '../Products/styles';
import history from '../../util/history';
import routes from '../../util/routes';

import Header from '../Header';
import HeaderSearch from '../HeaderSearch';
import Radio from '../Radio';
import PurchaseItem from './PurchaseItem';
import { Formik } from 'formik';
import { SelectStyled } from './styles';

const Purchases = observer(() => {
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
        // purchaseStore.fetchPurchases();
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
                    <SelectStyled
                        name="sortOptions"
                        options={sortOptions[0].options}
                        optionMap={{ label: 'label' }}
                        placeholder="Sorteeri"
                    />
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
                {/* purchaseStore.purchases.map(purchase => (
                    <PurchaseItem {...purchase} key={purchase.id} />
                )) */}
            </ContentContainer>
        </>
    );
});

export default Purchases;
