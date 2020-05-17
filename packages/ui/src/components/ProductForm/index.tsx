import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { animateScroll } from 'react-scroll';
import * as yup from 'yup';
import { FiTrash2, FiPlusCircle } from 'react-icons/fi';

import routes from '../../util/routes';
import WarehouseStoreContext from '../../stores/WarehouseStore';
import ItemStoreContext from '../../stores/ItemStore';
import {
  ProductFormContainer,
  AddWarehouseButton,
  TrashButtonContainer,
  WarehouseFieldsContainer
} from './styles';

import Header from '../Header';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import { Warehouse, WarehouseQuantity, ProductItem } from '@shared/types';
import Form, { TextInput, SelectInput } from '../FormNew';
import { FormTitle } from '../Form/styles';
// import TextInput from '../Form/TextInput';
import UnitSelect from '../util/inputs/UnitSelect';
import PartnerSelect from '../util/inputs/PartnerSelect';
// import AriaSelect from '../Form/AriaSelect';
import { Row } from '../Layout/styles';
import FieldArray from '../Form/util/FieldArray';
import FormError from '../Form/FormError';
import UIStoreContext from '@ui/stores/UIStore';
import { useGraphQLQuery, useGraphQLMutation } from '@ui/util/hooks';
import { FETCH_WAREHOUSES } from '@ui/api/warehouse';
import { ADD_ITEM, EDIT_ITEM } from '@ui/api/item';
import WarehouseSelect from '../util/inputs/WarehouseSelect';
import { useFormikContext } from 'formik';

interface ProductFormProps {
  location: {
    state?: ProductItem;
  };
}

const ProductForm: React.FC<ProductFormProps> = observer(props => {
  const uiStore = useContext(UIStoreContext);
  const [addItem] = useGraphQLMutation(ADD_ITEM);
  const [editItem] = useGraphQLMutation(EDIT_ITEM);

  const isEditing = props.location.state !== undefined;

  const initialValues: ProductItem = props.location.state || {
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
    code: yup
      .string()
      .nullable()
      .required('Palun sisesta kauba kood.'),
    name: yup
      .string()
      .nullable()
      .required('Palun sisesta kauba nimetus.'),
    purchasePrice: yup.string().nullable(),
    retailPrice: yup.string().nullable(),
    description: yup.string().nullable(),
    warehouseQuantity: yup.array().of(
      yup.object({
        name: yup.string().required('Palun sisesta lao nimi.'),
        quantity: yup
          .number()
          .typeError('Kogus peab olema number.')
          .required('Palun sisesta kogus.')
      })
    )
  });

  const handleSubmit = async (item: ProductItem) => {
    const { partner, unit, id, ...itemInput }: any = item;
    itemInput.partnerId = partner?.id;
    itemInput.unitId = unit?.id;

    try {
      if (isEditing) await editItem({ id, item: itemInput });
      else await addItem(itemInput);
      uiStore.goBack(routes.products);
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Header title={isEditing ? 'Muuda kaupa' : 'Uus kaup'} backTo={routes.products} />
      <ProductFormContainer>
        <Form
          id="new-product-form"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          persist={!isEditing}
          /* onError={() =>
            animateScroll.scrollToTop({ containerId: 'content-container', duration: 200 })
          } */
        >
          <FormError />
          <FormFields />
          <FormTitle>Laoseis</FormTitle>
          <FieldArray name="warehouseQuantity">
            {arrayHelpers => <WarehouseFields arrayHelpers={arrayHelpers} />}
          </FieldArray>
        </Form>
      </ProductFormContainer>
      <FooterContainer style={{ padding: '0.5rem 1rem' }}>
        <Button title={isEditing ? 'Muuda kaupa' : 'Lisa kaup'} form="new-product-form" />
      </FooterContainer>
    </>
  );
});

const FormFields: React.FC = () => {
  return (
    <>
      <FormTitle>Põhiandmed</FormTitle>
      <TextInput name="code" label="Kood" />
      <TextInput name="name" label="Nimetus" />
      <UnitSelect name="unit" label="Ühik" />
      <FormTitle>Lisainfo</FormTitle>
      <PartnerSelect name="partner" label="Tarnija" partnerType="VENDOR" />
      <Row flex={[1, 1]}>
        <TextInput name="purchasePrice" label="Ostuhind" type="decimal" indicator={'€'} />
        <TextInput name="retailPrice" label="Müügihind" type="decimal" indicator={'€'} />
      </Row>
      {/* <TextInput name="description" label="Märkused" isTextarea /> */}
    </>
  );
};

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

const WarehouseFields: React.FC<any> = observer(({ arrayHelpers }) => {
  const formik = useFormikContext<any>();
  const { warehouseQuantity } = formik.values;
  const [warehouses] = useGraphQLQuery(FETCH_WAREHOUSES, { loadOnMount: true });

  return warehouses ? (
    <WarehouseFieldsContainer>
      {warehouseQuantity.map((wh, i) => (
        <div className="warehouse-row" key={wh.id}>
          <WarehouseSelect
            name={`warehouseQuantity[${i}]`}
            label={i === 0 ? 'Ladu' : undefined}
            options={filterChosenWarehouseOptions(warehouseQuantity, warehouses)}
            className="warehouse-select"
          />
          <TextInput
            name={`warehouseQuantity[${i}].quantity`}
            label={i === 0 ? 'Kogus' : undefined}
            type="decimal"
            className="warehouse-quantity-input"
          />
          <TrashButtonContainer>
            <button type="button" onClick={() => arrayHelpers.remove(i)}>
              <FiTrash2 />
            </button>
          </TrashButtonContainer>
        </div>
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
    </WarehouseFieldsContainer>
  ) : null;
});

export default ProductForm;
