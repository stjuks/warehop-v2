import { gql } from 'apollo-boost-upload';
import axios, { AxiosRequestConfig } from 'axios';
import { query, mutate } from '.';
import { Invoice, PaginatedData, AddInvoiceInput, InvoiceSearchInput } from '@shared/types';
import { API_URL, JWT_ACCESS_TOKEN } from '@ui/util/constants';

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
    isLocked
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
    $isLocked: Boolean
`;

const searchInputArgs = `
    pagination: $pagination, 
    number: $number, 
    isPaid: $isPaid, 
    description: $description, 
    partnerName: $partnerName, 
    generalQuery: $generalQuery
    isLocked: $isLocked
`;

export const FETCH_PURCHASES = gql`
    query purchases(${searchInputArgTypes}) {
        purchases(filter: { ${searchInputArgs} }) {
            ${invoiceListSchema}
        }
    }
`;

export const FETCH_SALES = gql`
    query sales(${searchInputArgTypes}) {
        sales(filter: { ${searchInputArgs} }) {
            ${invoiceListSchema}
        }
    }
`;

export const FETCH_INVOICE = gql`
    query invoice($id: ID!) {
        invoice(id: $id) {
            ${invoiceSchema}
        }
    }
`;

export const ADD_INVOICE = gql`
  mutation addInvoice(
    $partnerId: ID!
    $type: InvoiceType!
    $number: String!
    $items: [InvoiceItemInput!]!
    $dueDate: Date!
    $issueDate: Date!
    $description: String
    $file: Upload
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
        file: $file
      }
    )
  }
`;

export const EDIT_INVOICE = gql`
  mutation editInvoice($id: ID!, $invoice: InvoiceInput!) {
    editInvoice(id: $id, invoice: $invoice)
  }
`;

export const DELETE_INVOICE = gql`
  mutation deleteInvoice($id: ID!) {
    deleteInvoice(id: $id)
  }
`;

export const LOCK_INVOICE = gql`
  mutation lockInvoice($id: ID!) {
    lockInvoice(id: $id)
  }
`;

export const UNLOCK_INVOICE = gql`
  mutation unlockInvoice($id: ID!) {
    unlockInvoice(id: $id)
  }
`;

const errorMessageHandler = {
  EntityAlreadyExistsError: {
    number: 'Sellise numbriga arve juba eksisteerib.'
  }
};

export default {
  fetchPurchases: async (variables: InvoiceSearchInput) =>
    await query<PaginatedData<Invoice>>({ query: FETCH_PURCHASES, variables }),
  fetchSales: async (variables: InvoiceSearchInput) =>
    await query<PaginatedData<Invoice>>({ query: FETCH_SALES, variables }),
  fetchInvoice: async (id: number) =>
    await query<Invoice>({ query: FETCH_INVOICE, variables: { id } }),
  addInvoice: async (invoice: AddInvoiceInput) =>
    await mutate<number>({ mutation: ADD_INVOICE, variables: invoice }, { errorMessageHandler }),
  editInvoice: async (id: number, invoice: AddInvoiceInput) =>
    await mutate<boolean>(
      { mutation: EDIT_INVOICE, variables: { id, invoice } },
      { errorMessageHandler: { TriggerExceptionError: 'Lukustatud arvet ei saa muuta.' } }
    ),
  deleteInvoice: async (id: number) =>
    await mutate<boolean>(
      { mutation: DELETE_INVOICE, variables: { id } },
      { errorMessageHandler: { TriggerExceptionError: 'Lukustatud arvet ei saa kustutada.' } }
    ),
  downloadInvoice: async (invoiceId: number) => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${JWT_ACCESS_TOKEN}`
      },
      params: {
        invoiceId
      },
      responseType: 'arraybuffer'
    };

    return await axios.get(`${API_URL}/rest/files/invoice`, config);
  },
  lockInvoice: async (id: number) =>
    await mutate<boolean>({ mutation: LOCK_INVOICE, variables: { id } }),
  unlockInvoice: async (id: number) =>
    await mutate<boolean>({ mutation: UNLOCK_INVOICE, variables: { id } })
};
