import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import currency from 'currency.js';
import { observer } from 'mobx-react-lite';
import Modal from '../Modal';
import routes from '../../util/routes';
import history from '../../util/history';
import Form from '../Form';
import * as yup from 'yup';

import TextInput from '../Form/TextInput';
import DateInput from '../Form/DateInput';
import { Invoice, AddWarehouseInput, Warehouse } from '@shared/types';
import Header from '../Header';
import { ContentContainer } from '../App/styles';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import { RouteChildrenProps } from 'react-router';
import WarehouseStoreContext from '@ui/stores/WarehouseStore';
import UIStoreContext from '@ui/stores/UIStore';
import FormError from '../Form/FormError';

interface WarehouseFormProps {
  warehouse: Warehouse;
  onSubmit?: (Warehouse: AddWarehouseInput) => any;
}

const WarehouseForm: React.FC<WarehouseFormProps & RouteChildrenProps> = ({
  warehouse,
  onSubmit
}) => {
  const warehouseStore = useContext(WarehouseStoreContext);
  const uiStore = useContext(UIStoreContext);

  const initialValues = {
    name: ''
  };

  const handleSubmit = async (warehouse: AddWarehouseInput) => {
    try {
      await warehouseStore.addWarehouse(warehouse);
      if (onSubmit) onSubmit(warehouse);
      uiStore.closeModal();
    } catch (err) {
      throw err;
    }
  };

  const validationSchema = yup.object({
    name: yup.string().required('Palun sisesta lao nimetus.')
  });

  return (
    <>
      <Header title="Uus ladu" onBack={() => uiStore.closeModal()} />
      <ContentContainer>
        <Form
          id="warehouse-form"
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <FormError messages={{
            EntityAlreadyExistsError: {
              name: 'Sellise nimega ladu on juba olemas.'
            }
          }}/>
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
