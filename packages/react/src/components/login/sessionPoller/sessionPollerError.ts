export type SessionPollerErrorType = 'SESSION_ENDED' | 'SESSION_POLLING_FAILED';

export class SessionPollerError extends Error {
  constructor(public message: string, public type: SessionPollerErrorType, public originalError?: Error | null) {
    super(message);
    this.type = type;
    this.originalError = originalError;
  }

  get isSessionEnded() {
    return this.type === 'SESSION_ENDED';
  }

  get isSessionPollingFailure() {
    return this.type === 'SESSION_POLLING_FAILED';
  }
}
