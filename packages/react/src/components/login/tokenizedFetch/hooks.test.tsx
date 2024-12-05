/* eslint-disable jest/no-mocks-import */
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import React, { useEffect, useRef } from 'react';
import { isObject } from 'lodash';
import { act, fireEvent, waitFor } from '@testing-library/react';

import HttpStatusCode from '../../../utils/httpStatusCode';
import { ConnectedModule, Signal } from '../beacon/beacon';
import { isErrorSignal } from '../beacon/signals';
import { createConnectedBeaconModule, createTestListenerModule } from '../testUtils/beaconTestUtil';
import { createControlledFetchMockUtil } from '../testUtils/fetchMockTestUtil';
import { createTokenizedFetchModule } from './tokenizedFetch';
import {
  useTokenizedFetch,
  useTokenizedFetchModule,
  useTokenizedFetchResponseTracking,
  useTokenizedFetchTracking,
  useTokenizedFetchWithSignals,
} from './hooks';
import { HookTestUtil, createHookTestEnvironment } from '../testUtils/hooks.testUtil';
import { TokenizedFetchModule, tokenizedFetchModuleNamespace } from '.';
import { isTokenizedFetchStartedSignal } from './signals';
import { TokenizedFetchError } from './tokenizedFetchError';

const elementIds = {
  namespaceElement: 'namespace-element',
  lastSignalElementPrefix: 'last-signal-element-',
  renderCountElementPrefix: 'render-count-element-',
  loadingElementPrefix: 'is-loading-',
  errorElementPrefix: 'error-element-',
  loadButtonElementPrefix: 'loading-button-',
  notUpdatingRenderCount: 'not-updating-render-count',
  lastSignalType: 'last-signal-type',
  lastErrorMessage: 'last-error-message',
} as const;

type ResponseType = { returnedStatus: HttpStatusCode; data?: unknown | null; error?: Error };
type UsedSignals = 'signalA' | 'signalXyz' | 'signalNever' | 'generic';
let testUtil: HookTestUtil;
const url = '/path';

describe(`tokenizedFetchModule`, () => {
  const createSuccessResponse = (response = 'ok'): ResponseType => {
    return { returnedStatus: HttpStatusCode.OK, data: { response } };
  };

  const errorResponse: ResponseType = {
    returnedStatus: HttpStatusCode.SERVICE_UNAVAILABLE,
    error: new Error('Failed'),
  };
  const { cleanUp, setResponders, addResponse } = createControlledFetchMockUtil([{ path: url }]);

  let currentModule: TokenizedFetchModule;
  let listenerModule: ReturnType<typeof createConnectedBeaconModule>;

  const RenderCountIndicator = ({ id }: { id: string }) => {
    const instanceRenderCountRef = useRef(1);
    useEffect(() => {
      instanceRenderCountRef.current += 1;
    });
    return <span id={id}>{instanceRenderCountRef.current}</span>;
  };

  const SignalOutput = ({ id, signal }: { id: string; signal: Signal | undefined | null }) => {
    const { type, payload } =
      signal && typeof signal === 'object' && !isErrorSignal(signal) ? signal : { payload: undefined, type: undefined };
    return (
      <span key="signal" id={id}>
        {JSON.stringify({ type, payload })}
      </span>
    );
  };
  const ErrorOutput = ({ id, signal }: { id: string; signal: Signal | undefined | null }) => {
    const error = signal && isErrorSignal(signal) ? (signal?.payload as TokenizedFetchError) : null;
    const { type, originalError } = error || { type: undefined, originalError: undefined };
    return (
      <span key="signal" id={id}>
        {JSON.stringify({ type, message: originalError ? originalError.message : '' })}
      </span>
    );
  };

  const IsLoadingOutput = ({ id, signal }: { id: string; signal: Signal | undefined | null }) => {
    const isLoading = signal && isTokenizedFetchStartedSignal(signal);
    return (
      <span key="signal" id={id}>
        {isLoading ? 1 : 0}
      </span>
    );
  };

  const ModuleOutput = () => {
    const tokenizedFetchModule = useTokenizedFetchModule();
    return (
      <div>
        <span key="namespace" id={elementIds.namespaceElement}>
          {tokenizedFetchModule.namespace}
        </span>
        <RenderCountIndicator id={elementIds.notUpdatingRenderCount} />
      </div>
    );
  };

  const GenericListener = () => {
    const event = 'generic';
    const module = useTokenizedFetchModule();
    const [signal] = useTokenizedFetchTracking();
    const tokenizedFetch = useTokenizedFetch();
    const load = async () => {
      module.emitFetchStart(event);
      await module
        .emitResponse(
          tokenizedFetch(url).then((r) => {
            return r.json();
          }),
          event,
        )
        .catch(jest.fn());
    };

    return (
      <div>
        <SignalOutput id={`${elementIds.lastSignalElementPrefix}${event}`} signal={signal} />
        <ErrorOutput id={`${elementIds.errorElementPrefix}${event}`} signal={signal} />
        <IsLoadingOutput id={`${elementIds.loadingElementPrefix}${event}`} signal={signal} />
        <ErrorOutput id={`${elementIds.errorElementPrefix}${event}`} signal={signal} />
        <RenderCountIndicator id={`${elementIds.renderCountElementPrefix}${event}`} />
        <button key="load" id={`${elementIds.loadButtonElementPrefix}${event}`} type="button" onClick={() => load()}>
          LOAD
        </button>
      </div>
    );
  };

  const Listener = ({ event }: { event: UsedSignals }) => {
    const [signal] = useTokenizedFetchResponseTracking(event);
    const tokenizedFetchWithSignals = useTokenizedFetchWithSignals();
    const load = () => {
      tokenizedFetchWithSignals(event, url);
    };
    return (
      <div>
        <SignalOutput id={`${elementIds.lastSignalElementPrefix}${event}`} signal={signal} />
        <IsLoadingOutput id={`${elementIds.loadingElementPrefix}${event}`} signal={signal} />
        <ErrorOutput id={`${elementIds.errorElementPrefix}${event}`} signal={signal} />
        <RenderCountIndicator id={`${elementIds.renderCountElementPrefix}${event}`} />
        <button key="load" id={`${elementIds.loadButtonElementPrefix}${event}`} type="button" onClick={() => load()}>
          LOAD
        </button>
      </div>
    );
  };

  const TokenizedFetchModuleCheck = () => {
    return (
      <div>
        <ModuleOutput />
        <Listener event="signalA" />
        <Listener event="signalXyz" />
        <Listener event="signalNever" />
        <GenericListener />
      </div>
    );
  };

  const App = () => {
    return <TokenizedFetchModuleCheck key="mod" />;
  };

  const initTests = ({ responses }: { responses: ResponseType[] }) => {
    responses.forEach((response) => {
      addResponse(
        response.error || {
          status: response.returnedStatus,
          body: response.data ? JSON.stringify(response.data) : undefined,
        },
      );
    });
    currentModule = createTokenizedFetchModule({ tokenSetter: () => ({}) });

    listenerModule = createTestListenerModule(tokenizedFetchModuleNamespace, 'tokenizedFetchModuleListener');

    const modules: ConnectedModule[] = [currentModule, listenerModule];

    testUtil = createHookTestEnvironment(
      {
        waitForRenderToggle: false,
        children: [<App key="app" />],
        noOidcClient: true,
      },
      {},
      modules,
    );
    const getSignalTypeAndPayload = (signalType: UsedSignals) => {
      return testUtil.getElementJSON(`${elementIds.lastSignalElementPrefix}${signalType}`);
    };
    const getSignalErrorTypeAndMessage = (signalType: UsedSignals) => {
      return testUtil.getElementJSON(`${elementIds.errorElementPrefix}${signalType}`);
    };
    const getIsLoading = (signalType: UsedSignals) => {
      return testUtil.getInnerHtml(`${elementIds.loadingElementPrefix}${signalType}`) === '1';
    };
    const getRenderCount = (signalType: UsedSignals) => {
      return parseInt(testUtil.getInnerHtml(`${elementIds.renderCountElementPrefix}${signalType}`), 10);
    };
    const getFetchButton = (signalType: UsedSignals) => {
      return testUtil.getElementById(`${elementIds.loadButtonElementPrefix}${signalType}`);
    };

    const waitForReturnValueChange = async (func: () => unknown, advanceTime = 0) => {
      const current = func();
      const compareObjects = isObject(current);
      await waitFor(() => {
        if (advanceTime) {
          jest.advanceTimersByTime(advanceTime);
        }
        const newValue = func();
        if (compareObjects && isObject(newValue)) {
          expect(newValue).not.toMatchObject(current as object);
        } else if (newValue === current) {
          throw new Error('Same value');
        }
      });
    };

    const waitForIsLoadingChange = async (signalType: UsedSignals, advanceTime = 0) => {
      await waitForReturnValueChange(() => getIsLoading(signalType), advanceTime);
    };

    const waitForRenderCountChange = async (signalType: UsedSignals, advanceTime = 0) => {
      await waitForReturnValueChange(() => getRenderCount(signalType), advanceTime);
    };

    const waitForSignalTypeAndPayloadChange = async (signalType: UsedSignals, advanceTime = 0) => {
      await waitForReturnValueChange(() => getSignalTypeAndPayload(signalType), advanceTime);
    };

    const waitForValue = async (func: () => unknown, advanceTime = 0, expectedValue: unknown) => {
      await waitFor(() => {
        if (advanceTime) {
          jest.advanceTimersByTime(advanceTime);
        }
        const value = func();
        if (value !== expectedValue) {
          throw new Error(`Not correct value. Expected ${expectedValue}, but got ${value}`);
        }
      });
    };

    const waitForIsLoadingToMatch = async (signalType: UsedSignals, isLoading: boolean, advanceTime = 0) => {
      await waitForValue(() => getIsLoading(signalType), advanceTime, isLoading);
    };

    const startFetch = async (signalType: UsedSignals, advanceTime = 0) => {
      await waitForIsLoadingToMatch(signalType, false, advanceTime);
      act(() => {
        fireEvent.click(getFetchButton(signalType));
      });
      await waitForIsLoadingToMatch(signalType, true, advanceTime);
    };

    return {
      ...testUtil,
      getIsLoading,
      waitForIsLoadingChange,
      waitForIsLoadingToMatch,
      waitForSignalTypeAndPayloadChange,
      waitForRenderCountChange,
      getSignalErrorTypeAndMessage,
      getRenderCount,
      getFetchButton,
      startFetch,
      getSignalTypeAndPayload,
    };
  };

  const initResponder = () => {
    setResponders([{ path: url }]);
  };

  // ApolloClient emits errors when cached data is invalid. That does not matter in these tests.
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    enableFetchMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => null);
  });

  beforeEach(() => {
    jest.useFakeTimers();
    initResponder();
  });

  afterEach(async () => {
    await cleanUp();
    if (currentModule) {
      act(() => {
        currentModule.reset();
      });
    }
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  afterAll(() => {
    disableFetchMocks();
    consoleErrorSpy.mockRestore();
  });

  it('Components using hook render properly', async () => {
    const { getInnerHtml, getRenderCount, getSignalErrorTypeAndMessage, getSignalTypeAndPayload } = initTests({
      responses: [],
    });
    expect(getInnerHtml(elementIds.namespaceElement)).toBe(tokenizedFetchModuleNamespace);
    expect(getRenderCount('generic')).toBe(1);
    expect(getRenderCount('signalA')).toBe(1);
    expect(getRenderCount('signalXyz')).toBe(1);
    expect(getRenderCount('signalNever')).toBe(1);
    expect(getSignalErrorTypeAndMessage('generic')).toMatchObject({ message: '' });
    expect(getSignalTypeAndPayload('generic')).toMatchObject({});
  });
  it('Fetch re-renders only components listening to that signal', async () => {
    const {
      startFetch,
      getRenderCount,
      waitForSignalTypeAndPayloadChange,
      getSignalTypeAndPayload,
      waitForIsLoadingChange,
      waitForIsLoadingToMatch,
      getSignalErrorTypeAndMessage,
    } = initTests({
      responses: [
        createSuccessResponse('ok'),
        createSuccessResponse('ok 2'),
        createSuccessResponse('ok 3'),
        errorResponse,
        errorResponse,
      ],
    });
    await startFetch('generic');
    expect(getRenderCount('generic')).toBe(2);
    expect(getRenderCount('signalA')).toBe(1);
    expect(getRenderCount('signalXyz')).toBe(1);
    expect(getRenderCount('signalNever')).toBe(1);
    await waitForSignalTypeAndPayloadChange('generic');
    expect(getSignalTypeAndPayload('generic').payload.data).toMatchObject({ response: 'ok' });
    expect(getRenderCount('generic')).toBe(3);
    expect(getRenderCount('signalA')).toBe(1);
    expect(getRenderCount('signalXyz')).toBe(1);
    expect(getRenderCount('signalNever')).toBe(1);

    await startFetch('signalA');
    // 4=start+end+start+end, listens to all signals
    expect(getRenderCount('generic')).toBe(4);
    expect(getRenderCount('signalA')).toBe(2);
    expect(getRenderCount('signalXyz')).toBe(1);
    expect(getRenderCount('signalNever')).toBe(1);
    await waitForSignalTypeAndPayloadChange('signalA');
    expect(getSignalTypeAndPayload('signalA').payload.data).toMatchObject({ response: 'ok 2' });
    // generic renders after every signal
    expect(getSignalTypeAndPayload('generic').payload.data).toMatchObject({ response: 'ok 2' });
    expect(getRenderCount('generic')).toBe(5);
    expect(getRenderCount('signalA')).toBe(3);
    expect(getRenderCount('signalXyz')).toBe(1);
    expect(getRenderCount('signalNever')).toBe(1);

    await startFetch('signalXyz');
    // 6= 3x start+end
    expect(getRenderCount('generic')).toBe(6);
    expect(getRenderCount('signalA')).toBe(3);
    expect(getRenderCount('signalXyz')).toBe(2);
    expect(getRenderCount('signalNever')).toBe(1);
    await waitForSignalTypeAndPayloadChange('signalXyz');
    expect(getSignalTypeAndPayload('signalXyz').payload.data).toMatchObject({ response: 'ok 3' });
    expect(getSignalTypeAndPayload('generic').payload.data).toMatchObject({ response: 'ok 3' });
    expect(getSignalTypeAndPayload('signalA').payload.data).toMatchObject({ response: 'ok 2' });
    expect(getRenderCount('generic')).toBe(7);
    expect(getRenderCount('signalA')).toBe(3);
    expect(getRenderCount('signalXyz')).toBe(3);
    expect(getRenderCount('signalNever')).toBe(1);

    await startFetch('signalXyz');
    await waitForIsLoadingChange('signalXyz');
    await startFetch('signalA');
    await waitForIsLoadingToMatch('signalXyz', false);
    await waitForIsLoadingToMatch('signalA', false);
    expect(getSignalErrorTypeAndMessage('signalA')).toMatchObject({ message: 'Failed', type: 'signalA' });
    expect(getSignalErrorTypeAndMessage('signalXyz')).toMatchObject({ message: 'Failed', type: 'signalXyz' });
    expect(getSignalErrorTypeAndMessage('signalNever')).toMatchObject({ message: '' });
    expect(getRenderCount('signalA')).toBe(5);
    expect(getRenderCount('signalXyz')).toBe(5);
    expect(getRenderCount('signalNever')).toBe(1);
    expect(getSignalTypeAndPayload('signalXyz')).toMatchObject({});
    expect(getSignalTypeAndPayload('generic')).toMatchObject({});
    expect(getSignalTypeAndPayload('signalA')).toMatchObject({});
  });
});
