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
import WarehouseStoreContext from '@ui/stores/WarehouseStore';
import UIStoreContext from '@ui/stores/UIStore';
import WarehouseForm from '../WarehouseForm';
import Warehouses from '../Warehouses';
import { FETCH_PRODUCTS } from '@ui/api/item';
import { FETCH_WAREHOUSES } from '@ui/api/warehouse';
import { FaWarehouse } from 'react-icons/fa';

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

  const [products, [fetchMoreProducts], { loading: isLoadingProducts }] = useGraphQLQuery(
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
          name="warehouseId"
          options={warehouseOptions}
          value={warehouseFilter}
          searchPlaceholder="Otsi ladu"
          onChange={({ value }) => setWarehouseFilter(value)}
          optionMap={{ label: (wh) => wh.name }}
          onSearch={(query, options) =>
            options.filter(
              (option) => option.value.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
            )
          }
          action={{
            label: 'Halda ladusid',
            onClick: () => uiStore.openModal(<Warehouses />),
          }}
          noFormik
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
