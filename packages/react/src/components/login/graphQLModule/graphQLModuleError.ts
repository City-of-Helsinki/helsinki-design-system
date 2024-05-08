export type GraphQLModuleErrorType = keyof typeof graphQLModuleError;

export const graphQLModuleError = {
  GRAPHQL_LOAD_FAILED: 'GRAPHQL_LOAD_FAILED',
  GRAPHQL_NO_CLIENT: 'GRAPHQL_NO_CLIENT',
  GRAPHQL_NO_API_TOKENS: 'GRAPHQL_NO_API_TOKENS',
} as const;

export class GraphQLModuleError extends Error {
  constructor(
    public message: string,
    public type: GraphQLModuleErrorType,
    public originalError?: Error | null,
  ) {
    super(message);
    this.type = type;
    this.originalError = originalError;
  }

  get isLoadError() {
    return this.type === graphQLModuleError.GRAPHQL_LOAD_FAILED;
  }

  get isNoClientError() {
    return this.type === graphQLModuleError.GRAPHQL_NO_CLIENT;
  }

  get isNoApiTokensError() {
    return this.type === graphQLModuleError.GRAPHQL_NO_API_TOKENS;
  }
}
