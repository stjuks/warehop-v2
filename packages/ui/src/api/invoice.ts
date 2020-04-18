import { gql } from 'apollo-boost-upload';
import axios, { AxiosRequestConfig } from 'axios';
import { Invoice, PaginatedData, InvoiceType, AddInvoiceInput } from '@shared/types';
import Query from './Query';
import Mutation from './Mutation';
import { JWT_ACCESS_TOKEN, API_URL } from '@ui/util/constants';

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

export const FETCH_INVOICE = new Query({
  query: `
    query invoice($id: ID!) {
      invoice(id: $id) {
        ${invoiceSchema}
      }
    }
  `,
  transformResult: (result) => result.invoice,
});

const FETCH_INVOICES = (type: InvoiceType) => {
  const name = type === 'PURCHASE' ? 'purchases' : 'sales';

  return new Query({
    query: `
      query ${name}(${searchInputArgTypes}) {
        ${name}(filter: { ${searchInputArgs} }) {
          ${invoiceListSchema}
        }
      }
  `,
    transformResult: (result) => (result ? result[name] : result),
    onFetchMore: (oldData, newData) => {
      return {
        [name]: {
          ...newData,
          data: [...oldData.data, ...newData.data],
        },
      };
    },
    fetchMoreOptions: (data, variables) => ({
      variables: {
        ...variables,
        pagination: { ...variables.pagination, cursor: data.pageInfo.cursor },
      },
    }),
  });
};

export const FETCH_PURCHASES = FETCH_INVOICES('PURCHASE');
export const FETCH_SALES = FETCH_INVOICES('SALE');

export const ADD_INVOICE = new Mutation({
  mutation: `
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
  `,
  onMutate: ({ client }) => client?.cache.reset(),
});

export const EDIT_INVOICE = new Mutation({
  mutation: `
    mutation editInvoice($id: ID!, $invoice: InvoiceInput!) {
      editInvoice(id: $id, invoice: $invoice) {
        id
      }
    }
  `,
  onMutate: ({ client, result, customValues }) => {
    if (client && result && customValues) {
      const { id } = result.data.editInvoice;
      const cacheValue = client.readQuery({ query: FETCH_INVOICE.query, variables: { id } });

      const newValue = {
        invoice: {
          id,
          ...cacheValue.invoice,
          ...customValues,
        },
      };

      client.writeQuery({
        query: FETCH_INVOICE.query,
        variables: { id },
        data: newValue,
      });
    }
  },
});

export const DELETE_INVOICE = new Mutation({
  mutation: `
    mutation deleteInvoice($id: ID!) {
      deleteInvoice(id: $id) {
        id
      }
    }
  `,
  onMutate: ({ client }) => {
    client?.cache.reset();
  },
});

export const LOCK_INVOICE = new Mutation({
  mutation: `
    mutation lockInvoice($id: ID!) {
      lockInvoice(id: $id) {
        id
        isLocked
      }
    }
  `,
});

export const UNLOCK_INVOICE = new Mutation({
  mutation: `
    mutation unlockInvoice($id: ID!) {
      unlockInvoice(id: $id) {
        id
        isLocked
      }
    }
  `,
});

export const downloadInvoice = async (invoice: Invoice) => {
  try {
    if (invoice) {
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${JWT_ACCESS_TOKEN}`,
        },
        params: {
          invoiceId: invoice.id,
        },
        responseType: 'arraybuffer',
      };

      const file = await axios.get(`${API_URL}/rest/files/invoice`, config);

      if (file) {
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
    }
  } catch (err) {
    throw err;
  }
};

const errorMessageHandler = {
  EntityAlreadyExistsError: {
    number: 'Sellise numbriga arve juba eksisteerib.',
  },
};

/* export default {
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
        Authorization: `Bearer ${JWT_ACCESS_TOKEN}`,
      },
      params: {
        invoiceId,
      },
      responseType: 'arraybuffer',
    };

    return await axios.get(`${API_URL}/rest/files/invoice`, config);
  },
  lockInvoice: async (id: number) =>
    await mutate<boolean>({ mutation: LOCK_INVOICE, variables: { id } }),
  unlockInvoice: async (id: number) =>
    await mutate<boolean>({ mutation: UNLOCK_INVOICE, variables: { id } }),
}; */
