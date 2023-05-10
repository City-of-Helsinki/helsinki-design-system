export type OidcClientErrorType = 'INVALID_OR_EXPIRED_USER' | 'SIGNIN_ERROR' | 'RENEWAL_FAILED';

export class OidcClientError extends Error {
  constructor(public message: string, public type: OidcClientErrorType, public originalError?: Error | null) {
    super(message);
    this.type = type;
    this.originalError = originalError;
  }

  get isInvalidUserError() {
    return this.type === 'INVALID_OR_EXPIRED_USER';
  }

  get isSignInError() {
    return this.type === 'SIGNIN_ERROR';
  }

  get isRenewalError() {
    return this.type === 'RENEWAL_FAILED';
  }
}
