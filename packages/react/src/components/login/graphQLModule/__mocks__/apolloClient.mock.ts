import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client/core';

import { GraphQLQueryResult } from '..';

export const mockedGraphQLUri = 'https://apollo.backend.com';

export function createApolloClientMock(): ApolloClient<GraphQLQueryResult> {
  const link = new HttpLink({
    uri: mockedGraphQLUri,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = 'HEFFEFF';
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }

    return forward(operation);
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authMiddleware, link]),
  });
}
