import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { animateScroll } from 'react-scroll';
import currency from 'currency.js';
import moment from 'moment';
import * as yup from 'yup';

import routes from '../../util/routes';
import { AddPurchaseItemBtn } from './styles';
import InvoiceStoreContext, { parseInvoiceInput } from '../../stores/InvoiceStore';

import Header from '../Header';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import { Partner, InvoiceItem, InvoiceType, Invoice, AddInvoiceInput } from '@shared/types';
import Form from '../Form';
import FieldArray from '../Form/util/FieldArray';
import InvoiceItemListItem from '../InvoiceItemListItem';
import PurchaseItemForm from '../PurchaseItemForm';
import TextInput from '../Form/TextInput';
import PartnerSelect from '../util/inputs/PartnerSelect';
import { Row } from '../Layout/styles';
import FileInput from '../Form/FileInput';
import DateInput from '../Form/DateInput';
import { FormTitle } from '../Form/styles';
import FormError from '../Form/FormError';
import { filterObjectProperties } from '@ui/util/helpers';
import UIStoreContext from '@ui/stores/UIStore';
import ContentContainer from '../util/ContentContainer';
import { RouteComponentProps, useParams } from 'react-router';
import { useGraphQLMutation, useGraphQLQuery } from '@ui/util/hooks';
import { EDIT_INVOICE, ADD_INVOICE, FETCH_INVOICE } from '@ui/api/invoice';
import InvoicePartnerForm from './InvoicePartnerForm';
import InvoicePartnerField from './InvoicePartnerField';
import { useFormikContext } from 'formik';

interface PurchaseFormProps extends RouteComponentProps {
  purchase: Invoice;
  mode: 'EDIT' | 'ADD';
}

const PurchaseForm: React.FC<PurchaseFormProps> = observer(({ location, mode }) => {
  const uiStore = useContext(UIStoreContext);

  const [editInvoice] = useGraphQLMutation(EDIT_INVOICE);
  const [addInvoice] = useGraphQLMutation(ADD_INVOICE);

  const { id } = useParams();

  let initialValues: any = {
    type: 'PURCHASE',
    partner: undefined,
    number: '',
    file: undefined,
    issueDate: moment().toDate(),
    dueDate: moment().toDate(),
    description: '',
    items: [],
  };

  const config = {
    title: mode === 'EDIT' ? 'Muuda arvet' : 'Uus ostuarve',
    buttonTitle: mode === 'EDIT' ? 'Muuda arve' : 'Loo arve',
  };

  const validationSchema = yup.object({
    partner: yup.object().required('Palun vali tarnija.'),
    number: yup.string().nullable().required('Palun sisesta arve number.'),
    issueDate: yup.mixed().required('Palun sisesta ostukuupäev.'),
    dueDate: yup.mixed().required('Palun sisesta maksetähtaeg.'),
    items: yup.array().required('Palun lisa arvele kaubad.'),
  });

  const handleSubmit = async (purchase: Invoice) => {
    const purchaseInput = Object.assign({}, purchase);

    purchaseInput.items = purchase.items.map(({ warehouse, unit, ...itemInput }) => ({
      warehouseId: warehouse?.id,
      unitId: unit?.id,
      ...itemInput,
    }));

    try {
      if (mode === 'EDIT') await editInvoice({ id, invoice: purchaseInput }, purchase);
      else await addInvoice(purchaseInput, purchase);
      uiStore.goBack(routes.purchases);
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Header title={config.title} backTo={routes.purchases} />
      <ContentContainer>
        <Form
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onError={() =>
            animateScroll.scrollToTop({ containerId: 'content-container', duration: 200 })
          }
          id="purchase-form"
          persist={mode === 'ADD'}
        >
          <FormFields />
        </Form>
      </ContentContainer>
      <FooterContainer style={{ padding: '0.25rem 1rem' }}>
        <Button title={config.buttonTitle} form="purchase-form" type="submit" />
      </FooterContainer>
    </>
  );
});

const FormFields: React.FC<any> = observer(() => {
  const uiStore = useContext(UIStoreContext);
  const { values, setValues } = useFormikContext<any>();

  const { id } = useParams();

  const [editableInvoice] = useGraphQLQuery(FETCH_INVOICE, {
    variables: { id },
    loadOnMount: id !== undefined,
  });

  useEffect(() => {
    if (editableInvoice)
      setValues(
        filterObjectProperties(editableInvoice, [
          'type',
          'partner',
          'file',
          'number',
          'issueDate',
          'dueDate',
          'description',
          'items',
        ])
      );
  }, [editableInvoice]);

  return (
    <>
      <FormError fields={['items']} />
      <FormTitle>Põhiandmed</FormTitle>
      <InvoicePartnerField partnerType="VENDOR" />
      {/* <PartnerSelect name="partner" label="Tarnija" partnerType="VENDOR" /> */}
      <TextInput name="number" label="Arve nr" />
      <Row flex={[1, 1]}>
        <DateInput name="issueDate" label="Ostukuupäev" />
        <DateInput name="dueDate" label="Maksetähtaeg" />
      </Row>
      <FormTitle>Lisaandmed</FormTitle>
      <FileInput name="file" accept=".pdf" label="Arve fail (PDF)" />
      <TextInput name="description" label="Märkused" isTextarea />
      <FieldArray name="items">
        {(arrayHelpers) => (
          <>
            <FormTitle>
              Kaubad{' '}
              <AddPurchaseItemBtn
                onClick={() => uiStore.openModal(<PurchaseItemForm arrayHelpers={arrayHelpers} />)}
                type="button"
              >
                + Lisa kaup
              </AddPurchaseItemBtn>
            </FormTitle>
            {values.items.map((item, index) => (
              <InvoiceItemListItem
                key={index}
                item={item}
                style={{ margin: '0 0.25rem' }}
                onDelete={() => arrayHelpers.remove(index)}
                onEdit={() =>
                  uiStore.openModal(
                    <PurchaseItemForm item={item} index={index} arrayHelpers={arrayHelpers} />
                  )
                }
              />
            ))}
          </>
        )}
      </FieldArray>
    </>
  );
});

export default PurchaseForm;
