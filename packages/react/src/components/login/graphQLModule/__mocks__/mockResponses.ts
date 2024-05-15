const mockResponse = {
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

export const createQueryResponse = (overrides: Record<string, unknown> = {}) => {
  return {
    data: {
      user: {
        ...mockResponse.data.user,
        ...overrides,
      },
    },
  };
};

export const createQueryResponseWithErrors = (overrides: Record<string, unknown> = {}) => {
  return {
    ...createQueryResponse(overrides),
    errors: [new Error('error1')],
  };
};
