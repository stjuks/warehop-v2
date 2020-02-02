import { gql } from 'apollo-boost';
import { query, mutate } from '.';
import { Invoice, PaginatedData, AddInvoiceInput } from '@shared/types';

const invoiceSchema = `
    id
    partner {
        id
        name
    }
    type
    number
    dueDate
    issueDate
    items {
        id
        type
        name
        quantity
        price
        unit {
            id
            name
            abbreviation
        }
        ... on ProductInvoiceItem {
            code
            warehouse {
                id
                name
            }
        }
    }
    transactions {
        id
        sum
        date
        description
    }
    isPaid
    paidSum
    sum
    description
    filePath
`;

const invoiceListSchema = `
    pageInfo {
        hasNextPage
        cursor
    }
    data {
        ${invoiceSchema}
    }
`;

const FETCH_PURCHASES = gql`
    query purchases($limit: Int!, $cursor: String) {
        purchases(pagination: { limit: $limit, cursor: $cursor }) {
            ${invoiceListSchema}
        }
    }
`;

const FETCH_SALES = gql`
    query sales($limit: Int!, $cursor: String) {
        sales(pagination: { limit: $limit, cursor: $cursor }) {
            ${invoiceListSchema}
        }
    }
`;

const FETCH_INVOICE = gql`
    query invoice($id: ID!) {
        invoice(id: $id) {
            ${invoiceSchema}
        }
    }
`;

const ADD_INVOICE = gql`
    mutation addInvoice(
        $partnerId: ID!
        $type: InvoiceType!
        $number: String!
        $items: [InvoiceItemInput!]!
        $dueDate: Date!
        $issueDate: Date!
        $description: String
    ) {
        addInvoice(
            invoice: {
                partnerId: $partnerId
                type: $type
                number: $number
                items: $items
                dueDate: $dueDate
                issueDate: $issueDate
                description: $description
            }
        )
    }
`;

export default {
    fetchPurchases: async (variables: { limit: number; cursor?: string }) => {
        return await query<PaginatedData<Invoice>>({ query: FETCH_PURCHASES, variables });
    },
    fetchSales: async (variables: { limit: number; cursor?: string }) =>
        await query<PaginatedData<Invoice>>({ query: FETCH_SALES, variables }),
    fetchInvoice: async (id: number) => await query<Invoice>({ query: FETCH_INVOICE, variables: { id }}),
    addInvoice: async (invoice: AddInvoiceInput) => await mutate<number>({ mutation: ADD_INVOICE, variables: invoice })
};
