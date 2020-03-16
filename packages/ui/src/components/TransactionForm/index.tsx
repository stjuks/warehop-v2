import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import currency from 'currency.js';
import routes from '../../util/routes';
import Form from '../Form';
import * as yup from 'yup';

import TextInput from '../Form/TextInput';
import DateInput from '../Form/DateInput';
import { Invoice, AddTransactionInput } from '@shared/types';
import Header from '../Header';
import { ContentContainer } from '../App/styles';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import { RouteChildrenProps } from 'react-router';
import TransactionStoreContext from '@ui/stores/TransactionStore';
import UIStoreContext from '@ui/stores/UIStore';

interface TransactionFormProps {
  invoice: Invoice;
  onSubmit?: (transaction: AddTransactionInput) => any;
}

const TransactionForm: React.FC<TransactionFormProps & RouteChildrenProps> = ({
  invoice,
  onSubmit
}) => {
  const transactionStore = useContext(TransactionStoreContext);
  const uiStore = useContext(UIStoreContext);

  const initialValues = {
    invoiceId: invoice.id,
    sum: currency(Number(invoice.sum) - Number(invoice.paidSum)).toString(),
    date: new Date(),
    description: ''
  };

  const handleSubmit = async (transaction: AddTransactionInput) => {
    try {
      if (invoice.type === 'PURCHASE') await transactionStore.addExpense(transaction);
      else if (invoice.type === 'SALE') await transactionStore.addIncome(transaction);
      
      if (onSubmit) await onSubmit(transaction);
      uiStore.goBack();
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
    <>
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
    </>
  );
};

export default withRouter(TransactionForm);
