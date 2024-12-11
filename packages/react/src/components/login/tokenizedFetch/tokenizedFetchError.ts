export class TokenizedFetchError extends Error {
  constructor(
    public identifier: string,
    public originalError?: Error | null,
  ) {
    super('TokenizedFetch failed');
    this.identifier = identifier;
    this.originalError = originalError;
  }

  hasResponseIdentifierMatch(responseIdentifier: string) {
    return this.identifier === responseIdentifier;
  }
}
