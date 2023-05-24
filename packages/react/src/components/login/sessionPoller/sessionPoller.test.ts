import { waitFor } from '@testing-library/react';
import HttpStatusCode from 'http-status-typed';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import { User } from 'oidc-client-ts';

import { Beacon, createBeacon } from '../beacon/beacon';
import {
  emitInitializationSignals,
  eventSignalType,
  StateChangeSignalPayload,
  stateChangeSignalType,
} from '../beacon/signals';
import { OidcClient, OidcClientState, oidcClientEvents, oidcClientNamespace, oidcClientStates } from '../client/index';
import {
  createConnectedBeaconModule,
  createTestListenerModule,
  getReceivedErrorSignalPayloads,
} from '../testUtils/beaconTestUtil';
import {
  createControlledFetchMockUtil,
  getFetchMockCalls,
  getLastFetchMockCallArguments,
  waitForFetchMockResultFulfillment,
} from '../testUtils/fetchMockTestUtil';
import { createMockOidcClient, userManagerEndPointPath } from '../testUtils/oidcClientTestUtil';
import { createUser } from '../testUtils/userTestUtil';
import { isAbortError } from '../utils/abortFetch';
import { HttpPoller, HttpPollerProps } from '../utils/httpPoller';
import createSessionPoller, { SessionPoller, sessionPollerNamespace } from './sessionPoller';
import { createMockTestUtil } from '../testUtils/mockTestUtil';
import { SessionPollerError } from './sessionPollerError';

type ResponseType = { returnedStatus: HttpStatusCode };

const mockMapForHttpPoller = createMockTestUtil();
const mockMapForAbort = createMockTestUtil();

let mockCurrentHttpPoller: HttpPoller;
const mockActualHttpPoller = jest.requireActual('../utils/httpPoller');
jest.mock('../utils/httpPoller', () => ({
  __esModule: true,
  default: (props: HttpPollerProps) => {
    if (mockCurrentHttpPoller) {
      mockCurrentHttpPoller.stop();
    }
    mockMapForHttpPoller.reset();
    mockMapForHttpPoller.addSpy(props, 'shouldPoll');
    mockCurrentHttpPoller = mockActualHttpPoller.default(props) as HttpPoller;
    mockMapForHttpPoller.addSpy(mockCurrentHttpPoller, 'start');
    mockMapForHttpPoller.addSpy(mockCurrentHttpPoller, 'stop');
    return mockCurrentHttpPoller;
  },
  isSuccessfulHttpResponse: (...args: unknown[]) => mockActualHttpPoller.isSuccessfulHttpResponse(...args),
}));

const mockActualAbortFetch = jest.requireActual('../utils/abortFetch');

jest.mock('../utils/abortFetch', () => ({
  __esModule: true,
  createFetchAborter: () => {
    const aborter = mockActualAbortFetch.createFetchAborter();
    mockMapForAbort.reset();
    mockMapForAbort.addSpy(aborter, 'abort');
    mockMapForAbort.addSpy(aborter, 'getSignal');
    return aborter;
  },
  isAbortError: (error: Error) => {
    return mockActualAbortFetch.isAbortError(error);
  },
}));

const getHttpPollerStartCalls = () => {
  return mockMapForHttpPoller.getCalls('start');
};

const getHttpPollerStopCalls = () => {
  return mockMapForHttpPoller.getCalls('stop');
};

const getHttpPollerShouldPollCalls = () => {
  return mockMapForHttpPoller.getCalls('shouldPoll');
};

describe(`sessionPoller`, () => {
  const validResponse = 'Ok';
  const endPointPath = '/userInfoEndPoint';
  const successfulResponse: ResponseType = { returnedStatus: HttpStatusCode.OK };
  const errorResponse: ResponseType = { returnedStatus: HttpStatusCode.NOT_FOUND };
  const forbiddenResponse: ResponseType = { returnedStatus: HttpStatusCode.FORBIDDEN };
  const unauthorizedResponse: ResponseType = { returnedStatus: HttpStatusCode.UNAUTHORIZED };
  const {
    waitUntilRequestStarted,
    waitUntilRequestFinished,
    cleanUp,
    setResponders,
    addResponse,
    getRequestCount,
    getRequestListenerCallCount,
    getResponseListenerCallCount,
  } = createControlledFetchMockUtil([{ path: endPointPath }]);

  let currentPoller: SessionPoller;
  let currentBeacon: Beacon;
  let currentOidcClient: OidcClient;
  let listenerModule: ReturnType<typeof createConnectedBeaconModule>;
  let mockOidcClientState: (state: OidcClientState) => void;
  let mockUserManagerUser: (user: User | null) => void;
  const pollIntervalInMs = 50000;

  const addPollResponse = ({ returnedStatus }: ResponseType) => {
    if (returnedStatus) {
      addResponse({ status: returnedStatus, body: validResponse });
    } else {
      addResponse(new Error('Fetch failed'));
    }
  };

  const initTests = ({
    setValidSession,
    user,
    responses,
  }: {
    setValidSession?: boolean;
    user?: User;
    responses: ResponseType[];
  }) => {
    const { oidcClient, setGetStateReturnValue, setGetUserReturnValue } = createMockOidcClient();
    currentOidcClient = oidcClient;
    mockOidcClientState = setGetStateReturnValue;
    mockUserManagerUser = setGetUserReturnValue;
    if (setValidSession || user) {
      mockOidcClientState(oidcClientStates.VALID_SESSION);
      mockUserManagerUser(user || createUser({}));
    }
    responses.forEach((response) => {
      addPollResponse(response);
    });
    currentPoller = createSessionPoller({ pollIntervalInMs });
    listenerModule = createTestListenerModule(sessionPollerNamespace, 'sessionPollerListener');
    currentBeacon = createBeacon();
    currentBeacon.addSignalContext(currentPoller);
    currentBeacon.addSignalContext(currentOidcClient);
    currentBeacon.addSignalContext(listenerModule);
    emitInitializationSignals(currentBeacon);
  };

  const emitOidcClientStateChange = (payload: StateChangeSignalPayload) => {
    if (payload.state === oidcClientStates.VALID_SESSION) {
      mockUserManagerUser(createUser({}));
    } else {
      mockUserManagerUser(null);
    }
    currentBeacon.emit({ type: stateChangeSignalType, namespace: oidcClientNamespace, payload });
  };

  const initResponder = () => {
    setResponders([{ path: userManagerEndPointPath }]);
  };

  const jumpToNextPoll = () => {
    jest.advanceTimersByTime(pollIntervalInMs + 1);
  };

  const advanceUntilRequestStarts = async (): Promise<number> => {
    const currentShouldPoll = getHttpPollerShouldPollCalls().length;
    const currentRequestStarts = getRequestListenerCallCount();
    const currentResponseCount = getResponseListenerCallCount();
    // currentResponseCount should be higher if a request is not pending....
    if (currentRequestStarts === currentResponseCount + 1) {
      await waitUntilRequestFinished();
    }
    // request is pending
    if (currentRequestStarts > currentResponseCount + 1) {
      return Promise.resolve(currentRequestStarts);
    }
    await waitFor(() => {
      jest.advanceTimersByTime(100);
      expect(getHttpPollerShouldPollCalls().length).toBe(currentShouldPoll + 1);
      expect(getRequestListenerCallCount()).toBe(currentRequestStarts + 1);
    });
    return currentRequestStarts + 1;
  };

  const advanceUntilRequestEnds = async (startCount = -1): Promise<number> => {
    const currentResponseCount = startCount > -1 ? startCount : getResponseListenerCallCount();
    const currentRequestCount = getRequestListenerCallCount();
    // currentResponseCount should be higher if a request is pending....
    if (currentResponseCount === currentRequestCount) {
      await waitUntilRequestStarted();
    }
    await waitUntilRequestFinished();

    await waitFor(() => {
      jest.advanceTimersByTime(100);
      expect(getResponseListenerCallCount()).toBe(currentResponseCount + 1);
    });
    return currentResponseCount + 1;
  };

  const gerFetchArgs = () => {
    const args = getLastFetchMockCallArguments();
    return {
      url: args[0],
      options: args[1] as Parameters<typeof fetch>[1],
    };
  };

  const verifyPollingIsStopped = ({ assumedCurrentCount = -1 }: { assumedCurrentCount?: number } = {}) => {
    if (assumedCurrentCount > -1) {
      expect(getRequestCount()).toBe(assumedCurrentCount);
    }
    const fetchCount = getFetchMockCalls().length;
    jest.advanceTimersByTime(pollIntervalInMs + 1);
    jest.advanceTimersByTime(pollIntervalInMs + 1);
    jest.advanceTimersByTime(pollIntervalInMs + 1);
    expect(getFetchMockCalls()).toHaveLength(fetchCount);
  };

  const getEmittedErrors = () => {
    return getReceivedErrorSignalPayloads<SessionPollerError>(listenerModule);
  };

  beforeAll(() => {
    enableFetchMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    initResponder();
  });

  afterEach(async () => {
    currentPoller.stop();
    currentBeacon.clear();
    mockOidcClientState(oidcClientStates.NO_SESSION);
    mockUserManagerUser(null);
    await cleanUp();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    mockMapForHttpPoller.clear();
    mockMapForAbort.clear();
  });

  afterAll(() => {
    disableFetchMocks();
  });

  it('when started, sessionPoller calls httpPoller.start() and it calls given shouldPoll() before each fetch. Abort signal is created.', async () => {
    initTests({
      setValidSession: true,
      responses: [successfulResponse, successfulResponse, successfulResponse, successfulResponse],
    });
    // first one starts immediately, because user exists
    const responses = await waitUntilRequestFinished();
    expect(getHttpPollerShouldPollCalls()).toHaveLength(1);
    expect(responses).toHaveLength(1);
    const result = (await waitForFetchMockResultFulfillment(0)) as Response;
    const resultText = await result?.text();
    expect(resultText).toBe(validResponse);
    expect(mockMapForAbort.getListener('getSignal')).toHaveBeenCalledTimes(1);
    await advanceUntilRequestEnds(2);
    const finishedRequests = await advanceUntilRequestEnds(3);
    expect(finishedRequests).toBe(4);
    expect(getHttpPollerShouldPollCalls()).toHaveLength(4);
    expect(getHttpPollerStartCalls()).toHaveLength(1);
    expect(getHttpPollerStopCalls()).toHaveLength(0);
  });

  it('When user is not logged in, fetch calls are not done, as shouldPoll() returns false. ShouldPoll is called until stopped.', async () => {
    initTests({ setValidSession: false, responses: [] });
    // start polling manually because user is not logged in.
    currentPoller.start();
    await waitFor(() => {
      expect(getHttpPollerShouldPollCalls()).toHaveLength(1);
    });
    expect(getFetchMockCalls()).toHaveLength(0);
    jumpToNextPoll();
    expect(getHttpPollerShouldPollCalls()).toHaveLength(2);
    jumpToNextPoll();
    expect(getHttpPollerShouldPollCalls()).toHaveLength(3);
    currentPoller.stop();
    jumpToNextPoll();
    expect(getFetchMockCalls()).toHaveLength(0);
    expect(getHttpPollerShouldPollCalls()).toHaveLength(3);
    expect(getHttpPollerStartCalls()).toHaveLength(1);
    // 2 calls: one made when sessionPoller receives an oidcClient init event and user is not logged in.
    // and one made manually
    expect(getHttpPollerStopCalls()).toHaveLength(2);
  });

  it(".stop() aborts current fetch and stops the poller. Aborting won't trigger errors", async () => {
    initTests({ setValidSession: true, responses: [successfulResponse, successfulResponse] });
    // first one starts immediately, because user exists
    await waitUntilRequestFinished();
    await advanceUntilRequestStarts();
    currentPoller.stop();
    expect(mockMapForAbort.getListener('abort')).toHaveBeenCalledTimes(1);
    await waitUntilRequestFinished();
    const error = (await waitForFetchMockResultFulfillment(1)) as Error;
    expect(isAbortError(error)).toBeTruthy();
    verifyPollingIsStopped({ assumedCurrentCount: 2 });
    const emittedErrors = getEmittedErrors();
    expect(emittedErrors).toHaveLength(0);
    expect(getHttpPollerStartCalls()).toHaveLength(1);
    expect(getHttpPollerStopCalls()).toHaveLength(1);
  });

  it('.stop() and start can be called multiple times', async () => {
    initTests({ setValidSession: true, responses: [successfulResponse] });
    await waitUntilRequestFinished();
    currentPoller.stop();
    currentPoller.stop();
    currentPoller.start();
    currentPoller.start();
    currentPoller.stop();
    currentPoller.stop();
    // one call because timeout timer did not finish after first request
    expect(getHttpPollerShouldPollCalls()).toHaveLength(1);
    currentPoller.start();
    await waitForFetchMockResultFulfillment(1);
    expect(getFetchMockCalls()).toHaveLength(2);
  });

  it('polling can be started and stopped at any time', async () => {
    initTests({
      setValidSession: true,
      responses: [successfulResponse, successfulResponse, successfulResponse, successfulResponse, successfulResponse],
    });
    await waitUntilRequestFinished();
    currentPoller.stop();
    verifyPollingIsStopped({ assumedCurrentCount: 1 });
    expect(getHttpPollerShouldPollCalls()).toHaveLength(1);
    currentPoller.start();
    await advanceUntilRequestEnds();
    await advanceUntilRequestStarts();
    currentPoller.stop();
    verifyPollingIsStopped({ assumedCurrentCount: 3 });
    currentPoller.start();
    const startCount = await advanceUntilRequestStarts();
    const endCount = await advanceUntilRequestEnds();
    expect(startCount).toBe(4);
    expect(endCount).toBe(4);
    expect(getHttpPollerShouldPollCalls()).toHaveLength(4);
  });

  it("fetch url is picked from userManager's getUserInfoEndpoint(). abort signal and user's accessToken are in the header", async () => {
    const user = createUser({ signInResponseProps: { access_token: 'sessionToken' } });
    initTests({ user, responses: [successfulResponse] });
    await waitUntilRequestFinished();
    const { url, options } = gerFetchArgs();
    expect(url.includes(endPointPath)).toBeTruthy();
    expect(options?.signal).not.toBeUndefined();
    const authorizationHeader = (options?.headers as Headers).get('authorization') as string;
    expect(authorizationHeader.includes(String(user.access_token))).toBeTruthy();
    await waitForFetchMockResultFulfillment(0);
  });

  it('when fetch fails and statusCode indicates an auth error, the error signal is sent and polling is stopped ', async () => {
    initTests({ setValidSession: true, responses: [successfulResponse, unauthorizedResponse, forbiddenResponse] });
    await waitUntilRequestFinished();
    const result = (await waitForFetchMockResultFulfillment(0)) as Response;
    const resultText = await result?.text();
    expect(resultText).toBe(validResponse);

    await waitUntilRequestFinished();
    const error = (await waitForFetchMockResultFulfillment(1)) as Response;
    expect(error.status).toBe(HttpStatusCode.UNAUTHORIZED);
    expect(getHttpPollerShouldPollCalls()).toHaveLength(2);

    // the unauthorizedResponse stopped the poller
    currentPoller.start();
    const error2 = (await waitForFetchMockResultFulfillment(2)) as Response;
    expect(error2.status).toBe(HttpStatusCode.FORBIDDEN);
    expect(getHttpPollerShouldPollCalls()).toHaveLength(3);
    const emittedErrors = getEmittedErrors();
    expect(emittedErrors).toHaveLength(2);
    expect(emittedErrors[0].isSessionEnded).toBeTruthy();
    expect(emittedErrors[0].isSessionEnded).toBeTruthy();
    verifyPollingIsStopped({ assumedCurrentCount: 3 });
  });

  it('when fetch fails and statusCode DOES NOT indicate an auth error, error signal is emitted, but polling is NOT stopped', async () => {
    initTests({
      setValidSession: true,
      responses: [successfulResponse, errorResponse, successfulResponse, successfulResponse],
    });
    // first one starts immediately, because user exists
    const responses = await waitUntilRequestFinished();
    expect(responses).toHaveLength(1);
    // third one starts immediately after second, because fetch is attempted again immediately after an error
    const finishedRequests = await advanceUntilRequestEnds(2);
    expect(finishedRequests).toBe(3);
    expect(getHttpPollerShouldPollCalls()).toHaveLength(3);
    const error = (await waitForFetchMockResultFulfillment(1)) as Response;
    expect(error.status).toBe(HttpStatusCode.NOT_FOUND);
    const success = (await waitForFetchMockResultFulfillment(2)) as Response;
    expect(success.status).toBe(HttpStatusCode.OK);
    const finishedRequests2 = await advanceUntilRequestEnds();
    expect(finishedRequests2).toBe(4);
    const emittedErrors = getEmittedErrors();
    expect(emittedErrors).toHaveLength(1);
    expect(emittedErrors[0].isSessionPollingFailure).toBeTruthy();
  });

  it('Polling is started and stopped with oidcClient events.', async () => {
    initTests({ setValidSession: false, responses: [successfulResponse, successfulResponse, successfulResponse] });
    // this will start the poller
    expect(getHttpPollerShouldPollCalls()).toHaveLength(0);
    emitOidcClientStateChange({ state: oidcClientStates.VALID_SESSION, previousState: oidcClientStates.NO_SESSION });
    await waitFor(() => {
      expect(getHttpPollerStartCalls()).toHaveLength(1);
    });
    await waitUntilRequestStarted();
    // emit random event to check those won't interrupt polling
    currentBeacon.emit({ type: eventSignalType, namespace: oidcClientNamespace });
    const responses = await waitUntilRequestFinished();
    expect(responses).toHaveLength(1);
    expect(getHttpPollerShouldPollCalls()).toHaveLength(1);
    // this will stop the poller
    emitOidcClientStateChange({ state: oidcClientStates.NO_SESSION, previousState: oidcClientStates.VALID_SESSION });
    // one is automatically done on start, one after state change
    expect(getHttpPollerStopCalls()).toHaveLength(2);
    verifyPollingIsStopped({ assumedCurrentCount: 1 });
    // this will start the poller
    emitOidcClientStateChange({ state: oidcClientStates.VALID_SESSION, previousState: oidcClientStates.NO_SESSION });
    await waitUntilRequestStarted();
    // this will start and abort the poller
    emitOidcClientStateChange({ state: oidcClientStates.NO_SESSION, previousState: oidcClientStates.VALID_SESSION });
    // one abort is done on initial stop, then on each stop
    expect(mockMapForAbort.getListener('abort')).toHaveBeenCalledTimes(3);
    expect(getHttpPollerStopCalls()).toHaveLength(3);
    expect(getHttpPollerStartCalls()).toHaveLength(2);
  });
  it('Polling is started and stopped when user is renewed. No need to poll with old tokens', async () => {
    initTests({ setValidSession: true, responses: [successfulResponse, successfulResponse, successfulResponse] });
    await waitFor(() => {
      expect(getHttpPollerShouldPollCalls()).toHaveLength(0);
      expect(getHttpPollerStartCalls()).toHaveLength(1);
    });
    await waitUntilRequestFinished();
    currentBeacon.emit({
      type: eventSignalType,
      namespace: oidcClientNamespace,
      payload: { type: oidcClientEvents.USER_RENEWAL_STARTED },
    });
    expect(getHttpPollerStopCalls()).toHaveLength(1);
    currentBeacon.emit({
      type: eventSignalType,
      namespace: oidcClientNamespace,
      payload: { type: oidcClientEvents.USER_UPDATED, data: createUser() },
    });
    expect(getHttpPollerStartCalls()).toHaveLength(2);
  });
  it('Polling is not started again if renewal fails. No need to poll with old tokens', async () => {
    initTests({ setValidSession: true, responses: [successfulResponse, successfulResponse, successfulResponse] });
    await waitUntilRequestFinished();
    expect(getHttpPollerStartCalls()).toHaveLength(1);
    currentBeacon.emit({
      type: eventSignalType,
      namespace: oidcClientNamespace,
      payload: { type: oidcClientEvents.USER_RENEWAL_STARTED },
    });
    expect(getHttpPollerStopCalls()).toHaveLength(1);
    currentBeacon.emit({
      type: eventSignalType,
      namespace: oidcClientNamespace,
      payload: { type: oidcClientEvents.USER_UPDATED },
    });
    expect(getHttpPollerStartCalls()).toHaveLength(1);
  });
});
