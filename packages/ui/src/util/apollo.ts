import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-boost-upload';
import { API_URL, JWT_ACCESS_TOKEN } from './constants';

const apollo = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: {
        __schema: {
          types: []
        }
      }
    })
  }),
  request: operation => {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${JWT_ACCESS_TOKEN}`
      }
    });
  },
});

export default apollo;
