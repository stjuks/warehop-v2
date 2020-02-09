import React, { useContext } from 'react';
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
import AriaSelect from '../Form/AriaSelect';
import { Row } from '../Layout/styles';
import FieldArray from '../Form/util/FieldArray';

const ProductForm = observer(() => {
  const warehouseStore = useContext(WarehouseStoreContext);
  const itemStore = useContext(ItemStoreContext);

  const units = [];
  const partners = [];

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
    description: yup.string()
  });

  const filterChosenWarehouseOptions = (
    formValues: WarehouseQuantity[],
    warehouses: Warehouse[]
  ) => {
    return warehouses.filter(wh => formValues.map(whVal => whVal.id).indexOf(Number(wh.id)) === -1);
  };

  const findFirstNonChosenWarehouse = (
    formValues: WarehouseQuantity[],
    warehouses: Warehouse[]
  ) => {
    return warehouses.find(wh => formValues.map(whVal => whVal.id).indexOf(Number(wh.id)) === -1);
  };

  return (
    <>
      <Header title="Uus kaup" backTo={routes.products} />
      <ProductFormContainer>
        <Form
          id="new-product-form"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: ProductItem) => itemStore.addProduct(values)}
        >
          {formikProps => (
            <>
              <FormTitle>Põhiandmed</FormTitle>
              <TextInput name="code" label="Kood" />
              <TextInput name="name" label="Nimetus" />
              <AriaSelect
                name="unit"
                label="Ühik"
                optionMap={{ label: unit => unit.name }}
                options={units}
              />
              <FormTitle>Lisainfo</FormTitle>
              <AriaSelect
                name="partner"
                label="Tarnija"
                optionMap={{ label: partner => partner.name }}
                options={partners}
              />
              <Row flex={[1, 1]}>
                <TextInput name="purchasePrice" label="Ostuhind" indicator={'€'} />
                <TextInput name="retailPrice" label="Müügihind" indicator={'€'} />
              </Row>
              <TextInput name="description" label="Märkused" isTextarea />
              <FormTitle>Laoseis</FormTitle>
              <FieldArray name="warehouseQuantity">
                {arrayHelpers => (
                  <>
                    {formikProps.values.warehouseQuantity.map((wh, i) => (
                      <Row key={i} flex={[1, 0, 0]}>
                        <AriaSelect
                          name={`warehouseQuantity[${i}]`}
                          label={i === 0 ? 'Ladu' : undefined}
                          options={filterChosenWarehouseOptions(
                            formikProps.values.warehouseQuantity,
                            warehouseStore.warehouses
                          )}
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
                    {formikProps.values.warehouseQuantity.length <
                      warehouseStore.warehouses.length && (
                      <AddWarehouseButton
                        type="button"
                        onClick={() =>
                          arrayHelpers.push(
                            findFirstNonChosenWarehouse(
                              formikProps.values.warehouseQuantity,
                              warehouseStore.warehouses
                            )
                          )
                        }
                      >
                        <FiPlusCircle />
                        &nbsp;Lisa ladu
                      </AddWarehouseButton>
                    )}
                  </>
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

export default ProductForm;
