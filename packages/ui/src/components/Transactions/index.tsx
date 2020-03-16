import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import currency from 'currency.js';

import ContentContainer from '../util/ContentContainer';
import { SortingContainer, NewItemButtonContainer, TransactionItemContainer } from './styles';
import LoadMoreButton from '../util/LoadMoreButton';

import Header from '../Header';
import Form from '../Form';
import UIStoreContext from '@ui/stores/UIStore';
import routes from '@ui/util/routes';
import WarehouseForm from '../WarehouseForm';
import MenuDateInput from '../util/inputs/MenuDateInput';
import TransactionStoreContext from '@ui/stores/TransactionStore';
import { TransactionType, Transaction, TransactionQueryInput } from '@shared/types';
import { FiChevronDown, FiArrowDown } from 'react-icons/fi';
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

  const [filter, setFilter] = useState<TransactionQueryInput>({
    startDate: new Date('2020-01-01'),
    endDate: new Date('2020-12-31'),
    generalQuery: ''
  });

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

  const headerIcons = [
    <HeaderSearch
      onChange={query => setFilter({ ...filter, generalQuery: query })}
      placeholder="Otsi kulu"
    />
  ];

  useEffect(() => {
    config.fetchTransactions(filter);
  }, [filter]);

  return (
    <>
      <Header title={config.headerTitle} components={headerIcons} />
      <SortingContainer>
        <MenuDateInput
          noFormik
          name="startDate"
          onChange={value => setFilter({ ...filter, startDate: value })}
          value={filter.startDate}
        />
        -
        <MenuDateInput
          noFormik
          name="endDate"
          onChange={value => setFilter({ ...filter, endDate: value })}
          value={filter.endDate}
        />
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
