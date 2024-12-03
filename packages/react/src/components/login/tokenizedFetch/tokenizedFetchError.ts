export class TokenizedFetchError extends Error {
  constructor(
    public type: string,
    public originalError?: Error | null,
  ) {
    super('TokenizedFetch failed');
    this.type = type;
    this.originalError = originalError;
  }

  hasTypeMatch(responseType: string) {
    return this.type === responseType;
  }
}
