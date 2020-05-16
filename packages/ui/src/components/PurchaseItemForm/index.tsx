import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Form, { AutosuggestInput, TextInput, SelectInput } from '../FormNew';
import * as yup from 'yup';
import { animateScroll } from 'react-scroll';

// import AriaSelect from '../Form/AriaSelect';
// import TextInput from '../Form/TextInput';
import { Row } from '../Layout/styles';
// import AutosuggestInput from '../Form/AutosuggestInput';
import { ItemType, InvoiceItem, ProductItem } from '@shared/types';
import Header from '../Header';
import { ContentContainer } from '../App/styles';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import { filterObjectProperties } from '../../util/helpers';
import { itemTypeTranslations } from '../../util/translations';
import CommonStoreContext from '../../stores/CommonStore';
import UIStoreContext from '@ui/stores/UIStore';
import UnitSelect from '../util/inputs/UnitSelect';
import WarehouseSelect from '../util/inputs/WarehouseSelect';
import { useGraphQLQuery } from '@ui/util/hooks';
import { FETCH_PRODUCTS } from '@ui/api/item';

interface PurchaseItemFormProps {
  arrayHelpers: any;
  item?: InvoiceItem;
  index?: number;
}

const DEFAULT_ITEM_TYPE: ItemType = 'PRODUCT';

const serviceAndExpenseForm = {
  initialValues: {
    name: '',
    quantity: '',
    unit: undefined,
    purchasePrice: ''
  },
  fields: ['type', 'name', 'quantity', 'unit', 'price'],
  validationSchema: yup.object({
    name: yup.string().required('Palun sisesta artikli nimetus.'),
    quantity: yup.number('Kogus peab olema number.').required('Palun sisesta artikli kogus.'),
    price: yup.number('Hind peab olema number.').required('Palun sisesta kauba ostuhind.')
  })
};

const forms = {
  PRODUCT: {
    initialValues: {
      name: '',
      code: '',
      quantity: '',
      unit: undefined,
      warehouse: undefined,
      purchasePrice: '',
      retailPrice: ''
    },
    fields: ['type', 'name', 'code', 'quantity', 'unit', 'warehouse', 'price'],
    validationSchema: yup.object({
      name: yup.string().required('Palun sisesta kauba nimetus.'),
      code: yup.string().required('Palun sisesta kauba kood.'),
      quantity: yup
        .number()
        .typeError('Kogus peab olema number.')
        .required('Palun sisesta kauba kogus.'),
      unit: yup.object().required('Palun vali kauba ühik.'),
      warehouse: yup.object().required('Palun vali kauba sihtladu.'),
      price: yup
        .number()
        .typeError('Hind peab olema number.')
        .required('Palun sisesta kauba ostuhind.')
    })
  },
  SERVICE: serviceAndExpenseForm,
  EXPENSE: serviceAndExpenseForm
};

const ItemForm = ({ type }: { type: ItemType }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedProducts, [, fetchProducts]] = useGraphQLQuery(FETCH_PRODUCTS);

  // autofill fields on select
  const handleAutosuggestSelect = (value, { setValues, values }) => {
    const _values: any = {};

    forms[type].fields.forEach(field => {
      if (value[field]) _values[field] = value[field];
    });

    const { warehouseQuantity, purchasePrice } = value;

    if (warehouseQuantity && warehouseQuantity.length > 0) {
      _values.warehouse = warehouseQuantity[0];
      _values.quantity = warehouseQuantity[0].quantity;
    }

    _values.price = purchasePrice;

    setValues({ values, ..._values });
  };

  const handleProductSuggestion = (key: string, query?: string) => {
    fetchProducts({ [key]: query, pagination: { limit: 15 } });
  };

  if (type === 'PRODUCT') {
    return (
      <>
        <AutosuggestInput
          name="code"
          label="Kood"
          suggestions={searchedProducts?.data || []}
          onChange={query => handleProductSuggestion('code', query)}
          suggestionLabel={suggestion => suggestion.name}
          onSelect={handleAutosuggestSelect}
        />
        <AutosuggestInput
          name="name"
          label="Nimetus"
          suggestions={searchedProducts?.data || []}
          onChange={query => handleProductSuggestion('name', query)}
          suggestionLabel={suggestion => suggestion.name}
          onSelect={handleAutosuggestSelect}
        />
        <Row flex={[1, 1]}>
          <TextInput name="quantity" label="Kogus" type="numeric" />
          <UnitSelect name="unit" label="Ühik" />
        </Row>
        <WarehouseSelect name="warehouse" label="Ladu" />
        <TextInput name="price" label="Ostuhind" indicator={'€'} />
      </>
    );
  }

  return (
    <>
      <TextInput name="name" label="Nimetus" />
      <Row flex={[1, 1]}>
        <TextInput name="quantity" label="Kogus" type="numeric" />
        <UnitSelect name="unit" label="Ühik" />
      </Row>
      <TextInput name="price" label="Ostuhind" indicator={'€'} />
    </>
  );
};

const PurchaseItemForm: React.FC<PurchaseItemFormProps> = observer(
  ({ index, arrayHelpers, item }) => {
    const commonStore = useContext(CommonStoreContext);
    const uiStore = useContext(UIStoreContext);

    const [activeItemType, setActiveItemType] = useState<ItemType>(
      (item && item.type) || DEFAULT_ITEM_TYPE
    );

    const initialValues = item || {
      type: DEFAULT_ITEM_TYPE,
      ...forms[activeItemType].initialValues
    };

    const handleSubmit = values => {
      const filteredValues = filterObjectProperties(values, forms[values.type].fields);

      if (index !== undefined) {
        arrayHelpers.replace(index, filteredValues);
      } else {
        arrayHelpers.push(filteredValues);
      }

      uiStore.goBack();
    };

    const handleTypeSelect = ({ changedField, formik }) => {
      if (changedField.name === 'type') {
        formik.setErrors({});

        setActiveItemType(changedField.value);
      }
    };

    const validationSchema = forms[activeItemType].validationSchema;
    const headerTitle = item ? 'Muuda arvekaupa' : 'Lisa arvekaup';
    const submitBtnTitle = item ? 'Muuda kaupa' : 'Lisa kaup';

    return (
      <>
        <Header title={headerTitle} backTo />
        <ContentContainer>
          <Form
            id="new-purchase-item-form"
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            /* onChange={handleTypeSelect}
            onError={() =>
              animateScroll.scrollToTop({ containerId: 'content-container', duration: 200 })
            }
            persist */
          >
            <SelectInput
              name="type"
              label="Kauba tüüp"
              options={commonStore.itemTypes}
              optionLabel={type => itemTypeTranslations[type]}
            />
            <ItemForm type={activeItemType} />
          </Form>
        </ContentContainer>
        <FooterContainer style={{ padding: '0.25rem 1rem' }}>
          <Button title={submitBtnTitle} form="new-purchase-item-form" type="submit" />
        </FooterContainer>
      </>
    );
  }
);

export default PurchaseItemForm;
