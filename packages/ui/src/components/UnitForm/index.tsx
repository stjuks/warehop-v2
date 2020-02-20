import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import * as yup from 'yup';

import routes from '@ui/util/routes';
import history from '@ui/util/history';
import PartnerStoreContext from '@ui/stores/PartnerStore';

import Header from '../Header';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import { Partner, Unit } from '@shared/types';
import Form from '../Form';
import ContentContainer from '../util/ContentContainer';
import CommonStoreContext from '@ui/stores/CommonStore';
import AriaSelect from '../Form/AriaSelect';
import { partnerTypeTranslations } from '@ui/util/translations';
import TextInput from '../Form/TextInput';
import FormError from '../Form/FormError';
import { uiStore } from '@ui/stores/UIStore';

const UnitForm = observer(() => {
  const partnerStore = useContext(PartnerStoreContext);
  const commonStore = useContext(CommonStoreContext);

  const initialValues: Unit = {
    name: '',
    abbreviation: ''
  };

  const validationSchema = yup.object({
    abbreviation: yup.string().required('Palun sisesta ühiku lühend.'),
    name: yup.string().required('Palun sisesta ühiku nimetus.')
  });

  const handleSubmit = async (unit: Unit) => {
    try {
      await commonStore.addUnit(unit);
      history.goBack();
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Header title="Uus Ühik" onBack={() => uiStore.closeModal()} />
      <ContentContainer>
        <Form
          id="unit-form"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          persist
        >
          <FormError
            messages={{
              EntityAlreadyExistsError: {
                abbreviation: 'Sellise lühendiga ühik on juba olemas.',
                name: 'Sellise nimega ühik on juba olemas.'
              }
            }}
          />
          <TextInput name="name" label="Nimetus" />
          <TextInput name="abbreviation" label="Lühend" />
        </Form>
      </ContentContainer>
      <FooterContainer style={{ padding: '0.5rem 1rem' }}>
        <Button title="Lisa partner" form="new-partner-form" />
      </FooterContainer>
    </>
  );
});

export default UnitForm;
