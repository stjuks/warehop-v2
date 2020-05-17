import React, { useContext } from 'react';
import { ArrayHelpers, FormikHelpers, FormikContextType } from 'formik';
import { PartnerType, InvoicePartnerInput, AddInvoiceInput } from '@shared/types';
import Header from '../Header';
import ContentContainer from '../util/ContentContainer';
import Form, { TextInput, ToggleInput } from '../FormNew';
import * as yup from 'yup';
// import TextInput from '../Form/TextInput';
import UIStoreContext from '@ui/stores/UIStore';
import Button from '../Button';
import { FooterContainer } from '../Footer/styles';
// import ToggleInput from '../Form/ToggleInput';
import PartnerSuggest from '../util/inputs/PartnerSuggest';
import { filterObjectProperties } from '@ui/util/helpers';

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
    address: '',
    postalCode: '',
    county: '',
  };

  const validationSchema = yup.object({
    name: yup.string().typeError('Palun sisesta nimi').required('Palun sisesta nimi.'),
  });

  const handleSubmit = (values: InvoicePartnerInput) => {
    formik.setFieldValue('partner', filterObjectProperties(values, Object.keys(initialValues)));
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
          persist
        >
          <ToggleInput name="savePartner" label="Salvesta partnerina" />
          <PartnerSuggest name="name" label="Nimi" />
          <TextInput name="phoneNr" label="Tel nr" />
          <TextInput name="email" label="E-meil" />
          <TextInput name="regNr" label="Reg nr" />
          <TextInput name="VATnr" label="KMKR nr" />
          <TextInput name="address" label="Aadress" />
          <TextInput name="postalCode" label="Postikood" />
          <TextInput name="county" label="Maakond" />
        </Form>
      </ContentContainer>
      <FooterContainer style={{ padding: '0.25rem 1rem' }}>
        <Button title={config.title} form="invoice-partner-form" type="submit" />
      </FooterContainer>
    </>
  );
};

export default InvoicePartnerForm;
