import React, { useContext, useEffect, useState } from 'react';
import { FiSearch, FiPlusCircle } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';

import { ContentContainer } from '../App/styles';
import { SortingContainer, NewItemButtonContainer } from './styles';
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

    const handleSearch = query => {
        setSearchQuery(query);
        productStore.searchProducts(query);
    };

    const headerIcons = [
        <HeaderSearch onChange={handleSearch} placeholder="Otsi kaupa" />,
        <NewItemButtonContainer onClick={() => history.push(routes.newProduct)}>
            <FiPlusCircle />
        </NewItemButtonContainer>
    ];

    useEffect(() => {
        productStore.fetchProducts({ warehouseId: 1, sortBy: 'code', sortDirection: 'asc' });
    }, [productStore]);

    const getProducts = () => {
        if (productStore.isLoadingProducts) {
            return <Loader />;
        }

        if (searchQuery) {
            return productStore.productsSearch.map(product => <ProductItem {...product} key={product.id} />);
        }

        return productStore.products.map(product => <ProductItem {...product} key={product.id} />);
    };

    return (
        <>
            <Header title="Kaubad" components={headerIcons} />
            <SortingContainer>
                <MenuSelect
                    isSearchable={false}
                    isSortable={true}
                    options={sortOptions}
                    defaultValue={sortOptions[0].options[0]}
                />
                <MenuSelect options={warehouseOptions} defaultValue={warehouseOptions[0].options[0]} />
            </SortingContainer>
            <ContentContainer>{getProducts()}</ContentContainer>
        </>
    );
});

export default Products;
