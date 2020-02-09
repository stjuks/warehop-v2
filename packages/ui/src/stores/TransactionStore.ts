import { observable, computed } from 'mobx';
import { task } from 'mobx-task';
import { createContext } from 'react';
import { Transaction, AddTransactionInput } from '@shared/types';
import api from '../api';
import { paginatedData } from '../util/helpers';
import { uiStore } from './UIStore';

class TransactionStore {
  private ITEM_LIMIT = 10;

  @observable paginatedIncomes = paginatedData<Transaction>();
  @observable paginatedExpenses = paginatedData<Transaction>();

  @task
  addTransaction = async (transaction: AddTransactionInput) => {
    uiStore.setLoading(true);

    try {
      await api.addTransaction(transaction);
    } catch (err) {
      throw err;
    } finally {
      uiStore.setLoading(false);
    }
  };
}

const TransactionStoreContext: React.Context<TransactionStore> = createContext(
  new TransactionStore()
);

export default TransactionStoreContext;
