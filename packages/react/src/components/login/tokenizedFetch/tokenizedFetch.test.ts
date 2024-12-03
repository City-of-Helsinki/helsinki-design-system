import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';

import { Beacon, createBeacon } from '../beacon/beacon';
import { emitInitializationSignals, EventPayload, eventSignalType } from '../beacon/signals';
import { createControlledFetchMockUtil, getLastFetchMockCallArguments } from '../testUtils/fetchMockTestUtil';
import { apiTokensClientEvents, apiTokensClientNamespace, TokenData } from '../apiTokensClient';
import { advanceUntilPromiseResolved } from '../testUtils/timerTestUtil';
import { getLastMockCallArgs } from '../../../utils/testHelpers';
import { mergeHeaders, createTokenizedFetchModule } from './tokenizedFetch';
import { TokenizedFetchModule, tokenizedFetchModuleNamespace, TokenizedFetchModuleProps } from '.';
import { createApiTokenClient } from '../apiTokensClient/apiTokensClient';
import {
  createConnectedBeaconModule,
  createTestListenerModule,
  getReceivedErrorSignalPayloads,
  getReceivedEventSignalPayloads,
} from '../testUtils/beaconTestUtil';
import HttpStatusCode from '../../../utils/httpStatusCode';
import {
  createAbortSignalData,
  createStartSignalData,
  createTriggerPropsForAllTokenizedFetchSignals,
  createTriggerPropsForTokenizedFetchResponseSignals,
  isTokenizedFetchAbortedSignal,
  isTokenizedFetchStartedSignal,
  triggerForAllTokenizedFetchErrors,
} from './signals';

type ResponseType = { status: HttpStatusCode; data?: unknown | null; error?: Error };

describe(`tokenizedFetchModule`, () => {
  const defaultApiTokens: TokenData = { token1: 'token1Value', token2: 'token2Value' };
  const uri = '/query';
  const {
    cleanUp,
    setResponders,
    addResponse,
    getResponseListenerCallCount,
    getRequestCount,
    waitUntilRequestStarted,
  } = createControlledFetchMockUtil([{ path: uri }]);

  let currentModule: TokenizedFetchModule;
  let currentBeacon: Beacon;
  let apiTokenStorage: TokenData | null = null;
  let listenerModule: ReturnType<typeof createConnectedBeaconModule>;

  const getLastQueryHeaders = () => {
    return getLastFetchMockCallArguments()[1].headers;
  };

  const createTokenSetter = (extraParams?: TokenData): TokenizedFetchModuleProps['tokenSetter'] => {
    return jest.fn().mockImplementation((headers, tokens) => {
      return {
        ...tokens,
        ...extraParams,
      };
    });
  };

  // @ts-ignore is for complaints about Object.fromEntries
  const headersToObject = (headers: Headers) => Object.fromEntries(headers);

  const initTests = ({
    apiTokens,
    moduleOptions = {},
    responses,
  }: {
    apiTokens?: TokenData;
    moduleOptions?: Partial<TokenizedFetchModuleProps>;
    responses?: ResponseType[];
  }) => {
    if (!responses) {
      addResponse({ status: HttpStatusCode.OK, body: JSON.stringify({ response: 'good' }) });
    } else {
      responses.forEach((response) => {
        addResponse(
          response.error || {
            status: response.status,
            body: response.data ? JSON.stringify(response.data) : undefined,
          },
        );
      });
    }

    currentModule = createTokenizedFetchModule(moduleOptions);
    apiTokenStorage = apiTokens || defaultApiTokens;
    const apiTokensClient = createApiTokenClient({ url: '/does-not-matter' });
    jest.spyOn(apiTokensClient, 'getTokens').mockImplementation(() => {
      return apiTokenStorage;
    });
    listenerModule = createTestListenerModule('*', 'listenerModule');
    currentBeacon = createBeacon();
    currentBeacon.addSignalContext(apiTokensClient);
    currentBeacon.addSignalContext(currentModule);
    currentBeacon.addSignalContext(listenerModule);

    // initialize all modules
    emitInitializationSignals(currentBeacon);
  };

  // helpers for emitting api token signals
  const emitApiTokensClientStateChange = (payload: EventPayload) => {
    currentBeacon.emit({ type: eventSignalType, namespace: apiTokensClientNamespace, payload });
  };

  const emitApiTokensUpdatedStateChange = (tokens: TokenData) => {
    apiTokenStorage = tokens;
    const payload: EventPayload = { type: apiTokensClientEvents.API_TOKENS_UPDATED, data: tokens };
    emitApiTokensClientStateChange(payload);
  };

  const emitApiTokensRemovedStateChange = () => {
    apiTokenStorage = null;
    const payload: EventPayload = { type: apiTokensClientEvents.API_TOKENS_REMOVED };
    emitApiTokensClientStateChange(payload);
  };

  const emitApiTokensRenewalStart = () => {
    apiTokenStorage = null;
    const payload: EventPayload = { type: apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED };
    emitApiTokensClientStateChange(payload);
  };

  beforeAll(() => {
    enableFetchMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    setResponders([{ path: uri }]);
  });

  afterEach(async () => {
    jest.advanceTimersByTime(100000);
    if (currentModule) {
      const promise = currentModule.getTracker().waitForApiTokens();
      await advanceUntilPromiseResolved(promise);
      currentModule.reset();
    }
    await cleanUp();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    if (currentBeacon) {
      currentBeacon.clear();
    }
    apiTokenStorage = null;
  });

  afterAll(() => {
    disableFetchMocks();
  });
  describe(`mergeHeaders`, () => {
    it('Returns a Header instance if first param is a Header instance', async () => {
      const originalHeaders = { key1: 'value2', smallCaps: '1' };
      const headerObj = { key2: 'value2', anotherKey: '1', 'x-auth': 'auth' };
      const headers = new Headers(originalHeaders);
      expect(headersToObject(mergeHeaders(headers, headerObj) as Headers)).toEqual({
        key1: 'value2',
        smallcaps: '1',
        key2: 'value2',
        anotherkey: '1',
        'x-auth': 'auth',
      });
      expect(mergeHeaders(headers, headerObj) instanceof Headers).toBeTruthy();
    });
    it('Returns an object if first param is an object', async () => {
      const originalHeaders = { key1: 'value2', notSmallCaps: '1' };
      const headerObj = { key2: 'value2', anotherKey: '1', 'x-auth': 'auth' };
      expect(mergeHeaders(originalHeaders, headerObj)).toEqual({
        key1: 'value2',
        notSmallCaps: '1',
        key2: 'value2',
        anotherKey: '1',
        'x-auth': 'auth',
      });
      expect(mergeHeaders(originalHeaders, headerObj) instanceof Headers).toBeFalsy();

      const headers = new Headers(headerObj);
      expect(mergeHeaders(originalHeaders, headers)).toEqual({
        key1: 'value2',
        notSmallCaps: '1',
        key2: 'value2',
        anotherKey: '1',
        'x-auth': 'auth',
      });
      expect(mergeHeaders(originalHeaders, headers) instanceof Headers).toBeFalsy();
    });
  });
  describe(`When created`, () => {
    it('The module is created and current tokens exist in the tracker.', async () => {
      initTests({});
      expect(currentModule.getTracker().getTokens()).toMatchObject(defaultApiTokens);
    });
  });
  describe(`tokenSetter`, () => {
    it('The token setter is called and headers are appended.', async () => {
      const tokenSetter = createTokenSetter({ extraHeader: 'extraHeader' });

      initTests({
        moduleOptions: { tokenSetter },
      });
      const promise = currentModule.tokenizedFetch(uri);

      await advanceUntilPromiseResolved(promise);
      expect(tokenSetter).toHaveBeenCalledTimes(1);
      const headers = getLastQueryHeaders();
      expect(headers).toMatchObject({
        extraHeader: 'extraHeader',
        ...defaultApiTokens,
      });
    });
  });
  describe(`on-going api token renewal`, () => {
    it('Delays the query until tokens are renewed and new tokens are used.', async () => {
      const tokenSetter = createTokenSetter();
      initTests({
        moduleOptions: { tokenSetter },
      });
      emitApiTokensRenewalStart();
      const tracker = currentModule.getTracker();
      const renewalPromiseTracker = jest.fn();
      // the renewalPromise returns false, if timed out
      tracker.waitForApiTokens().then(renewalPromiseTracker);
      const promise = currentModule.tokenizedFetch(uri);
      jest.advanceTimersByTime(10000);
      const updatedTokens = { tokenx: 'tokenx', tokeny: 'tokeny' };
      emitApiTokensUpdatedStateChange(updatedTokens);
      await advanceUntilPromiseResolved(promise);
      expect(renewalPromiseTracker).toHaveBeenCalledWith(true);
      expect(tokenSetter).toHaveBeenCalledTimes(1);
      const headers = getLastQueryHeaders();
      expect(headers).toMatchObject({
        ...updatedTokens,
      });
    });
    it('If renewal is timed out, the query is executed anyway.', async () => {
      const tokenSetter = createTokenSetter();
      initTests({
        moduleOptions: { tokenSetter, keepTokensWhileRenewing: false },
      });
      emitApiTokensRenewalStart();
      const tracker = currentModule.getTracker();
      const renewalPromiseTracker = jest.fn();
      // the renewalPromise returns false, if timed out
      tracker.waitForApiTokens().then(renewalPromiseTracker);
      const promise = currentModule.tokenizedFetch(uri);

      await advanceUntilPromiseResolved(promise);
      expect(renewalPromiseTracker).toHaveBeenCalledWith(false);
      expect(tokenSetter).toHaveBeenCalledTimes(1);
      const headers = getLastQueryHeaders();
      expect(headers.token1).toBeUndefined();
      expect(headers.token2).toBeUndefined();
      expect(getRequestCount()).toBe(1);
      expect(getResponseListenerCallCount()).toBe(1);
    });
  });
  describe(`fetch can be aborted`, () => {
    it('Type of failure can be checked with currentModule.isAbortError', async () => {
      const tokenSetter = createTokenSetter();
      const rejectCatcher = jest.fn();

      initTests({
        moduleOptions: { tokenSetter },
      });
      expect(getRequestCount()).toBe(0);
      expect(getResponseListenerCallCount()).toBe(0);
      const props = {};
      const abort = currentModule.addAbortSignal(props);
      const promise = currentModule.tokenizedFetch(uri, props).catch(rejectCatcher);
      await waitUntilRequestStarted();
      jest.advanceTimersByTime(500);

      abort();
      await advanceUntilPromiseResolved(promise);
      expect(tokenSetter).toHaveBeenCalledTimes(1);
      expect(currentModule.isAbortError(getLastMockCallArgs(rejectCatcher)[0])).toBeTruthy();
    });
  });
  describe(`Fetched results can be emitted with emitResponse()`, () => {
    it('Resolved results are emitted data as event signals', async () => {
      const tokenSetter = createTokenSetter();
      const successSignal = 'successSignal';
      initTests({
        moduleOptions: { tokenSetter },
      });
      const promise = currentModule.emitResponse(
        currentModule.tokenizedFetch(uri).then((r) => r.json()),
        successSignal,
      );
      await advanceUntilPromiseResolved(promise);
      const payloads = getReceivedEventSignalPayloads(listenerModule);
      const successPayload = payloads.filter((p) => p.type === successSignal)[0];
      expect(successPayload).toMatchObject({ data: { response: 'good' } });
    });
    it('Aborted results are emitted data as event signals', async () => {
      const tokenSetter = createTokenSetter();
      const successSignal = 'successSignal';
      initTests({
        moduleOptions: { tokenSetter },
      });
      const props = {};
      const abort = currentModule.addAbortSignal(props);
      const promise = currentModule.emitResponse(
        currentModule.tokenizedFetch(uri, props).then((r) => r.json()),
        successSignal,
      );
      abort();
      await advanceUntilPromiseResolved(promise);
      const payloads = getReceivedEventSignalPayloads(listenerModule);
      const abortPayload = payloads.filter((payload) =>
        isTokenizedFetchAbortedSignal({ namespace: tokenizedFetchModuleNamespace, payload }),
      )[0];
      expect(abortPayload).toMatchObject({ data: createAbortSignalData() });
    });
    it('Failed requests are emitted data as error signals', async () => {
      const tokenSetter = createTokenSetter();
      const successSignal = 'successSignal';
      initTests({
        moduleOptions: { tokenSetter },
        responses: [
          {
            status: HttpStatusCode.SERVICE_UNAVAILABLE,
            error: new Error('Failed'),
          },
        ],
      });
      const promise = currentModule.emitResponse(
        currentModule.tokenizedFetch(uri).then((r) => r.json()),
        successSignal,
      );
      await advanceUntilPromiseResolved(promise);
      expect(getReceivedErrorSignalPayloads(listenerModule)).toHaveLength(1);
    });
    it('tokenizedFetchWithSignals() triggers signals as request progresses', async () => {
      const tokenSetter = createTokenSetter();
      const autoEmitSignalType = 'autoEmitSignalType';
      initTests({
        moduleOptions: { tokenSetter, preventQueriesWhileRenewing: false },
        responses: [
          {
            status: HttpStatusCode.SERVICE_UNAVAILABLE,
            error: new Error('Failed'),
          },
          { status: HttpStatusCode.OK, data: { response: 'good response' } },
          { status: HttpStatusCode.OK, data: { response: 'good response' } },
        ],
      });
      const errorPromise = currentModule.tokenizedFetchWithSignals(autoEmitSignalType, uri).catch(jest.fn());
      await advanceUntilPromiseResolved(errorPromise);
      const startPayload = getReceivedEventSignalPayloads(listenerModule).filter((payload) =>
        isTokenizedFetchStartedSignal({ namespace: tokenizedFetchModuleNamespace, payload }),
      )[0];
      expect(startPayload).toMatchObject({ data: createStartSignalData() });

      expect(getReceivedErrorSignalPayloads(listenerModule)).toHaveLength(1);

      const successPromise = currentModule.tokenizedFetchWithSignals(autoEmitSignalType, uri);
      await advanceUntilPromiseResolved(successPromise);
      const payloads = getReceivedEventSignalPayloads(listenerModule);
      // 3 = start + start + result:
      expect(payloads).toHaveLength(3);
      const successPayload = payloads.filter((payload) =>
        isTokenizedFetchStartedSignal({ namespace: tokenizedFetchModuleNamespace, payload }),
      )[1];
      expect(successPayload).toMatchObject({ data: createStartSignalData() });
      expect(payloads[2]).toMatchObject({ data: { response: 'good response' } });

      const props = {};
      const abort = currentModule.addAbortSignal(props);
      const abortedPromise = currentModule.tokenizedFetchWithSignals(autoEmitSignalType, uri, props);
      abort();
      await advanceUntilPromiseResolved(abortedPromise);
      expect(getReceivedErrorSignalPayloads(listenerModule)).toHaveLength(1);
      const latestPayloads = getReceivedEventSignalPayloads(listenerModule);
      // 5 = start + start + result + start + abort:
      expect(latestPayloads).toHaveLength(5);
      const abortPayload = latestPayloads.filter((payload) =>
        isTokenizedFetchAbortedSignal({ namespace: tokenizedFetchModuleNamespace, payload }),
      )[0];
      expect(abortPayload).toMatchObject({ data: createAbortSignalData() });
    });
    it('Emitted signals trigger only events with certain payload.types and errors.', async () => {
      const tokenSetter = createTokenSetter();
      initTests({
        moduleOptions: { tokenSetter, preventQueriesWhileRenewing: false },
        responses: [
          { status: HttpStatusCode.OK, data: { response: 'good response1' } },
          { status: HttpStatusCode.OK, data: { response: 'good response2' } },
          { status: HttpStatusCode.OK, data: { response: 'good response3' } },
          { status: HttpStatusCode.OK, data: { response: 'good response4' } },
          {
            status: HttpStatusCode.SERVICE_UNAVAILABLE,
            error: new Error('Failed'),
          },
          {
            status: HttpStatusCode.SERVICE_UNAVAILABLE,
            error: new Error('Failed'),
          },
        ],
      });

      const signalA = 'signalA';
      const listenerForSignalA = jest.fn();
      currentBeacon.addListener(createTriggerPropsForTokenizedFetchResponseSignals(signalA), listenerForSignalA);

      const errorListener = jest.fn();
      currentBeacon.addListener(triggerForAllTokenizedFetchErrors, errorListener);

      const signalXX = 'signalXX';
      const listenerForSignalXX = jest.fn();
      currentBeacon.addListener(createTriggerPropsForTokenizedFetchResponseSignals(signalXX), listenerForSignalXX);

      const listenerForAllSignals = jest.fn();
      currentBeacon.addListener(createTriggerPropsForAllTokenizedFetchSignals(), listenerForAllSignals);

      const notUsedSignal = 'notUsedSignal';
      const listenerForNeverTriggered = jest.fn();
      currentBeacon.addListener(
        createTriggerPropsForTokenizedFetchResponseSignals(notUsedSignal),
        listenerForNeverTriggered,
      );

      await advanceUntilPromiseResolved(currentModule.tokenizedFetchWithSignals(signalA, uri));

      // 2 = start + end
      expect(listenerForSignalA).toHaveBeenCalledTimes(2);
      expect(listenerForSignalXX).toHaveBeenCalledTimes(0);

      await advanceUntilPromiseResolved(currentModule.tokenizedFetchWithSignals(signalXX, uri));
      await advanceUntilPromiseResolved(currentModule.tokenizedFetchWithSignals(signalXX, uri));
      expect(listenerForSignalA).toHaveBeenCalledTimes(2);
      expect(listenerForSignalXX).toHaveBeenCalledTimes(4);

      await advanceUntilPromiseResolved(currentModule.tokenizedFetchWithSignals(signalA, uri));
      expect(listenerForSignalA).toHaveBeenCalledTimes(4);
      expect(listenerForSignalXX).toHaveBeenCalledTimes(4);

      await advanceUntilPromiseResolved(currentModule.tokenizedFetchWithSignals(signalA, uri));
      expect(listenerForSignalA).toHaveBeenCalledTimes(6);
      expect(listenerForSignalXX).toHaveBeenCalledTimes(4);
      expect(errorListener).toHaveBeenCalledTimes(1);

      await advanceUntilPromiseResolved(currentModule.tokenizedFetchWithSignals(signalXX, uri));
      expect(listenerForSignalA).toHaveBeenCalledTimes(6);
      expect(listenerForSignalXX).toHaveBeenCalledTimes(6);
      expect(errorListener).toHaveBeenCalledTimes(2);

      expect(listenerForAllSignals).toHaveBeenCalledTimes(12);
      expect(listenerForNeverTriggered).toHaveBeenCalledTimes(0);
    });
  });
  describe(`Multiple fetches work.`, () => {
    it('Resolved results are emitted data as event signals', async () => {
      const tokenSetter = createTokenSetter();
      const successSignal = 'successSignal';
      const responseCatcher = jest.fn();
      const responses = [
        { status: HttpStatusCode.OK, data: { response: 'good response' } },
        { status: HttpStatusCode.OK, data: { response: 'good response 2' } },
        {
          status: HttpStatusCode.SERVICE_UNAVAILABLE,
          error: new Error('Failed'),
        },
        {
          status: HttpStatusCode.SERVICE_UNAVAILABLE,
          error: new Error('Failed2'),
        },
        { status: HttpStatusCode.OK, data: { response: 'good response 3' } },
        { status: HttpStatusCode.OK, data: { response: 'renew first response' } },
        {
          status: HttpStatusCode.SERVICE_UNAVAILABLE,
          error: new Error('Failed3'),
        },
        { status: HttpStatusCode.OK, data: { response: 'good response 4' } },
      ];
      initTests({
        moduleOptions: { tokenSetter, keepTokensWhileRenewing: false },
        responses,
      });

      const executeFetch = async ({ abort, renewTokens }: { abort?: boolean; renewTokens?: TokenData } = {}) => {
        const props = {};
        const abortFn = abort ? currentModule.addAbortSignal(props) : undefined;

        if (renewTokens) {
          emitApiTokensRenewalStart();
        }

        const promise = currentModule
          .tokenizedFetch(uri, props)
          .then(async (r) => {
            const json = await r.json();
            responseCatcher(json);
            return r;
          })
          .catch((e) => {
            responseCatcher(e);
            return e;
          });
        currentModule.emitResponse(
          promise.then((r) => {
            return r.json();
          }),
          successSignal,
        );
        if (abortFn) {
          abortFn();
        }
        if (renewTokens) {
          jest.advanceTimersByTime(10000);
          emitApiTokensUpdatedStateChange(renewTokens);
        }
        await advanceUntilPromiseResolved(promise);
        return promise;
      };

      await executeFetch();
      expect(responseCatcher).toHaveBeenLastCalledWith(responses[0].data);

      await executeFetch();
      expect(responseCatcher).toHaveBeenLastCalledWith(responses[1].data);

      await executeFetch({ abort: true });
      expect(currentModule.isAbortError(getLastMockCallArgs(responseCatcher)[0])).toBeTruthy();

      await executeFetch();
      expect(getLastMockCallArgs(responseCatcher)[0].message).toBe(responses[2]?.error?.message);

      await executeFetch();
      expect(getLastMockCallArgs(responseCatcher)[0].message).toBe(responses[3]?.error?.message);

      await executeFetch();
      expect(responseCatcher).toHaveBeenLastCalledWith(responses[4].data);
      const renewTokens = { token: '3000' };

      await executeFetch({ renewTokens });
      expect(responseCatcher).toHaveBeenLastCalledWith(responses[5].data);
      const headers = getLastQueryHeaders();
      expect(headers).toMatchObject({
        ...renewTokens,
      });

      const renewTokens2 = { token: '5000' };
      await executeFetch({ abort: true, renewTokens: renewTokens2 });
      expect(currentModule.isAbortError(getLastMockCallArgs(responseCatcher)[0])).toBeTruthy();
      const headers2 = getLastQueryHeaders();
      expect(headers2).toMatchObject({
        ...renewTokens2,
      });

      emitApiTokensRemovedStateChange();
      await executeFetch();
      // previous test did not actually use responses so next is response[6]
      expect(getLastMockCallArgs(responseCatcher)[0].message).toBe(responses[6]?.error?.message);
      const headers3 = getLastQueryHeaders();
      expect(Object.keys(headers3)).toHaveLength(0);

      await executeFetch();
      expect(responseCatcher).toHaveBeenLastCalledWith(responses[7].data);
    });
  });
});
