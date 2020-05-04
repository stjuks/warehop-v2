import Query from './Query';
import Mutation from './Mutation';

export const ADD_UNIT = new Mutation({
  mutation: `
    mutation addUnit($name: String!, $abbreviation: String!) {
      addUnit(name: $name, abbreviation: $abbreviation) {
        id
        name
        abbreviation
      }
    }
  `,
  onMutate: ({ client, result }) => {
    const cacheValue = client?.readQuery({ query: FETCH_UNITS.query });

    const newValue = {
      units: [...cacheValue.units, result.data.addUnit],
    };

    client?.writeQuery({
      query: FETCH_UNITS.query,
      data: newValue,
    });
  },
  errorHandler: {
    EntityAlreadyExistsError: {
      name: 'Sellise nimega ühik juba eksisteerib',
      abbreviation: 'Sellise lühendiga ühik juba eksisteerib.',
    },
  },
});

export const DELETE_UNIT = new Mutation({
  mutation: `
    mutation deleteUnit($id: ID!) {
      deleteUnit(id: $id)
    }
  `,
  errorHandler: {
    DeletionRestrictedError: {
      Items: 'Ühikut ei saa kustutada, kuna see on kaubaga seotud.',
    },
  },
});

export const EDIT_UNIT = new Mutation({
  mutation: `
    mutation editUnit($id: ID!, $name: String, $abbreviation: String) {
      editUnit(id: $id, name: $name, abbreviation: $abbreviation) {
        id
        name
        abbreviation
      }
    }
  `,
  errorHandler: {
    EntityAlreadyExistsError: {
      name: 'Sellise nimega ühik juba eksisteerib',
      abbreviation: 'Sellise lühendiga ühik juba eksisteerib.',
    },
  },
});

export const FETCH_UNITS = new Query({
  query: `
    query units {
      units {
        id
        name
        abbreviation
      }
    }
  `,
  transformResult: (result) => result.units,
});

export const FETCH_TYPES = new Query({
  query: `
    query types {
      types {
        itemTypes
        partnerTypes
        invoiceTypes
      }
    }
  `,
  transformResult: (result) => result.types,
});
