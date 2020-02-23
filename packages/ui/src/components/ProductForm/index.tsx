import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import * as yup from 'yup';
import { FiTrash2, FiPlusCircle } from 'react-icons/fi';

import routes from '../../util/routes';
import WarehouseStoreContext from '../../stores/WarehouseStore';
import ItemStoreContext from '../../stores/ItemStore';
import { ProductFormContainer, AddWarehouseButton, TrashButtonContainer } from './styles';

import Header from '../Header';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import { Warehouse, WarehouseQuantity, ProductItem } from '@shared/types';
import Form from '../Form';
import { FormTitle } from '../Form/styles';
import TextInput from '../Form/TextInput';
import UnitSelect from '../util/inputs/UnitSelect';
import PartnerSelect from '../util/inputs/PartnerSelect';
import AriaSelect from '../Form/AriaSelect';
import { Row } from '../Layout/styles';
import FieldArray from '../Form/util/FieldArray';
import FormError from '../Form/FormError';
import UIStoreContext from '@ui/stores/UIStore';

const ProductForm = observer(() => {
  const itemStore = useContext(ItemStoreContext);
  const uiStore = useContext(UIStoreContext);

  const initialValues: ProductItem = {
    type: 'PRODUCT',
    code: '',
    name: '',
    partner: undefined,
    unit: {
      id: 1,
      name: 'Tükk',
      abbreviation: 'tk'
    },
    purchasePrice: '',
    retailPrice: '',
    description: '',
    warehouseQuantity: []
  };

  const validationSchema = yup.object({
    code: yup.string().required('Palun sisesta kauba kood.'),
    name: yup.string().required('Palun sisesta kauba nimetus.'),
    purchasePrice: yup.number(),
    retailPrice: yup.number(),
    description: yup.string(),
    warehouseQuantity: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required('Palun sisesta lao nimi.'),
          quantity: yup
            .number()
            .typeError('Kogus peab olema number.')
            .required('Palun sisesta kauba kogus.')
        })
      )
      .required('Palun sisesta kauba kogus.')
  });

  const handleSubmit = async (item: ProductItem) => {
    try {
      await itemStore.addProduct(item);
      uiStore.goBack(routes.products);
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Header title="Uus kaup" backTo={routes.products} />
      <ProductFormContainer>
        <Form
          id="new-product-form"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          persist
        >
          {formikProps => (
            <>
              <FormError
                fields={[
                  'warehouseQuantity',
                  'warehouseQuantity[0].quantity',
                  'warehouseQuantity[0].name'
                ]}
                messages={{
                  EntityAlreadyExistsError: {
                    code: 'Sellise koodiga kaup juba eksisteerib.'
                  }
                }}
              />
              <FormFields />
              <FormTitle>Laoseis</FormTitle>
              <FieldArray name="warehouseQuantity">
                {arrayHelpers => (
                  <WarehouseFields arrayHelpers={arrayHelpers} formikProps={formikProps} />
                )}
              </FieldArray>
            </>
          )}
        </Form>
      </ProductFormContainer>
      <FooterContainer style={{ padding: '0.5rem 1rem' }}>
        <Button title="Lisa kaup" form="new-product-form" />
      </FooterContainer>
    </>
  );
});

const FormFields: React.FC = observer(() => {
  return (
    <>
      <FormTitle>Põhiandmed</FormTitle>
      <TextInput name="code" label="Kood" />
      <TextInput name="name" label="Nimetus" />
      <UnitSelect name="unit" label="Ühik" />
      <FormTitle>Lisainfo</FormTitle>
      <PartnerSelect name="partner" label="Tarnija" partnerType="VENDOR" />
      <Row flex={[1, 1]}>
        <TextInput name="purchasePrice" label="Ostuhind" indicator={'€'} />
        <TextInput name="retailPrice" label="Müügihind" indicator={'€'} />
      </Row>
      <TextInput name="description" label="Märkused" isTextarea />
    </>
  );
});

const filterChosenWarehouseOptions = (formValues: WarehouseQuantity[], warehouses: Warehouse[]) => {
  return warehouses.filter(
    wh => formValues.map(whVal => Number(whVal.id)).indexOf(Number(wh.id)) === -1
  );
};

const findFirstNonChosenWarehouse = (formValues: WarehouseQuantity[], warehouses: Warehouse[]) => {
  return warehouses.find(
    wh => formValues.map(whVal => Number(whVal.id)).indexOf(Number(wh.id)) === -1
  );
};

const WarehouseFields: React.FC<any> = observer(({ formikProps, arrayHelpers }) => {
  const warehouseStore = useContext(WarehouseStoreContext);
  const { warehouseQuantity } = formikProps.values;
  const { warehouses } = warehouseStore;

  return (
    <>
      {warehouseQuantity.map((wh, i) => (
        <Row key={i} flex={[1, 0, 0]}>
          <AriaSelect
            name={`warehouseQuantity[${i}]`}
            label={i === 0 ? 'Ladu' : undefined}
            options={filterChosenWarehouseOptions(warehouseQuantity, warehouses)}
            optionMap={{ label: warehouse => warehouse.name }}
          />
          <TextInput
            name={`warehouseQuantity[${i}].quantity`}
            label={i === 0 ? 'Kogus' : undefined}
            type="number"
          />
          <TrashButtonContainer>
            <button type="button" onClick={() => arrayHelpers.remove(i)}>
              <FiTrash2 />
            </button>
          </TrashButtonContainer>
        </Row>
      ))}
      {warehouseQuantity.length < warehouses.length && (
        <AddWarehouseButton
          type="button"
          onClick={() =>
            arrayHelpers.push(findFirstNonChosenWarehouse(warehouseQuantity, warehouses))
          }
        >
          <FiPlusCircle />
          &nbsp;Lisa ladu
        </AddWarehouseButton>
      )}
    </>
  );
});

export default ProductForm;
