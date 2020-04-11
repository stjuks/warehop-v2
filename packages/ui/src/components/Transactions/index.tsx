import React, { useContext, useEffect, useState, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import currency from 'currency.js';

import ContentContainer from '../util/ContentContainer';
import { SortingContainer, TransactionItemContainer } from './styles';
import LoadMoreButton from '../util/LoadMoreButton';

import Header from '../Header';
import routes from '@ui/util/routes';
import MenuDateInput from '../util/inputs/MenuDateInput';
import TransactionStoreContext from '@ui/stores/TransactionStore';
import { TransactionType, Transaction, TransactionQueryInput } from '@shared/types';
import HeaderSearch from '../HeaderSearch';

interface TransactionsProps {
  type: TransactionType;
}

interface TransactionsConfig {
  headerTitle: string;
  transactions: Transaction[];
  fetchTransactions: (filter?: TransactionQueryInput) => any;
  fetchMoreTransactions: (filter?: TransactionQueryInput) => any;
  route: string;
  hasNextPage: boolean;
}

const Transactions: React.FC<TransactionsProps> = observer(({ type }) => {
  const transactionStore = useContext(TransactionStoreContext);
  const [startDate, setStartDate] = useState(new Date('2020-01-01'));
  const [endDate, setEndDate] = useState(new Date('2020-12-31'));
  const [generalQuery, setGeneralQuery] = useState('');

  const filter = useMemo(() => ({ startDate, endDate, generalQuery }), [
    startDate,
    endDate,
    generalQuery
  ]);

  const config: TransactionsConfig =
    type === 'EXPENSE'
      ? {
          headerTitle: 'Kulud',
          transactions: transactionStore.expenses,
          fetchTransactions: transactionStore.fetchExpenses,
          fetchMoreTransactions: transactionStore.fetchMoreExpenses,
          route: routes.expenses,
          hasNextPage: transactionStore.paginatedExpenses.pageInfo.hasNextPage
        }
      : {
          headerTitle: 'Tulud',
          transactions: transactionStore.incomes,
          fetchTransactions: transactionStore.fetchIncomes,
          fetchMoreTransactions: transactionStore.fetchMoreIncomes,
          route: routes.incomes,
          hasNextPage: transactionStore.paginatedIncomes.pageInfo.hasNextPage
        };

  const headerIcons = [<HeaderSearch onChange={setGeneralQuery} placeholder="Otsi kulu" />];

  useEffect(() => {
    config.fetchTransactions(filter);
  }, [filter]);

  return (
    <>
      <Header title={config.headerTitle} components={headerIcons} />
      <SortingContainer>
        <MenuDateInput noFormik name="startDate" onChange={setStartDate} value={filter.startDate} />
        -
        <MenuDateInput noFormik name="endDate" onChange={setEndDate} value={filter.endDate} />
      </SortingContainer>
      <ContentContainer>
        {config.transactions.map(transaction => (
          <TransactionItem {...transaction} key={transaction.id} route={config.route} />
        ))}
        {config.hasNextPage && (
          <LoadMoreButton onClick={() => config.fetchMoreTransactions(filter)} />
        )}
      </ContentContainer>
    </>
  );
});

interface TransactionItemProps extends Transaction {
  route: string;
}

const TransactionItem: React.FC<TransactionItemProps> = observer(
  ({ invoice, sum, date, route, id, type }) => {
    const formattedDate = moment(date).format('DD.MM.YYYY');
    const formattedSum = currency(sum).toString();

    return (
      <TransactionItemContainer to={`${route}/${id}`} type={type}>
        <div className="col col-1">
          <div className="partner-name">{invoice.partner.name}</div>
          <div className="invoice-nr">{invoice.number}</div>
        </div>
        <div className="col col-2">
          <div className="sum">{formattedSum}€</div>
          <div className="date">{formattedDate}</div>
        </div>
      </TransactionItemContainer>
    );
  }
);

export default Transactions;
