import { observable, action, flow, computed } from 'mobx';
import { task } from 'mobx-task';
import { createContext } from 'react';
import { ProductItem, ExpenseItem, PaginatedData, Invoice } from 'shared/types';
import api from '../api';
import { paginatedData } from '../util/helpers';
import { AddInvoiceInput } from 'shared/inputTypes';

class InvoiceStore {
    private INVOICE_LIMIT = 10;

    @observable paginatedPurchases = paginatedData<Invoice>();
    @observable paginatedSales = paginatedData<Invoice>();

    @task
    fetchPurchases = async () => {
        const purchases = await api.fetchPurchases({
            limit: this.INVOICE_LIMIT
        });

        this.paginatedPurchases = purchases;
    };

    @task
    fetchMorePurchases = async () => {
        const purchases = await api.fetchPurchases({
            limit: this.INVOICE_LIMIT,
            cursor: this.paginatedPurchases.pageInfo.cursor
        });

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
            const id = await api.addInvoice(invoiceInput);

            invoice.id = id;

            if (invoice.type === 'PURCHASE') this.paginatedPurchases.data.push(invoice);
            if (invoice.type === 'SALE') this.paginatedSales.data.push(invoice);
        } catch (err) {
            console.error(err);
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
