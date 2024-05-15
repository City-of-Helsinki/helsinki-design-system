import { GraphQLQueryResult } from '..';

const mockResponse: GraphQLQueryResult = {
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

export const createQueryResponse = (overrides: typeof mockResponse = {}) => {
  return {
    ...mockResponse,
    ...overrides,
  };
};
