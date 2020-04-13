import { observable, computed } from 'mobx';
import { task } from 'mobx-task';
import { createContext } from 'react';
import { Invoice, AddInvoiceInput, InvoiceSearchInput } from '@shared/types';
import api from '../api';
import { paginatedData } from '../util/helpers';
import { uiStore } from './UIStore';

class InvoiceStore {
  private INVOICE_LIMIT = 10;

  @observable paginatedPurchases = paginatedData<Invoice>();
  @observable paginatedSales = paginatedData<Invoice>();

  @task
  fetchPurchases = async (filter?: InvoiceSearchInput) => {
    /* uiStore.setLoading(true);

    const safeFilter = filter || {};

    const purchases = await api.fetchPurchases({
      ...safeFilter,
      pagination: { limit: this.INVOICE_LIMIT },
    });

    uiStore.setLoading(false);

    this.paginatedPurchases = purchases; */
  };

  @task
  fetchMorePurchases = async (filter?: InvoiceSearchInput) => {
    /* uiStore.setLoading(true);

    const safeFilter = filter || {};

    const purchases = await api.fetchPurchases({
      ...safeFilter,
      pagination: { cursor: this.paginatedPurchases.pageInfo.cursor, limit: this.INVOICE_LIMIT },
    });

    uiStore.setLoading(false);

    this.paginatedPurchases.pageInfo = purchases.pageInfo;
    this.paginatedPurchases.data.push(...purchases.data); */
  };

  @task
  fetchSales = async (filter?: InvoiceSearchInput) => {
    /* uiStore.setLoading(true);

    const safeFilter = filter || {};

    const sales = await api.fetchSales({
      ...safeFilter,
      pagination: { limit: this.INVOICE_LIMIT },
    });

    uiStore.setLoading(false);

    this.paginatedSales = sales; */
  };

  @task
  fetchMoreSales = async (filter?: InvoiceSearchInput) => {
    /* uiStore.setLoading(true);

    const safeFilter = filter || {};

    const sales = await api.fetchSales({
      ...safeFilter,
      pagination: { cursor: this.paginatedSales.pageInfo.cursor, limit: this.INVOICE_LIMIT },
    });

    uiStore.setLoading(false);

    this.paginatedSales.pageInfo = sales.pageInfo;
    this.paginatedSales.data.push(...sales.data); */
  };

  @task
  addInvoice = async (invoice: Invoice) => {
    /* const invoiceInput: AddInvoiceInput = parseInvoiceInput(invoice);

    try {
      await api.addInvoice(invoiceInput);
    } catch (err) {
      throw err;
    } */
  };

  @task
  editInvoice = async (id: number, invoice: Invoice) => {
    /* const invoiceInput: AddInvoiceInput = parseInvoiceInput(invoice);

    try {
      await api.editInvoice(id, invoiceInput);
    } catch (err) {
      throw err;
    } */
  };

  @task
  deleteInvoice = async (id?: number) => {
    /* try {
      if (id) await api.deleteInvoice(id);
    } catch (err) {
      throw err;
    } */
  };

  @task
  fetchInvoice = async (id: number) => {
    /* try {
      const invoice: Invoice = await api.fetchInvoice(id);

      return invoice;
    } catch (err) {
      throw err;
    } */
  };

  @task
  downloadInvoice = async (invoice?: Invoice) => {
    /* try {
      if (invoice) {
        const file = await api.downloadInvoice(invoice.id);

        const pdf = new Blob([file.data], { type: 'application/pdf' });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(pdf);
          return;
        }

        const data = window.URL.createObjectURL(pdf);
        const link = document.createElement('a');
        link.href = data;
        link.download = `ARVE ${invoice.number}`;
        link.click();
      }
    } catch (err) {
      throw err;
    } */
  };

  @task
  lockInvoice = async (invoiceId?: number) => {
    /* try {
      if (invoiceId) await api.lockInvoice(invoiceId);
    } catch (err) {
      throw err;
    } */
  };

  @task
  unlockInvoice = async (invoiceId?: number) => {
    /* try {
      if (invoiceId) await api.unlockInvoice(invoiceId);
    } catch (err) {
      throw err;
    } */
  };

  @computed
  get purchases() {
    return this.paginatedPurchases.data;
  }

  @computed
  get sales() {
    return this.paginatedSales.data;
  }
}

const parseInvoiceInput = (invoice: Invoice) => {
  const { partner, ...restInvoice } = invoice;

  const invoiceInput: AddInvoiceInput = {
    ...restInvoice,
    partnerId: invoice.partner.id || 0,
  };

  invoiceInput.items = invoice.items.map((item) => {
    const result = {
      ...item,
      unitId: item.unit ? item.unit.id : undefined,
      warehouseId: item.warehouse ? item.warehouse.id : undefined,
    };

    delete result.unit;
    delete result.warehouse;
    delete result.id;

    return result;
  });

  return invoiceInput;
};

const ItemStoreContext: React.Context<InvoiceStore> = createContext(new InvoiceStore());

export default ItemStoreContext;
