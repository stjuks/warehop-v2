import React, { useContext, useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';

import ContentContainer from '../util/ContentContainer';
import { SortingContainer, NewItemButtonContainer } from './styles';
import history from '../../util/history';
import LoadMoreButton from '../util/LoadMoreButton';
import routes from '../../util/routes';
import { ItemQueryInput } from '@shared/types';

import Header from '../Header';
import ProductItem from '../ProductItem';
import HeaderSearch from '../HeaderSearch';
import Loader from '../Loader';
import { Formik } from 'formik';
import { SelectStyled } from '../Purchases/styles';
import ItemStoreContext from '../../stores/ItemStore';

const Products = observer(() => {
  const itemStore = useContext(ItemStoreContext);
  const [searchQuery, setSearchQuery] = useState('');

  const warehouseOptions = [
    { label: 'Kõik laod', value: 'Kõik laod' },
    { label: 'pesumasinate varuosad', value: 'Ladu 1' },
    { label: 'Ladu 2', value: 'Ladu 2' }
  ];

  const filter: ItemQueryInput = {
    generalQuery: searchQuery
  };

  const headerIcons = [
    <HeaderSearch onChange={setSearchQuery} placeholder="Otsi kaupa" />,
    <NewItemButtonContainer onClick={() => history.push(routes.productForm)}>
      <FiPlusCircle />
    </NewItemButtonContainer>
  ];

  useEffect(() => {
    itemStore.fetchProducts(filter);
  }, [itemStore, searchQuery]);

  return (
    <>
      <Header title="Kaubad" components={headerIcons} />
      <SortingContainer>
        <Formik onSubmit={values => console.log(values)} initialValues={{}}>
          <SelectStyled name="warehouseOption" options={warehouseOptions} />
        </Formik>
      </SortingContainer>
      <ContentContainer>
        {itemStore.products.map(product => (
          <ProductItem {...product} key={product.id} />
        ))}
        {itemStore.paginatedProducts.pageInfo.hasNextPage && (
          <LoadMoreButton onClick={() => itemStore.fetchMoreProducts(filter)}>
            Lae veel
          </LoadMoreButton>
        )}
      </ContentContainer>
    </>
  );
});

export default Products;
