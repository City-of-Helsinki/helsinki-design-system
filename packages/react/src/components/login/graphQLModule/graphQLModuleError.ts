export type GraphQLModuleErrorType = keyof typeof graphQLModuleError;

export const graphQLModuleError = {
  LOAD_FAILED: 'LOAD_FAILED',
  NO_CLIENT: 'NO_CLIENT',
  NO_API_TOKENS: 'NO_API_TOKENS',
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
    return this.type === graphQLModuleError.LOAD_FAILED;
  }

  get isNoClientError() {
    return this.type === graphQLModuleError.NO_CLIENT;
  }

  get isNoApiTokensError() {
    return this.type === graphQLModuleError.NO_API_TOKENS;
  }
}
