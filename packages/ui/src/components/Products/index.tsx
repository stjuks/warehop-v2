import React, { useContext, useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';

import ContentContainer from '../util/ContentContainer';
import { SortingContainer, NewItemButtonContainer } from './styles';
import LoadMoreButton from '../util/LoadMoreButton';
import routes from '../../util/routes';
import { ItemQueryInput, Warehouse } from '@shared/types';

import Header from '../Header';
import ProductItem from '../ProductItem';
import HeaderSearch from '../HeaderSearch';
import Loader from '../Loader';
import { Formik } from 'formik';
import { SelectStyled } from '../Purchases/styles';
import ItemStoreContext from '../../stores/ItemStore';
import WarehouseStoreContext from '@ui/stores/WarehouseStore';
import Form from '../Form';
import UIStoreContext from '@ui/stores/UIStore';
import WarehouseForm from '../WarehouseForm';

const Products = observer(() => {
  const itemStore = useContext(ItemStoreContext);
  const warehouseStore = useContext(WarehouseStoreContext);
  const uiStore = useContext(UIStoreContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState<Warehouse>({
    id: undefined,
    name: 'Kõik laod'
  });

  const filter: ItemQueryInput = {
    generalQuery: searchQuery,
    warehouseId: warehouseFilter.id
  };

  const headerIcons = [
    <HeaderSearch onChange={setSearchQuery} placeholder="Otsi kaupa" />,
    <NewItemButtonContainer onClick={() => uiStore.goTo(routes.productForm)}>
      <FiPlusCircle />
    </NewItemButtonContainer>
  ];

  useEffect(() => {
    itemStore.fetchProducts(filter);
    console.log('ay');
  }, [itemStore, searchQuery, warehouseFilter]);

  const warehouseOptions = [{ id: undefined, name: 'Kõik laod' }, ...warehouseStore.warehouses];

  return (
    <>
      <Header title="Kaubad" components={headerIcons} />
      <SortingContainer>
        <SelectStyled
          name="warehouseId"
          options={warehouseOptions}
          value={warehouseFilter}
          onChange={({ value }) => setWarehouseFilter(value)}
          optionMap={{ label: wh => wh.name, value: wh => wh }}
          action={{
            label: (
              <>
                <FiPlusCircle style={{ marginRight: '0.25rem' }} /> Lisa ladu
              </>
            ),
            onClick: () => uiStore.openModal(<WarehouseForm />)
          }}
          noFormik
        />
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
