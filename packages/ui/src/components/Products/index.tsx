import React, { useContext, useState } from 'react';
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
import { useGraphQLQuery } from '@ui/util/hooks';
import MenuSelect from '../util/inputs/MenuSelect';
import UIStoreContext from '@ui/stores/UIStore';
import Warehouses from '../Warehouses';
import { FETCH_PRODUCTS } from '@ui/api/item';
import { FETCH_WAREHOUSES } from '@ui/api/warehouse';

const Products = observer(() => {
  const uiStore = useContext(UIStoreContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState<Warehouse>({
    id: undefined,
    name: 'Kõik laod',
  });

  const [warehouses] = useGraphQLQuery(FETCH_WAREHOUSES, { loadOnMount: true });

  const filter: ItemQueryInput = {
    generalQuery: searchQuery,
    warehouseId: warehouseFilter.id,
    pagination: { limit: 25 },
  };

  const [products, { fetchMore: fetchMoreProducts, loading: isLoadingProducts }] = useGraphQLQuery(
    FETCH_PRODUCTS,
    {
      variables: filter,
      loadOnMount: true,
    }
  );

  const headerIcons = [
    <HeaderSearch onChange={setSearchQuery} placeholder="Otsi kaupa" />,
    <NewItemButtonContainer onClick={() => uiStore.goTo(routes.productForm)}>
      <FiPlusCircle />
    </NewItemButtonContainer>,
  ];

  const warehouseOptions = [{ id: undefined, name: 'Kõik laod' }];

  if (warehouses) warehouseOptions.push(...warehouses);

  return (
    <>
      <Header title="Kaubad" components={headerIcons} />
      <SortingContainer>
        <MenuSelect
          options={warehouseOptions}
          optionLabel={(option) => option.name}
          value={warehouseFilter}
          searchProps={{
            onSearch: (query) =>
              warehouseOptions.filter(
                (option) => option.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
              ),
            placeholder: 'Otsi ladu',
            debounce: 0,
          }}
          onChange={(value) => setWarehouseFilter(value)}
          menuAction={{
            label: 'Halda ladusid',
            onClick: () => uiStore.openModal(<Warehouses />),
          }}
        />
      </SortingContainer>
      <ContentContainer isLoading={isLoadingProducts} key={JSON.stringify(filter)}>
        {products?.data.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
        {products?.pageInfo.hasNextPage && (
          <LoadMoreButton onClick={() => fetchMoreProducts()}>Lae veel</LoadMoreButton>
        )}
      </ContentContainer>
    </>
  );
});

export default Products;
