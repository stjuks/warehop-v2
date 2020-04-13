import React, { useContext, useEffect, useState, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import currency from 'currency.js';
import { useQuery } from '@apollo/react-hooks';

import ContentContainer from '../util/ContentContainer';
import { SortingContainer, TransactionItemContainer } from './styles';
import LoadMoreButton from '../util/LoadMoreButton';

import Header from '../Header';
import routes from '@ui/util/routes';
import MenuDateInput from '../util/inputs/MenuDateInput';
import { TransactionType, Transaction, TransactionQueryInput } from '@shared/types';
import HeaderSearch from '../HeaderSearch';
import { FETCH_EXPENSES, FETCH_INCOMES } from '@ui/api/transaction';
import { useGraphQLQuery } from '@ui/util/hooks';

interface TransactionsProps {
  type: TransactionType;
}

type TransactionsConfig = {
  [key in TransactionType]: {
    headerTitle: string;
    route: string;
  };
};

const Transactions: React.FC<TransactionsProps> = observer(({ type }) => {
  const [startDate, setStartDate] = useState(new Date('2020-01-01'));
  const [endDate, setEndDate] = useState(new Date('2020-12-31'));
  const [generalQuery, setGeneralQuery] = useState('');

  const FETCH_QUERY = type === 'EXPENSE' ? FETCH_EXPENSES : FETCH_INCOMES;

  const [transactions, [fetchMoreTransactions]] = useGraphQLQuery(FETCH_QUERY, {
    variables: { pagination: { limit: 1 }, startDate, endDate, generalQuery },
    loadOnMount: true,
  });

  const config: TransactionsConfig = {
    EXPENSE: {
      headerTitle: 'Kulud',
      route: routes.expenses,
    },
    INCOME: {
      headerTitle: 'Tulud',
      route: routes.incomes,
    },
  };

  const headerIcons = [<HeaderSearch onChange={setGeneralQuery} placeholder="Otsi kulu" />];

  return (
    <>
      <Header title={config[type].headerTitle} components={headerIcons} />
      <SortingContainer>
        <MenuDateInput noFormik name="startDate" onChange={setStartDate} value={startDate} />
        -
        <MenuDateInput noFormik name="endDate" onChange={setEndDate} value={endDate} />
      </SortingContainer>
      <ContentContainer>
        {transactions?.data.map((transaction) => (
          <TransactionItem {...transaction} key={transaction.id} route={config[type].route} />
        ))}
        {transactions?.pageInfo.hasNextPage && <LoadMoreButton onClick={() => fetchMoreTransactions()} />}
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
