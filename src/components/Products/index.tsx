import React, { useContext, useEffect } from 'react';
import { FiChevronRight, FiSearch, FiPlusCircle } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';

import { ContentContainer } from '../App/styles';
import { SortingContainer } from './styles';
import history from '../../common/history';
import routes from '../../common/routes';

import Header from '../Header';
import ProductItem from '../ProductItem';
import Footer from '../Footer';
import { MenuSelect } from '../Select';
import { ProductStoreContext } from '../../stores/ProductStore';

const Products = observer(() => {
    const productStore = useContext(ProductStoreContext);

    const warehouseOptions = [
        {
            label: 'Vali ladu',
            options: [
                { label: 'Kõik laod', value: 'Kõik laod' },
                { label: 'pesumasinate varuosad', value: 'Ladu 1' },
                { label: 'Ladu 2', value: 'Ladu 2' }
            ]
        }
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

    const headerIcons = [
        { icon: <FiSearch />, onClick: () => null },
        {
            icon: <FiPlusCircle />,
            onClick: () => history.push(routes.newProduct),
            size: '2rem',
            highlighted: true
        }
    ];

    useEffect(() => {
        productStore.fetchProducts(1, 'quantity', 1);
    }, []);

    return (
        <>
            <Header title="Kaubad" icons={headerIcons} />
            <SortingContainer>
                <MenuSelect
                    options={warehouseOptions}
                    defaultValue={warehouseOptions[0].options[0]}
                />
                <MenuSelect
                    isSearchable={false}
                    isSortable={true}
                    options={sortOptions}
                    defaultValue={sortOptions[0].options[0]}
                />
            </SortingContainer>
            <ContentContainer>
                {!productStore.isLoadingProducts
                    ? productStore.products.map((product, i) => (
                          <ProductItem {...product} key={i} />
                      ))
                    : null}
            </ContentContainer>
            <Footer />
        </>
    );
});

export default Products;
