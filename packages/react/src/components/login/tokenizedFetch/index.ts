import { TokenData } from '../apiTokensClient';
import { ApiTokenClientTracker } from '../apiTokensClient/createApiTokenClientTracker';
import { ApolloClientModuleProps } from '../apolloClient/index';
import { ConnectedModule } from '../beacon/beacon';
import { appendAbortSignal, isAbortError } from '../utils/abortFetch';

export type HeaderContent = Headers | Record<string, string>;
export type FetchParameters = Parameters<typeof fetch>;
export type FetchReturnType = ReturnType<typeof fetch>;

export type TokenizedFetchModule = ConnectedModule & {
  /**
   * Proxy to native fetch() function. Headers returned from the optional tokenSetter are appended to the Headers passed as args.
   */
  tokenizedFetch: (...args: FetchParameters) => FetchReturnType;
  /**
   * Calls the tokenizedFetch, but also emits start and end signals.
   * If fetch fails, an error signal is emitted. Aborted requests are emitted as event signals.
   * Abort and start signals can be distinguished from actual response signal with the signal.payload.data.
   * The data includes boolean property "wasFetchAborted" or "wasFetchStarted" if the signal is either.
   * Simplest way to check signals, is to use functions "isTokenizedFetchStartedSignal(signal)" or "isTokenizedFetchAbortedSignal(signal)".
   * Signals can also be manually emitted with "emitResponse(promise.then(resp=>resp.json()))" and "emitFetchStart()" functions.
   * Automatic response handling uses response.json() to parse response from data.
   * If the data is not json, do not use automation. Use "emitResponse(promise.then(<your parse function>))".
   */
  tokenizedFetchWithSignals: (autoEmitSignalType: string, ...args: FetchParameters) => FetchReturnType;
  /**
   * Returns the apiTokenClient tracker.
   */
  getTracker: () => ApiTokenClientTracker;
  /**
   * Emits reset signal and resets the apiTokenTracker.
   */
  reset: () => void;
  /**
   * Utility to test was the returned error an AbortError.
   */
  isAbortError: typeof isAbortError;
  /**
   * The promise returned from tokenizedFetch can be passed to this function
   * which will emit the results as event signals or error signals. When successful the emitted signal is
   * {
   *    type: eventSignalType,
   *    payload: {
   *        data: Response,
   *        type: responseSignalType
   *    },
   *    nameSpace: tokenizedFetchModuleNamespace,
   *    context:tokenizedFetchModule
   * }
   * Aborted fetches are emitted also as event signals where payload.type = ${responseSignalType}_ABORTED.
   * Failed fetches are emitted also as error signals.
   *
   * Example: const results = tokenizedFetchModule.emitResponse(tokenizedFetchModule.fetch().then(resp=>resp.json()));
   */
  emitResponse: (promise: Promise<Response>, responseSignalType: string) => Promise<Response>;
  /**
   * Emit signal where payload.type = ${responseSignalType}_STARTED.
   */
  emitFetchStart: (responseSignalType: string) => void;
  /**
   * Adds abort signal to FetchInit props and returns a function that will abort the request.
   */
  addAbortSignal: typeof appendAbortSignal;
};

// EMIT STATE CHANGES!
export type TokenizedFetchModuleProps = Omit<ApolloClientModuleProps, 'clientOptions' | 'tokenSetter'> & {
  /**
   * If true, the tokenizedFetch() will wait for possible api token renewal to end.
   * If false, there might be times when queries are made with old api tokens. Unlikely, but possible.
   * Default true.
   */
  preventQueriesWhileRenewing?: boolean;
  /**
   * Function to return tokens appended to the headers
   * @param headers Current headers in the request
   * @param tokens All tokens from the apiTokenClient
   */
  tokenSetter?: (headers: HeaderContent, tokens: TokenData) => HeaderContent;
};

export const tokenizedFetchModuleEvents = {
  TOKENIZED_FETCH_MODULE_RESET: 'TOKENIZED_FETCH_MODULE_RESET',
} as const;

export type TokenizedFetchModuleEvent = keyof typeof tokenizedFetchModuleEvents;

export const tokenizedFetchModuleNamespace = 'tokenizedFetch';

export const defaultOptions: Partial<TokenizedFetchModuleProps> = {
  preventQueriesWhileRenewing: true,
};
