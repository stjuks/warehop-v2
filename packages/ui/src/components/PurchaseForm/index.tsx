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
import { Partner, InvoiceItem, InvoiceType, Invoice } from '@shared/types';
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
import { RouteComponentProps } from 'react-router';
import { useGraphQLMutation } from '@ui/util/hooks';
import { EDIT_INVOICE, ADD_INVOICE } from '@ui/api/invoice';

interface PurchaseFormProps extends RouteComponentProps {
  purchase: Invoice;
}

const PurchaseForm: React.FC<PurchaseFormProps> = observer(({ location }) => {
  const invoiceStore = useContext(InvoiceStoreContext);
  const uiStore = useContext(UIStoreContext);

  const [editInvoice] = useGraphQLMutation(EDIT_INVOICE);
  const [addInvoice] = useGraphQLMutation(ADD_INVOICE);

  const [sum, setSum] = useState<string>(currency(0).toString());

  const editablePurchase: any = location.state ? JSON.parse(location.state.toString()) : undefined;

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

  if (editablePurchase) {
    initialValues = filterObjectProperties(editablePurchase, Object.keys(initialValues));
  }

  const validationSchema = yup.object({
    partner: yup.object().required('Palun vali tarnija.'),
    number: yup.string().nullable().required('Palun sisesta arve number.'),
    issueDate: yup.mixed().required('Palun sisesta ostukuupäev.'),
    dueDate: yup.mixed().required('Palun sisesta maksetähtaeg.'),
    items: yup.array().required('Palun lisa arvele kaubad.'),
  });

  const handleSubmit = async (purchase) => {
    try {
      const parsedPurchase = parseInvoiceInput(purchase);
      if (editablePurchase) await editInvoice({ id: editablePurchase.id, ...parsedPurchase });
      else await addInvoice(purchase);
      uiStore.goBack(routes.purchases);
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Header title={editablePurchase ? 'Muuda arvet' : 'Uus ostuarve'} backTo={routes.purchases} />
      <ContentContainer>
        <Form
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onError={() =>
            animateScroll.scrollToTop({ containerId: 'content-container', duration: 200 })
          }
          id="new-purchase-form"
          persist={editablePurchase === undefined}
        >
          {(formikProps) => <FormFields formikProps={formikProps} />}
        </Form>
      </ContentContainer>
      <FooterContainer style={{ padding: '0.25rem 1rem' }}>
        <Button
          title={editablePurchase ? 'Muuda arve' : 'Loo arve'}
          form="new-purchase-form"
          type="submit"
        />
      </FooterContainer>
    </>
  );
});

const FormFields: React.FC<any> = observer(({ formikProps }) => {
  const uiStore = useContext(UIStoreContext);

  return (
    <>
      <FormError fields={['items']} />
      <FormTitle>Põhiandmed</FormTitle>
      <PartnerSelect name="partner" label="Tarnija" partnerType="VENDOR" />
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
            {formikProps.values.items.map((item, index) => (
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
