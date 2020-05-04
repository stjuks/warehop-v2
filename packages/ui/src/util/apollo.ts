import ApolloClient, {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  defaultDataIdFromObject,
} from 'apollo-boost-upload';
import { API_URL, JWT_ACCESS_TOKEN } from './constants';
import { ProductItem, WarehouseQuantity } from '@shared/types';

const apollo = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: {
        __schema: {
          types: [],
        },
      },
    }),
    dataIdFromObject: (object: any) => {
      switch (object.__typename) {
        case 'ProductItem': {
          const o: ProductItem = object;
          return `${o.id} ${o.warehouseQuantity.reduce((acc, curr) => acc + curr.quantity, 0)}`;
        }
        case 'WarehouseQuantity': {
          const o: WarehouseQuantity = object;
          return `${o.id} ${o.quantity}`;
        }
        default:
          return defaultDataIdFromObject(object);
      }
    },
  }),
  request: (operation) => {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${JWT_ACCESS_TOKEN}`,
      },
    });
  },
});

export default apollo;
