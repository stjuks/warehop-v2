import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { ContentContainer } from '../App/styles';
import { SortingContainer } from './styles';

import Header from '../Header';
import ProductItem from '../ProductItem';
import Footer from '../Footer';
import Select from '../Select';

interface IProductsProps {}

function Products() {
    const products = [
        {
            name: 'Külmkapp Electrolux',
            price: 430.99,
            quantity: 5,
            code: 'AB239939201',
            unit: { abbr: 'tk', name: 'Tükk' }
        },
        {
            name: 'Pliit Electrolux',
            price: 349.99,
            quantity: 1,
            code: 'EL2967218',
            unit: { abbr: 'tk', name: 'Tükk' }
        },
        {
            name: 'Kõrvaklapid Philips',
            price: 24.99,
            quantity: 8,
            code: 'PH4932049',
            unit: { abbr: 'tk', name: 'Tükk' }
        }
    ];

    const options = [
        {
            label: 'Vali ladu',
            options: [
                { label: 'Kõik laod', value: 'Kõik laod' },
                { label: 'Ladu 1', value: 'Ladu 1' },
                { label: 'Ladu 2', value: 'Ladu 2' }
            ]
        }
    ];

    return (
        <>
            <Header title="Kaubad" />
            <SortingContainer>
                <Select
                    className="menu-select"
                    options={options}
                    defaultValue={options[0].options[0]}
                />
                <Select
                    isSortable={true}
                    className="menu-select"
                    options={options}
                    defaultValue={options[0].options[0]}
                />
            </SortingContainer>
            <ContentContainer>
                <div>
                    {products.map(product => (
                        <ProductItem {...product} />
                    ))}
                </div>
            </ContentContainer>
            <Footer />
        </>
    );
}

export default Products;
