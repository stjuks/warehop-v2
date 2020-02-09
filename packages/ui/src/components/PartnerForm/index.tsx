import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import * as yup from 'yup';

import routes from '@ui/util/routes';
import history from '@ui/util/history';
import PartnerStoreContext from '@ui/stores/PartnerStore';

import Header from '../Header';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import { Partner } from '@shared/types';
import Form from '../Form';
import ContentContainer from '../util/ContentContainer';
import CommonStoreContext from '@ui/stores/CommonStore';
import AriaSelect from '../Form/AriaSelect';
import { partnerTypeTranslations } from '@ui/util/translations';
import TextInput from '../Form/TextInput';
import FormError from '../Form/FormError';

const PartnerForm = observer(() => {
  const partnerStore = useContext(PartnerStoreContext);
  const commonStore = useContext(CommonStoreContext);

  const initialValues: Partner = {
    name: '',
    type: 'CLIENT',
    regNr: '',
    VATnr: '',
    phoneNr: '',
    email: '',
    street: '',
    postalCode: '',
    county: '',
    country: ''
  };

  const validationSchema = yup.object({
    type: yup.string().required('Palun vali partneri tüüp.'),
    name: yup.string().required('Palun sisesta partneri nimi.')
  });

  const handleSubmit = async (partner: Partner) => {
    try {
      await partnerStore.addPartner(partner);
      history.push(routes.partners);
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Header title="Uus partner" backTo={routes.partners} />
      <ContentContainer>
        <Form
          id="new-partner-form"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormError
            messages={{
              EntityAlreadyExistsError: {
                name: 'Sellise nimega partner on juba olemas.'
              }
            }}
          />
          <AriaSelect
            options={commonStore.partnerTypes}
            optionMap={{ label: value => partnerTypeTranslations[value] }}
            name="type"
            label="Partneri tüüp"
          />
          <TextInput name="name" label="Nimi" />
          <TextInput name="regNr" label="Registrikood" />
          <TextInput name="VATnr" label="KMK nr" />
          <TextInput name="phoneNr" label="Telefoni number" />
          <TextInput name="email" label="E-post" />
          <TextInput name="address" label="Aadress" />
          <TextInput name="postalCode" label="Postikood" />
          <TextInput name="county" label="Maakond" />
          <TextInput name="country" label="Riik" />
        </Form>
      </ContentContainer>
      <FooterContainer style={{ padding: '0.5rem 1rem' }}>
        <Button title="Lisa partner" form="new-partner-form" />
      </FooterContainer>
    </>
  );
});

export default PartnerForm;
