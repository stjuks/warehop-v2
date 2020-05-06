import React, { useContext } from 'react';

import { AddWarehouseButton } from './styles';
import { FETCH_WAREHOUSES, DELETE_WAREHOUSE } from '@ui/api/warehouse';
import { useGraphQLQuery, useGraphQLMutation } from '@ui/util/hooks';
import Header from '../Header';
import ContentContainer from '../util/ContentContainer';
import WarehouseItem from './WarehouseItem';
import { Warehouse } from '@shared/types';
import { FooterContainer } from '../Footer/styles';
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import UIStoreContext from '@ui/stores/UIStore';
import WarehouseForm from '../WarehouseForm';
import ConfirmationDialog from '../ConfirmationDialog';

interface WarehousesProps {}

const Warehouses: React.FC<WarehousesProps> = () => {
  const uiStore = useContext(UIStoreContext);

  const [warehouses, , { loading: isLoadingWarehouses }] = useGraphQLQuery(FETCH_WAREHOUSES, {
    loadOnMount: true,
  });

  const [deleteWarehouse] = useGraphQLMutation(DELETE_WAREHOUSE);

  const handleDelete = (warehouse: Warehouse) => {
    uiStore.openModal(
      <ConfirmationDialog
        type="danger"
        icon={<FiTrash2 />}
        title={`Kas oled kindel, et soovid ${warehouse.name} kustutada?`}
        description="Ladu saab kustutada vaid siis, kui selles ei sisaldu ühtegi kaupa."
        onConfirm={() => deleteWarehouse({ id: warehouse.id })}
      />
    );
  };

  return (
    <>
      <Header title="Laod" backTo />
      <ContentContainer isLoading={isLoadingWarehouses}>
        {warehouses &&
          warehouses.map((warehouse: Warehouse) => (
            <WarehouseItem key={warehouse.id} warehouse={warehouse} onDelete={handleDelete} />
          ))}
      </ContentContainer>
      <AddWarehouseButton onClick={() => uiStore.openModal(<WarehouseForm />)}>
        <FiPlusCircle />
        Lisa ladu
      </AddWarehouseButton>
    </>
  );
};

export default Warehouses;
