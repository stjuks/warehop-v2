import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import currency from 'currency.js';
import { observer } from 'mobx-react-lite';
import Modal from '../Modal';
import routes from '../../util/routes';
import history from '../../util/history';
import Form from '../Form';
import * as yup from 'yup';

import AriaSelect from '../Form/AriaSelect';
import TextInput from '../Form/TextInput';
import DateInput from '../Form/DateInput';
import { Row } from '../Layout/styles';
import AutosuggestInput from '../Form/AutosuggestInput';
import { ItemType, Invoice, AddTransactionInput } from '@shared/types';
import Header from '../Header';
import { ContentContainer } from '../App/styles';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import { filterObjectProperties } from '../../util/helpers';
import { itemTypeTranslations } from '../../util/translations';
import CommonStoreContext from '../../stores/CommonStore';
import { RouteChildrenProps } from 'react-router';
import WarehouseStoreContext from '../../stores/WarehouseStore';
import TransactionStoreContext from '@ui/stores/TransactionStore';

interface TransactionFormProps {
  invoice: Invoice;
}

const TransactionForm: React.FC<TransactionFormProps & RouteChildrenProps> = ({ invoice }) => {
  const transactionStore = useContext(TransactionStoreContext);

  const initialValues = {
    invoiceId: invoice.id,
    sum: currency(Number(invoice.sum) - Number(invoice.paidSum)).toString(),
    date: new Date(),
    description: ''
  };

  const handleSubmit = async (transaction: AddTransactionInput) => {
    try {
      await transactionStore.addTransaction(transaction);
      history.goBack();
    } catch (err) {
      throw err;
    }
  };

  const validationSchema = yup.object({
    invoiceId: yup.number().required(),
    sum: yup
      .string()
      .typeError('Summa peab olema number.')
      .required('Palun sisesta makse summa.'),
    date: yup.date().typeError('Vale kuupäevaformaat.'),
    description: yup.string()
  });

  return (
    <Modal isOpen={true}>
      <Header title={`Makse #${invoice.number}`} backTo={`${routes.purchases}/${invoice.id}`} />
      <ContentContainer>
        <Form
          id="new-transaction-form"
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <TextInput name="sum" label="Summa" />
          <DateInput name="date" label="Maksekuupäev" />
          <TextInput name="description" label="Märkused" isTextarea />
        </Form>
      </ContentContainer>
      <FooterContainer style={{ padding: '0.25rem 1rem' }}>
        <Button title="Lisa makse" form="new-transaction-form" type="submit" />
      </FooterContainer>
    </Modal>
  );
};

export default withRouter(TransactionForm);
