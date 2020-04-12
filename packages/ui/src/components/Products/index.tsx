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
import { FETCH_PRODUCTS } from '@ui/api/item';

const Products = observer(() => {
  const warehouseStore = useContext(WarehouseStoreContext);
  const uiStore = useContext(UIStoreContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState<Warehouse>({
    id: undefined,
    name: 'Kõik laod',
  });

  const filter: ItemQueryInput = {
    generalQuery: searchQuery,
    warehouseId: warehouseFilter.id,
  };

  const [, products, { fetchMore }] = useGraphQLQuery(FETCH_PRODUCTS, {
    variables: {
      ...filter,
      pagination: { limit: 5 },
    },
    loadOnMount: true,
    isPaginated: true,
  });

  const headerIcons = [
    <HeaderSearch onChange={setSearchQuery} placeholder="Otsi kaupa" />,
    <NewItemButtonContainer onClick={() => uiStore.goTo(routes.productForm)}>
      <FiPlusCircle />
    </NewItemButtonContainer>,
  ];

  const warehouseOptions = [{ id: undefined, name: 'Kõik laod' }, ...warehouseStore.warehouses];

  return (
    <>
      <Header title="Kaubad" components={headerIcons} />
      <SortingContainer>
        <MenuSelect
          name="warehouseId"
          options={warehouseOptions}
          value={warehouseFilter}
          onChange={({ value }) => setWarehouseFilter(value)}
          optionMap={{ label: (wh) => wh.name, value: (wh) => wh }}
          action={{
            label: (
              <>
                <FiPlusCircle style={{ marginRight: '0.25rem' }} /> Lisa ladu
              </>
            ),
            onClick: () => uiStore.openModal(<WarehouseForm />),
          }}
          noFormik
        />
      </SortingContainer>
      <ContentContainer>
        {products?.data.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
        {products?.pageInfo.hasNextPage && (
          <LoadMoreButton onClick={() => fetchMore()}>
            Lae veel
          </LoadMoreButton>
        )}
      </ContentContainer>
    </>
  );
});

export default Products;
