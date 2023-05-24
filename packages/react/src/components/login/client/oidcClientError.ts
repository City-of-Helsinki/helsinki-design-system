export type OidcClientErrorType = keyof typeof oidcClientErrors;
export const oidcClientErrors = {
  INVALID_OR_EXPIRED_USER: 'INVALID_OR_EXPIRED_USER',
  SIGNIN_ERROR: 'SIGNIN_ERROR',
  RENEWAL_FAILED: 'RENEWAL_FAILED',
} as const;

export class OidcClientError extends Error {
  constructor(public message: string, public type: OidcClientErrorType, public originalError?: Error | null) {
    super(message);
    this.type = type;
    this.originalError = originalError;
  }

  get isInvalidUserError() {
    return this.type === oidcClientErrors.INVALID_OR_EXPIRED_USER;
  }

  get isSignInError() {
    return this.type === oidcClientErrors.SIGNIN_ERROR;
  }

  get isRenewalError() {
    return this.type === oidcClientErrors.RENEWAL_FAILED;
  }
}
