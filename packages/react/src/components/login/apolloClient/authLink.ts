import { ApolloLink } from '@apollo/client/core';

import { TokenSetter } from '.';
import { TokenData } from '../apiTokensClient';

export function createAuthLink(tokenSetter: TokenSetter, tokenGetter: () => TokenData): ApolloLink {
  return new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => {
      const authHeaders = tokenSetter(headers, tokenGetter());
      return {
        headers: {
          ...headers,
          ...authHeaders,
        },
      };
    });
    return forward(operation);
  });
}
