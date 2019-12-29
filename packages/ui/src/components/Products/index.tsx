import React, { useContext, useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';

import { ContentContainer } from '../App/styles';
import { SortingContainer, NewItemButtonContainer } from './styles';
import history from '../../common/history';
import routes from '../../common/routes';

import Header from '../Header';
import ProductItem from '../ProductItem';
import { ProductStoreContext } from '../../stores/ProductStore';
import HeaderSearch from '../HeaderSearch';
import Loader from '../Loader';
import { Formik } from 'formik';
import { SelectStyled } from '../Purchases/styles';

const Products = observer(() => {
    const productStore = useContext(ProductStoreContext);
    const [searchQuery, setSearchQuery] = useState('');

    const warehouseOptions = [
        { label: 'Kõik laod', value: 'Kõik laod' },
        { label: 'pesumasinate varuosad', value: 'Ladu 1' },
        { label: 'Ladu 2', value: 'Ladu 2' }
    ];

    const sortOptions = [
        { label: 'Kood', value: 'Kood' },
        { label: 'Müügihind', value: 'Müügihind' },
        { label: 'Kogus', value: 'Kogus' },
        { label: 'Nimetus', value: 'Nimetus' }
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
                <Formik onSubmit={values => console.log(values)} initialValues={{}}>
                    <SelectStyled name="warehouseOption" options={warehouseOptions} />
                </Formik>
            </SortingContainer>
            <ContentContainer>{getProducts()}</ContentContainer>
        </>
    );
});

export default Products;
