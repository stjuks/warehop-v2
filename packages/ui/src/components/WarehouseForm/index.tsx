import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Form from '../Form';
import * as yup from 'yup';

import TextInput from '../Form/TextInput';
import { AddWarehouseInput, Warehouse } from '@shared/types';
import Header from '../Header';
import ContentContainer from '../util/ContentContainer';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import { RouteChildrenProps } from 'react-router';
import WarehouseStoreContext from '@ui/stores/WarehouseStore';
import UIStoreContext from '@ui/stores/UIStore';
import FormError from '../Form/FormError';
import { useGraphQLMutation } from '@ui/util/hooks';
import { ADD_WAREHOUSE } from '@ui/api/warehouse';

interface WarehouseFormProps {
  onSubmit?: (Warehouse: AddWarehouseInput) => any;
}

const WarehouseForm: React.FC<WarehouseFormProps & RouteChildrenProps> = ({ onSubmit }) => {
  const warehouseStore = useContext(WarehouseStoreContext);
  const uiStore = useContext(UIStoreContext);

  const [addWarehouse] = useGraphQLMutation(ADD_WAREHOUSE);

  const initialValues = {
    name: '',
  };

  const handleSubmit = async (warehouse: AddWarehouseInput) => {
    try {
      await addWarehouse(warehouse);
      if (onSubmit) onSubmit(warehouse);
      uiStore.closeModal();
    } catch (err) {
      throw err;
    }
  };

  const validationSchema = yup.object({
    name: yup.string().required('Palun sisesta lao nimetus.'),
  });

  return (
    <>
      <Header title="Uus ladu" backTo />
      <ContentContainer>
        <Form
          id="warehouse-form"
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <FormError />
          <TextInput name="name" label="Nimetus" />
        </Form>
      </ContentContainer>
      <FooterContainer style={{ padding: '0.25rem 1rem' }}>
        <Button title="Lisa ladu" form="warehouse-form" type="submit" />
      </FooterContainer>
    </>
  );
};

export default withRouter(WarehouseForm);
