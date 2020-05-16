import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { animateScroll } from 'react-scroll';
import * as yup from 'yup';

import routes from '@ui/util/routes';
import PartnerStoreContext from '@ui/stores/PartnerStore';

import Header from '../Header';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import { Partner } from '@shared/types';
import Form, { AutosuggestInput } from '../FormNew';
import ContentContainer from '../util/ContentContainer';
import CommonStoreContext from '@ui/stores/CommonStore';
// import AriaSelect from '../Form/AriaSelect';
import { partnerTypeTranslations } from '@ui/util/translations';
// import TextInput from '../Form/TextInput';
// import FormError from '../Form/FormError';
import UIStoreContext from '@ui/stores/UIStore';
import { useGraphQLQuery, useGraphQLMutation } from '@ui/util/hooks';
import { FETCH_TYPES } from '@ui/api/common';
import { ADD_PARTNER, FETCH_CREDITINFO_PARTNERS, FETCH_PARTNERS } from '@ui/api/partner';
import { SelectInput, TextInput } from '../FormNew';

const PartnerForm = observer(() => {
  const uiStore = useContext(UIStoreContext);

  const [types] = useGraphQLQuery(FETCH_TYPES, { loadOnMount: true });
  const [creditInfoPartners, [, fetchCreditInfoPartners]] = useGraphQLQuery(
    FETCH_CREDITINFO_PARTNERS
  );
  const [partners, [, fetchPartners]] = useGraphQLQuery(FETCH_PARTNERS);

  const [addPartner] = useGraphQLMutation(ADD_PARTNER);

  console.log(creditInfoPartners);

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
    country: '',
  };

  const validationSchema = yup.object({
    type: yup.string().required('Palun vali partneri tüüp.'),
    name: yup.string().required('Palun sisesta partneri nimi.'),
  });

  const handleSubmit = async (partner: Partner) => {
    try {
      await addPartner(partner);
      uiStore.goBack(routes.partners);
    } catch (err) {
      throw err;
    }
  };

  const handleAutosuggestSelect = ({ homepage, ...restValue }, { setValues, values }) => {
    setValues({
      ...values,
      ...restValue,
    });
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
          /* onError={() =>
            animateScroll.scrollToTop({ containerId: 'content-container', duration: 200 })
          }
        persist */
        >
          {/* <FormError /> */}
          <SelectInput
            name="type"
            label="Partneri tüüp"
            options={types?.partnerTypes || []}
            optionLabel={(option) => partnerTypeTranslations[option]}
          />
          <AutosuggestInput
            name="name"
            label="Nimi"
            multiSection={true}
            suggestions={[
              { title: 'E-krediidiinfo', suggestions: creditInfoPartners || [] },
              { title: 'Partnerid', suggestions: partners?.data || [] },
            ]}
            suggestionLabel={(suggestion) => suggestion.name}
            fetchSuggestions={(value) => {
              fetchCreditInfoPartners({ query: value });
              fetchPartners({ name: value });
            }}
            onSelect={handleAutosuggestSelect}
          />
          {/* <TextInput name="name" label="Nimi" /> */}
          <TextInput name="regNr" label="Registrikood" />
          <TextInput name="VATnr" label="KMK nr" />
          <TextInput name="phoneNr" label="Telefoni number" type="tel" />
          <TextInput name="email" label="E-post" type="email" />
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
