import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { animateScroll } from 'react-scroll';
import moment from 'moment';
import * as yup from 'yup';

import routes from '../../util/routes';
import { AddPurchaseItemBtn } from './styles';

import Header from '../Header';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import { Invoice, InvoiceType, Partner, InvoiceItem, PartnerType } from '@shared/types';
import Form, { FileInput, DateInput, TextInput, TextareaInput } from '../FormNew';
import FieldArray from '../Form/util/FieldArray';
import InvoiceItemListItem from '../InvoiceItemListItem';
import PurchaseItemForm from '../PurchaseItemForm';
// import TextInput from '../Form/TextInput';
import { Row } from '../Layout/styles';
// import FileInput from '../Form/FileInput';
// import DateInput from '../Form/DateInput';
import { FormTitle } from '../Form/styles';
import FormError from '../Form/FormError';
import { filterObjectProperties } from '@ui/util/helpers';
import UIStoreContext from '@ui/stores/UIStore';
import ContentContainer from '../util/ContentContainer';
import { RouteComponentProps, useParams } from 'react-router';
import { useGraphQLMutation, useGraphQLQuery } from '@ui/util/hooks';
import { EDIT_INVOICE, ADD_INVOICE, FETCH_INVOICE } from '@ui/api/invoice';
import InvoicePartnerField from './InvoicePartnerField';
import { useFormikContext } from 'formik';

type FormMode = 'EDIT' | 'ADD';

interface InvoiceFormProps extends RouteComponentProps {
  mode: FormMode;
  type: InvoiceType;
}

interface InvoiceFormValues {
  type: InvoiceType;
  partner?: Partner;
  number: string;
  file?: File | string;
  issueDate: Date;
  dueDate: Date;
  description: string;
  items: InvoiceItem[];
}

const createConfig = (mode: FormMode, type: InvoiceType) => {
  const title =
    mode === 'EDIT' ? 'Muuda arvet' : type === 'PURCHASE' ? 'Uus ostuarve' : 'Uus müügiarve';
  const buttonTitle = mode === 'EDIT' ? 'Muuda arve' : 'Loo arve';
  const backRoute = type === 'PURCHASE' ? routes.purchases : routes.sales;
  const partnerType: PartnerType = type === 'PURCHASE' ? 'CLIENT' : 'VENDOR';
  const formId = type === 'PURCHASE' ? `${mode}-purchase-form` : `${mode}-sale-form`;

  return { title, buttonTitle, backRoute, partnerType, formId };
};

const InvoiceForm: React.FC<InvoiceFormProps> = observer(({ mode, type }) => {
  const uiStore = useContext(UIStoreContext);

  const [editInvoice] = useGraphQLMutation(EDIT_INVOICE);
  const [addInvoice] = useGraphQLMutation(ADD_INVOICE);

  const { id } = useParams();

  const initialValues: InvoiceFormValues = {
    type,
    partner: undefined,
    number: '',
    file: undefined,
    issueDate: moment().toDate(),
    dueDate: moment().toDate(),
    description: '',
    items: [],
  };

  const config = createConfig(mode, type);

  const validationSchema = yup.object({
    partner: yup.object().required('Palun vali tarnija.'),
    number: yup.string().nullable().required('Palun sisesta arve number.'),
    issueDate: yup.mixed().required('Palun sisesta ostukuupäev.'),
    dueDate: yup.mixed().required('Palun sisesta maksetähtaeg.'),
    items: yup.array().required('Palun lisa arvele kaubad.'),
  });

  const handleSubmit = async (invoice: Invoice) => {
    const invoiceInput = Object.assign({}, invoice);

    invoiceInput.items = invoice.items.map(({ warehouse, unit, ...itemInput }) => ({
      warehouseId: warehouse?.id,
      unitId: unit?.id,
      ...itemInput,
    }));

    try {
      if (mode === 'EDIT') await editInvoice({ id, invoice: invoiceInput }, invoice);
      else await addInvoice(invoiceInput, invoice);
      uiStore.goBack(config.backRoute);
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Header title={config.title} backTo={config.backRoute} />
      <ContentContainer>
        <Form
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          id={config.formId}
          /* onError={() =>
            animateScroll.scrollToTop({ containerId: 'content-container', duration: 200 })
          } */
          persist={mode === 'ADD'}
        >
          <FormFields type={type} config={config} mode={mode} />
        </Form>
      </ContentContainer>
      <FooterContainer style={{ padding: '0.25rem 1rem' }}>
        <Button title={config.buttonTitle} form={config.formId} type="submit" />
      </FooterContainer>
    </>
  );
});

const FormFields: React.FC<{
  type: InvoiceType;
  config: ReturnType<typeof createConfig>;
  mode: FormMode;
}> = observer(({ type, config, mode }) => {
  const uiStore = useContext(UIStoreContext);
  const { values, setValues } = useFormikContext<any>();

  const { id } = useParams();

  const [editableInvoice] = useGraphQLQuery(FETCH_INVOICE, {
    variables: { id },
    loadOnMount: mode === 'EDIT',
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
      <InvoicePartnerField partnerType={config.partnerType} />
      <TextInput name="number" label="Arve nr" />
      <Row flex={[1, 1]}>
        <DateInput name="issueDate" label="Ostukuupäev" />
        <DateInput name="dueDate" label="Maksetähtaeg" />
      </Row>
      <FormTitle>Lisaandmed</FormTitle>
      {type === 'PURCHASE' && <FileInput name="file" accept=".pdf" label="Arve fail (PDF)" />}
      <TextareaInput name="description" label="Märkused" />
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

export default InvoiceForm;
