export type ApiTokensClientErrorType = 'API_TOKEN_FETCH_FAILED' | 'INVALID_API_TOKENS' | 'INVALID_USER_FOR_API_TOKENS';

export class ApiTokensClientError extends Error {
  constructor(public message: string, public type: ApiTokensClientErrorType, public originalError?: Error | null) {
    super(message);
    this.type = type;
    this.originalError = originalError;
  }

  get isFetchError() {
    return this.type === 'API_TOKEN_FETCH_FAILED';
  }

  get isInvalidTokensError() {
    return this.type === 'INVALID_API_TOKENS';
  }

  get isInvalidApiTokensUserError() {
    return this.type === 'INVALID_USER_FOR_API_TOKENS';
  }
}
