export type OidcClientErrorType = 'INVALID_OR_EXPIRED_USER';

export class OidcClientError extends Error {
  constructor(public message: string, public type: OidcClientErrorType, public originalError?: Error | null) {
    super(message);
    this.type = type;
    this.originalError = originalError;
  }

  get isInvalidUserError() {
    return this.type === 'INVALID_OR_EXPIRED_USER';
  }
}
