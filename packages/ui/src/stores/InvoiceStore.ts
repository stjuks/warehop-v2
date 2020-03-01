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
    uiStore.setLoading(true);

    const safeFilter = filter || {};

    const purchases = await api.fetchPurchases({
      ...safeFilter,
      pagination: { limit: this.INVOICE_LIMIT }
    });

    uiStore.setLoading(false);

    this.paginatedPurchases = purchases;
  };

  @task
  fetchMorePurchases = async (filter?: InvoiceSearchInput) => {
    uiStore.setLoading(true);

    const safeFilter = filter || {};

    const purchases = await api.fetchPurchases({
      ...safeFilter,
      pagination: { cursor: this.paginatedPurchases.pageInfo.cursor, limit: this.INVOICE_LIMIT }
    });

    uiStore.setLoading(false);

    this.paginatedPurchases.pageInfo = purchases.pageInfo;
    this.paginatedPurchases.data.push(...purchases.data);
  };

  @task
  fetchSales = async (filter: InvoiceSearchInput) => {
    uiStore.setLoading(true);

    const safeFilter = filter || {};

    const sales = await api.fetchSales({
      ...filter,
      pagination: { limit: this.INVOICE_LIMIT }
    });

    uiStore.setLoading(false);

    this.paginatedSales = sales;
  };

  @task
  fetchMoreSales = async (filter: InvoiceSearchInput) => {
    const services = await api.fetchSales({
      ...filter,
      pagination: { cursor: this.paginatedSales.pageInfo.cursor, limit: this.INVOICE_LIMIT }
    });

    this.paginatedSales.pageInfo = services.pageInfo;
    this.paginatedSales.data.push(...services.data);
  };

  @task
  addInvoice = async (invoice: Invoice) => {
    const invoiceInput: AddInvoiceInput = {
      ...invoice,
      partnerId: invoice.partner.id || 0
    };

    invoiceInput.items = invoice.items.map(item => {
      const result = {
        ...item,
        unitId: item.unit ? item.unit.id : undefined,
        warehouseId: item.warehouse ? item.warehouse.id : undefined
      };

      delete result.unit;
      delete result.warehouse;

      return result;
    });

    try {
      await api.addInvoice(invoiceInput);
    } catch (err) {
      throw err;
    }
  };

  @task
  fetchInvoice = async (id: number) => {
    try {
      const invoice: Invoice = await api.fetchInvoice(id);

      return invoice;
    } catch (err) {
      throw err;
    }
  };

  @task
  downloadInvoice = async (invoiceId: number) => {
    try {
      const file = await api.downloadInvoice(invoiceId);

      const pdf = new Blob([file.data], { type: 'application/pdf' });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(pdf);
        return;
      }

      const data = window.URL.createObjectURL(pdf);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'Arve';
      link.click();
    } catch (err) {
      throw err;
    }
  };

  @task
  lockInvoice = async (invoiceId?: number) => {
    try {
      if (invoiceId) await api.lockInvoice(invoiceId);
    } catch (err) {
      throw err;
    }
  };

  @task
  unlockInvoice = async (invoiceId?: number) => {
    try {
      if (invoiceId) await api.unlockInvoice(invoiceId);
    } catch (err) {
      throw err;
    }
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

const ItemStoreContext: React.Context<InvoiceStore> = createContext(new InvoiceStore());

export default ItemStoreContext;
