import { observable, computed } from 'mobx';
import { task } from 'mobx-task';
import { createContext } from 'react';
import { Transaction, AddTransactionInput, TransactionQueryInput } from '@shared/types';
import api from '../api';
import { paginatedData } from '../util/helpers';
import { uiStore } from './UIStore';

class TransactionStore {
  private TRANSACTION_LIMIT = 25;

  @observable paginatedIncomes = paginatedData<Transaction>();
  @observable paginatedExpenses = paginatedData<Transaction>();

  @task
  fetchIncomes = async (filter?: TransactionQueryInput) => {
    /* uiStore.setLoading(true);

    const safeFilter = filter || {};

    try {
      const incomes = await api.fetchIncomes({
        ...safeFilter,
        pagination: { limit: this.TRANSACTION_LIMIT }
      });

      uiStore.setLoading(false);

      this.paginatedIncomes.pageInfo = incomes.pageInfo;
      this.paginatedIncomes.data = incomes.data;
    } catch (err) {
      throw err;
    } finally {
      uiStore.setLoading(false);
    } */
  };

  @task
  fetchMoreIncomes = async (filter?: TransactionQueryInput) => {
    /* uiStore.setLoading(true);

    const safeFilter = filter || {};

    try {
      const incomes = await api.fetchIncomes({
        ...safeFilter,
        pagination: { cursor: this.paginatedIncomes.pageInfo.cursor, limit: this.TRANSACTION_LIMIT }
      });

      uiStore.setLoading(false);

      this.paginatedIncomes.pageInfo = incomes.pageInfo;
      this.paginatedIncomes.data.push(...incomes.data);
    } catch (err) {
      throw err;
    } finally {
      uiStore.setLoading(false);
    } */
  };

  @task
  fetchExpenses = async (filter?: TransactionQueryInput) => {
    /* uiStore.setLoading(true);

    const safeFilter = filter || {};

    try {
      const expenses = await api.fetchExpenses({
        ...safeFilter,
        pagination: { limit: this.TRANSACTION_LIMIT }
      });

      uiStore.setLoading(false);

      this.paginatedExpenses.pageInfo = expenses.pageInfo;
      this.paginatedExpenses.data = expenses.data;
    } catch (err) {
      throw err;
    } finally {
      uiStore.setLoading(false);
    } */
  };

  @task
  fetchMoreExpenses = async (filter?: TransactionQueryInput) => {
    /* uiStore.setLoading(true);

    const safeFilter = filter || {};

    try {
      const expenses = await api.fetchExpenses({
        ...safeFilter,
        pagination: {
          cursor: this.paginatedExpenses.pageInfo.cursor,
          limit: this.TRANSACTION_LIMIT
        }
      });

      this.paginatedExpenses.pageInfo = expenses.pageInfo;
      this.paginatedExpenses.data.push(...expenses.data);
    } catch (err) {
      throw err;
    } finally {
      uiStore.setLoading(false);
    } */
  };

  @task
  fetchTransaction = async (id: number) => {
    /* uiStore.setLoading(true);

    try {
      const transaction = await api.fetchTransaction(id);

      return transaction;
    } catch (err) {
      throw err;
    } finally {
      uiStore.setLoading(false);
    } */
  };

  @task
  editTransaction = async (id: number, transaction: AddTransactionInput) => {
    /* uiStore.setLoading(true);

    try {
      await api.editTransaction(id, transaction);
    } catch (err) {
      throw err;
    } finally {
      uiStore.setLoading(false);
    } */
  };

  @task
  deleteTransaction = async (id?: number) => {
    /* uiStore.setLoading(true);

    try {
      if (id) await api.deleteTransaction(id);
    } catch (err) {
      throw err;
    } finally {
      uiStore.setLoading(false);
    } */
  };

  @task
  addIncome = async (transaction: AddTransactionInput) => {
    /* uiStore.setLoading(true);

    try {
      await api.addIncome(transaction);
    } catch (err) {
      throw err;
    } finally {
      uiStore.setLoading(false);
    } */
  };

  @task
  addExpense = async (transaction: AddTransactionInput) => {
    /* uiStore.setLoading(true);

    try {
      await api.addExpense(transaction);
    } catch (err) {
      throw err;
    } finally {
      uiStore.setLoading(false);
    } */
  };

  @computed
  get incomes() {
    return this.paginatedIncomes.data;
  }

  @computed
  get expenses() {
    return this.paginatedExpenses.data;
  }
}

const TransactionStoreContext: React.Context<TransactionStore> = createContext(
  new TransactionStore()
);

export default TransactionStoreContext;
