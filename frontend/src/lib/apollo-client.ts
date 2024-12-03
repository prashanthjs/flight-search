import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:4200/graphql',
  cache: new InMemoryCache(),
});
