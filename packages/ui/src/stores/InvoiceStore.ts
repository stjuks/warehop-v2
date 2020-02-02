import { observable, computed } from 'mobx';
import { task } from 'mobx-task';
import { createContext } from 'react';
import { Invoice, AddInvoiceInput } from '@shared/types';
import api from '../api';
import { paginatedData } from '../util/helpers';
import { uiStore } from './UIStore';

class InvoiceStore {
    private INVOICE_LIMIT = 5;

    @observable paginatedPurchases = paginatedData<Invoice>();
    @observable paginatedSales = paginatedData<Invoice>();

    @task
    fetchPurchases = async () => {
        uiStore.setLoading(true);
        const purchases = await api.fetchPurchases({
            limit: this.INVOICE_LIMIT
        });
        uiStore.setLoading(false);

        this.paginatedPurchases = purchases;
    };

    @task
    fetchMorePurchases = async () => {
        uiStore.setLoading(true);
        const purchases = await api.fetchPurchases({
            limit: this.INVOICE_LIMIT,
            cursor: this.paginatedPurchases.pageInfo.cursor
        });
        uiStore.setLoading(false);

        this.paginatedPurchases.pageInfo = purchases.pageInfo;
        this.paginatedPurchases.data.push(...purchases.data);
    };

    @task
    fetchSales = async () => {
        const sales = await api.fetchSales({
            limit: this.INVOICE_LIMIT
        });

        this.paginatedSales = sales;
    };

    @task
    fetchMoreSales = async () => {
        const services = await api.fetchSales({
            limit: this.INVOICE_LIMIT,
            cursor: this.paginatedSales.pageInfo.cursor
        });

        this.paginatedSales.pageInfo = services.pageInfo;
        this.paginatedSales.data.push(...services.data);
    };

    @task
    addInvoice = async (invoice: Invoice) => {
        const invoiceInput: AddInvoiceInput = {
            ...invoice,
            partnerId: invoice.partner.id
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
