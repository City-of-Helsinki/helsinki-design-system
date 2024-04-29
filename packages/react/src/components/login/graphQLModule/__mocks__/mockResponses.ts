import { GraphQLQueryResult } from '..';

export const mockResponse: GraphQLQueryResult = {
  data: {
    user: {
      id: 13,
      name: 'Name',
      profile: {
        email: 'email@dot.com',
      },
    },
  },
};
