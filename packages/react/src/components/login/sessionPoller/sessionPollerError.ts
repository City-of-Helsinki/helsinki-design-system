export type SessionPollerErrorType = keyof typeof sessionPollerErrors;

export const sessionPollerErrors = {
  SESSION_ENDED: 'SESSION_ENDED',
  SESSION_POLLING_FAILED: 'SESSION_POLLING_FAILED',
} as const;

export class SessionPollerError extends Error {
  constructor(public message: string, public type: SessionPollerErrorType, public originalError?: Error | null) {
    super(message);
    this.type = type;
    this.originalError = originalError;
  }

  get isSessionEnded() {
    return this.type === sessionPollerErrors.SESSION_ENDED;
  }

  get isSessionPollingFailure() {
    return this.type === sessionPollerErrors.SESSION_POLLING_FAILED;
  }
}
