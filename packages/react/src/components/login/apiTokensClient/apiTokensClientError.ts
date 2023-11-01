export type ApiTokensClientErrorType = keyof typeof apiTokensClientError;

export const apiTokensClientError = {
  API_TOKEN_FETCH_FAILED: 'API_TOKEN_FETCH_FAILED',
  INVALID_API_TOKENS: 'INVALID_API_TOKENS',
  INVALID_USER_FOR_API_TOKENS: 'INVALID_USER_FOR_API_TOKENS',
} as const;

export class ApiTokensClientError extends Error {
  constructor(public message: string, public type: ApiTokensClientErrorType, public originalError?: Error | null) {
    super(message);
    this.type = type;
    this.originalError = originalError;
  }

  get isFetchError() {
    return this.type === apiTokensClientError.API_TOKEN_FETCH_FAILED;
  }

  get isInvalidTokensError() {
    return this.type === apiTokensClientError.INVALID_API_TOKENS;
  }

  get isInvalidApiTokensUserError() {
    return this.type === apiTokensClientError.INVALID_USER_FOR_API_TOKENS;
  }
}
