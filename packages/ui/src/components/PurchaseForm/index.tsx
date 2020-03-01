import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import * as yup from 'yup';

import routes from '../../util/routes';
import { AddPurchaseItemBtn } from './styles';
import InvoiceStoreContext from '../../stores/InvoiceStore';

import Header from '../Header';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import { Partner, InvoiceItem, InvoiceType } from '@shared/types';
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
import UIStoreContext from '@ui/stores/UIStore';
import ContentContainer from '../util/ContentContainer';

interface PurchaseFormFormValues {
  type: InvoiceType;
  partner: Partner | undefined;
  number: string;
  file?: File;
  issueDate: Date;
  dueDate: Date;
  description?: string;
  items: InvoiceItem[];
}

const PurchaseForm = observer(() => {
  const invoiceStore = useContext(InvoiceStoreContext);
  const uiStore = useContext(UIStoreContext);

  const initialValues: PurchaseFormFormValues = {
    type: 'PURCHASE',
    partner: undefined,
    number: '',
    file: undefined,
    issueDate: moment().toDate(),
    dueDate: moment().toDate(),
    description: '',
    items: []
  };

  const validationSchema = yup.object({
    partner: yup.object().required('Palun vali tarnija.'),
    number: yup
      .string()
      .nullable()
      .required('Palun sisesta arve number.'),
    issueDate: yup.mixed().required('Palun sisesta ostukuupäev.'),
    dueDate: yup.mixed().required('Palun sisesta maksetähtaeg.'),
    items: yup.array().required('Palun lisa arvele kaubad.')
  });

  const handleSubmit = async purchase => {
    try {
      await invoiceStore.addInvoice(purchase);
      uiStore.goBack(routes.purchases);
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Header title="Uus ostuarve" backTo={routes.purchases} />
      <ContentContainer>
        <Form
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onError={() => console.log('err')}
          id="new-purchase-form"
          persist
        >
          {formikProps => <FormFields formikProps={formikProps} />}
        </Form>
      </ContentContainer>
      <FooterContainer style={{ padding: '0.25rem 1rem' }}>
        <Button title="Loo arve" form="new-purchase-form" type="submit" />
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
        {arrayHelpers => (
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
