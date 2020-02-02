import { gql } from 'apollo-boost';
import { query, mutate } from '.';
import { Invoice, PaginatedData, AddInvoiceInput, InvoiceSearchInput } from '@shared/types';

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

const searchInputArgTypes = `
    $pagination: PaginatedQueryInput, 
    $number: String, 
    $isPaid: Boolean, 
    $description: String, 
    $partnerName: String, 
    $generalQuery: String
`;

const searchInputArgs = `
    pagination: $pagination, 
    number: $number, 
    isPaid: $isPaid, 
    description: $description, 
    partnerName: $partnerName, 
    generalQuery: $generalQuery
`;

const FETCH_PURCHASES = gql`
    query purchases(${searchInputArgTypes}) {
        purchases(filter: { ${searchInputArgs} }) {
            ${invoiceListSchema}
        }
    }
`;

const FETCH_SALES = gql`
    query sales(${searchInputArgTypes}) {
        sales(filter: { ${searchInputArgs} }) {
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
    fetchPurchases: async (variables: InvoiceSearchInput) =>
        await query<PaginatedData<Invoice>>({ query: FETCH_PURCHASES, variables }),
    fetchSales: async (variables: InvoiceSearchInput) =>
        await query<PaginatedData<Invoice>>({ query: FETCH_SALES, variables }),
    fetchInvoice: async (id: number) => await query<Invoice>({ query: FETCH_INVOICE, variables: { id } }),
    addInvoice: async (invoice: AddInvoiceInput) => await mutate<number>({ mutation: ADD_INVOICE, variables: invoice })
};
