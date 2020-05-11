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
import { ADD_WAREHOUSE, EDIT_WAREHOUSE } from '@ui/api/warehouse';

interface WarehouseFormProps {
  onSubmit?: (Warehouse: AddWarehouseInput) => any;
  warehouse?: Warehouse;
}

const WarehouseForm: React.FC<WarehouseFormProps & RouteChildrenProps> = ({
  onSubmit,
  warehouse,
}) => {
  const uiStore = useContext(UIStoreContext);

  const [addWarehouse] = useGraphQLMutation(ADD_WAREHOUSE);
  const [editWarehouse] = useGraphQLMutation(EDIT_WAREHOUSE);

  const isEditing = warehouse !== undefined;

  const initialValues = {
    name: '',
  };

  const handleSubmit = async ({ name }: AddWarehouseInput) => {
    try {
      if (warehouse) await editWarehouse({ name, id: warehouse.id });
      else await addWarehouse({ name });
      if (onSubmit) onSubmit({ name });
      uiStore.goBack();
    } catch (err) {
      throw err;
    }
  };

  const validationSchema = yup.object({
    name: yup.string().typeError('Palun sisesta lao nimetus.').required('Palun sisesta lao nimetus.'),
  });

  return (
    <>
      <Header title={isEditing ? 'Muuda ladu' : 'Uus ladu'} backTo />
      <ContentContainer>
        <Form
          id="warehouse-form"
          validationSchema={validationSchema}
          initialValues={warehouse || initialValues}
          onSubmit={handleSubmit}
        >
          <FormError />
          <TextInput name="name" label="Nimetus" />
        </Form>
      </ContentContainer>
      <FooterContainer style={{ padding: '0.25rem 1rem' }}>
        <Button
          title={isEditing ? 'Muuda ladu' : 'Lisa ladu'}
          form="warehouse-form"
          type="submit"
        />
      </FooterContainer>
    </>
  );
};

export default withRouter(WarehouseForm);
