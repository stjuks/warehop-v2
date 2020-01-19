import { gql } from 'apollo-boost';
import { query, mutate } from '.';
import { Unit, Invoice, PaginatedData } from 'shared/types';
import { AddInvoiceInput } from 'shared/inputTypes';

const invoiceSchema = `
    pageInfo {
        hasNextPage
        cursor
    }
    data {
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
    }
`;

const FETCH_PURCHASES = gql`
    query purchases($limit: Int!, $cursor: String) {
        purchases(pagination: { limit: $limit, cursor: $cursor }) {
            ${invoiceSchema}
        }
    }
`;

const FETCH_SALES = gql`
    query sales($limit: Int!, $cursor: String) {
        sales(pagination: { limit: $limit, cursor: $cursor }) {
            ${invoiceSchema}
        }
    }
`;

const ADD_INVOICE = gql`
    query addInvoice(
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
    fetchPurchases: async (variables: { limit: number; cursor?: string }) =>
        await query<PaginatedData<Invoice>>({ query: FETCH_PURCHASES, variables }),
    fetchSales: async (variables: { limit: number; cursor?: string }) =>
        await query<PaginatedData<Invoice>>({ query: FETCH_SALES, variables }),
    addInvoice: async (invoice: AddInvoiceInput) => await mutate<number>({ mutation: ADD_INVOICE, variables: invoice })
};
