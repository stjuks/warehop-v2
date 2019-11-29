import React, { useContext, useEffect, useState } from 'react';
import { FiSearch, FiPlusCircle } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';

import { ContentContainer } from '../App/styles';
import { SortingContainer, NewProductButtonContainer } from './styles';
import history from '../../common/history';
import routes from '../../common/routes';

import Header from '../Header';
import ProductItem from '../ProductItem';
import Footer from '../Footer';
import { MenuSelect } from '../Select';
import { ProductStoreContext } from '../../stores/ProductStore';
import HeaderSearch from '../HeaderSearch';
import Loader from '../Loader';

const Products = observer(() => {
    const productStore = useContext(ProductStoreContext);
    const [searchQuery, setSearchQuery] = useState('');

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
        <HeaderSearch onChange={value => setSearchQuery(value)} placeholder="Otsi kaupa" />,
        <NewProductButtonContainer onClick={() => history.push(routes.newProduct)}>
            <FiPlusCircle />
        </NewProductButtonContainer>
    ];

    useEffect(() => {
        productStore.fetchProducts({ warehouseId: 1, sortBy: 'code', sortDirection: 'asc' });
    }, [productStore]);

    return (
        <>
            <Header title="Kaubad" components={headerIcons} />
            <SortingContainer>
                <MenuSelect options={warehouseOptions} defaultValue={warehouseOptions[0].options[0]} />
                <MenuSelect
                    isSearchable={false}
                    isSortable={true}
                    options={sortOptions}
                    defaultValue={sortOptions[0].options[0]}
                />
            </SortingContainer>
            <ContentContainer>
                {!productStore.isLoadingProducts ? (
                    productStore.products.map((product, i) => <ProductItem {...product} key={i} />)
                ) : (
                    <Loader />
                )}
            </ContentContainer>
            <Footer />
        </>
    );
});

export default Products;
