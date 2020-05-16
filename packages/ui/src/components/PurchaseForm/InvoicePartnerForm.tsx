import React, { useContext } from 'react';
import { ArrayHelpers, FormikHelpers, FormikContextType } from 'formik';
import { PartnerType, InvoicePartnerInput, AddInvoiceInput } from '@shared/types';
import Header from '../Header';
import ContentContainer from '../util/ContentContainer';
import Form from '../Form';
import * as yup from 'yup';
import TextInput from '../Form/TextInput';
import UIStoreContext from '@ui/stores/UIStore';
import Button from '../Button';
import { FooterContainer } from '../Footer/styles';
import RadioInput from '../Form/RadioInput';
import ToggleInput from '../Form/ToggleInput';

interface InvoicePartnerFormProps {
  partnerType: PartnerType;
  formik: FormikContextType<AddInvoiceInput>;
}

const InvoicePartnerForm: React.FC<InvoicePartnerFormProps> = ({ partnerType, formik }) => {
  const uiStore = useContext(UIStoreContext);
  
  const config = {
    title: partnerType === 'CLIENT' ? 'Määra klient' : 'Määra tarnija',
  };

  const initialValues: InvoicePartnerInput = formik.values.partner || {
    name: '',
    savePartner: false,
    regNr: '',
    VATnr: '',
    phoneNr: '',
    email: '',
    street: '',
    postalCode: '',
    county: '',
    country: '',
  };

  const validationSchema = yup.object({
    name: yup.string().typeError('Palun sisesta nimi').required('Palun sisesta nimi.'),
  });

  const handleSubmit = (values: InvoicePartnerInput) => {
    formik.setFieldValue('partner', values);
    uiStore.goBack();
  };

  return (
    <>
      <Header title={config.title} backTo />
      <ContentContainer>
        <Form
          id="invoice-partner-form"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <ToggleInput name="savePartner" label="Salvesta partnerina" />
          <TextInput name="name" label="Nimi" />
          <TextInput name="phoneNr" label="Tel nr" />
          <TextInput name="email" label="E-meil" />
          <TextInput name="regNr" label="Reg nr" />
          <TextInput name="VATnr" label="KMKR nr" />
          <TextInput name="street" label="Aadress" />
          <TextInput name="postalCode" label="Postikood" />
          <TextInput name="county" label="Maakond" />
          <TextInput name="country" label="Riik" />
        </Form>
      </ContentContainer>
      <FooterContainer style={{ padding: '0.25rem 1rem' }}>
        <Button title={config.title} form="invoice-partner-form" type="submit" />
      </FooterContainer>
    </>
  );
};

export default InvoicePartnerForm;
