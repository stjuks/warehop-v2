import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import currency from 'currency.js';
import routes from '../../util/routes';
import Form from '../Form';
import * as yup from 'yup';

import TextInput from '../Form/TextInput';
import DateInput from '../Form/DateInput';
import { Invoice, AddTransactionInput, Transaction } from '@shared/types';
import Header from '../Header';
import { ContentContainer } from '../App/styles';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import { RouteChildrenProps } from 'react-router';
import TransactionStoreContext from '@ui/stores/TransactionStore';
import UIStoreContext from '@ui/stores/UIStore';
import { useGraphQLMutation } from '@ui/util/hooks';
import { ADD_EXPENSE, ADD_INCOME, EDIT_TRANSACTION } from '@ui/api/transaction';

interface TransactionFormProps {
  invoice?: Invoice;
  transaction?: Transaction;
  onSubmit?: (transaction: AddTransactionInput) => any;
}

const TransactionForm: React.FC<TransactionFormProps & RouteChildrenProps> = ({
  invoice,
  transaction,
  onSubmit,
}) => {
  const transactionStore = useContext(TransactionStoreContext);
  const uiStore = useContext(UIStoreContext);

  const [addExpense] = useGraphQLMutation<AddTransactionInput>(ADD_EXPENSE);
  const [addIncome] = useGraphQLMutation<AddTransactionInput>(ADD_INCOME);
  const [editTransaction] = useGraphQLMutation<{ id: number; transaction: AddTransactionInput }>(
    EDIT_TRANSACTION
  );

  const initialValues = invoice
    ? {
        invoiceId: invoice.id,
        sum: currency(Number(invoice.sum) - Number(invoice.paidSum)).toString(),
        date: new Date(),
        description: '',
      }
    : transaction && {
        invoiceId: transaction.invoice.id,
        sum: currency(transaction.sum).toString(),
        date: new Date(transaction.date),
        description: transaction.description,
      };

  const handleSubmit = async (newTransaction: AddTransactionInput) => {
    try {
      if (transaction) await editTransaction({ id: transaction.id, transaction: newTransaction });
      else if (invoice?.type === 'PURCHASE') await addExpense(newTransaction);
      else if (invoice?.type === 'SALE') await addIncome(newTransaction);

      if (onSubmit) await onSubmit(newTransaction);
      uiStore.goBack();
    } catch (err) {
      throw err;
    }
  };

  const validationSchema = yup.object({
    invoiceId: yup.number().required(),
    sum: yup
      .string()
      .nullable()
      .typeError('Summa peab olema number.')
      .required('Palun sisesta makse summa.'),
    date: yup.date().typeError('Vale kuupäevaformaat.'),
    description: yup.string().nullable(),
  });

  return (
    <>
      <Header
        title={`Makse #${invoice?.number || transaction?.invoice.number}`}
        backTo={`${routes.purchases}/${invoice?.id || transaction?.invoice.id}`}
      />
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
        <Button
          title={transaction ? 'Muuda makset' : 'Lisa makse'}
          form="new-transaction-form"
          type="submit"
        />
      </FooterContainer>
    </>
  );
};

export default withRouter(TransactionForm);
