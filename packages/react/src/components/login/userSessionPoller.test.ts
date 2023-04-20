import { User, UserManager } from 'oidc-client-ts';
import HttpStatusCode from 'http-status-typed';
import { waitFor } from '@testing-library/react';

import { HttpPoller, HttpPollerProps } from './utils/httpPoller';
import { createTestSuite, createTimedMockFetchSuite } from './testUtil';
import createUserSessionPoller, { UserSessionPoller } from './userSessionPoller';

const mockTrackers = new Map<string, jest.SpyInstance | jest.Mock>();
const getMockTracker = (name: string) => {
  return mockTrackers.get(name) as jest.Mock;
};

const getSpyTracker = (name: string) => {
  return mockTrackers.get(name) as jest.SpyInstance;
};

const { mockAddHttpPollerSpies, restoreHttpPollerSpies } = createTestSuite();
let mockedHttpPollerSpies: ReturnType<typeof mockAddHttpPollerSpies>;
let mockCurrentHttpPoller: HttpPoller;
const mockActualHttpPoller = jest.requireActual('./utils/httpPoller');
jest.mock('./utils/httpPoller', () => ({
  __esModule: true,
  default: (props: HttpPollerProps) => {
    if (mockCurrentHttpPoller) {
      mockCurrentHttpPoller.stop();
    }
    mockCurrentHttpPoller = mockActualHttpPoller.default(props) as HttpPoller;
    mockedHttpPollerSpies = mockAddHttpPollerSpies(mockCurrentHttpPoller, props.pollIntervalInMs as number);
    return mockCurrentHttpPoller;
  },
  isSuccessfulHttpResponse: (...args: unknown[]) => mockActualHttpPoller.isSuccessfulHttpResponse(...args),
}));

const mockActualAbortFetch = jest.requireActual('./utils/abortFetch');

jest.mock('./utils/abortFetch', () => ({
  __esModule: true,
  createFetchAborter: () => {
    const aborter = mockActualAbortFetch.createFetchAborter();
    mockTrackers.set('abort', jest.spyOn(aborter, 'abort'));
    mockTrackers.set('getSignal', jest.spyOn(aborter, 'getSignal'));
    return aborter;
  },
  isAbortError: (error: Error) => {
    return mockActualAbortFetch.isAbortError(error);
  },
}));

const { createUser } = createTestSuite();
let currentUser: User | undefined;
let currentPoller: UserSessionPoller;
const endPoint = 'http://userinfo.net';

const createMockUserManager = (): UserManager => {
  mockTrackers.set('getUserInfoEndpoint', jest.fn());
  const manager = {
    metadataService: {
      getUserInfoEndpoint: async () => {
        getMockTracker('getUserInfoEndpoint')();
        return Promise.resolve(endPoint);
      },
    },
    getUser: () => {
      return Promise.resolve(currentUser);
    },
  };

  return manager as UserManager;
};

describe(`userSessionPoller`, () => {
  const fetchTestSuite = createTimedMockFetchSuite();
  const userManager = createMockUserManager();
  const onError = jest.fn();
  const shouldPollListener = jest.fn();
  const validResponse = 'Ok';
  const successfulResponse = { invalidUser: false, returnedStatus: HttpStatusCode.OK };
  const errorResponse = { invalidUser: false, returnedStatus: HttpStatusCode.NOT_FOUND };
  const forbiddenResponse = { invalidUser: false, returnedStatus: HttpStatusCode.FORBIDDEN };
  const unauthorizedResponse = { invalidUser: false, returnedStatus: HttpStatusCode.UNAUTHORIZED };

  const createPoller = (maxCallCount = -1) => {
    let callCount = -1;
    const shouldPoll = jest.fn().mockImplementation(() => {
      shouldPollListener();
      callCount += 1;
      return maxCallCount === -1 || callCount < maxCallCount;
    });
    currentPoller = createUserSessionPoller({ userManager, onError, shouldPoll, pollIntervalInMs: 20000 });
    return currentPoller;
  };

  const addResponses = ({ invalidUser, returnedStatus }: { invalidUser: boolean; returnedStatus?: HttpStatusCode }) => {
    currentUser = createUser({ invalidUser });
    if (returnedStatus) {
      fetchTestSuite.addFetchResponse({ status: returnedStatus, body: validResponse });
    } else {
      fetchTestSuite.addFetchResponse(new Error('Fetch failed'));
    }
  };

  const waitForNextPollStart = async ({ assumedCurrentCount = -1 }: { assumedCurrentCount?: number } = {}): Promise<
    number
  > => {
    if (assumedCurrentCount > -1) {
      expect(shouldPollListener).toHaveBeenCalledTimes(assumedCurrentCount);
    }
    const currentCallCount = shouldPollListener.mock.calls.length;
    const currentPollCount = assumedCurrentCount > -1 ? assumedCurrentCount : currentCallCount;
    if (assumedCurrentCount > -1 && currentCallCount !== assumedCurrentCount) {
      throw new Error(
        `ShouldPoll current call count (${currentCallCount}) does not match assumed current count (${assumedCurrentCount})`,
      );
    }
    mockedHttpPollerSpies.jumpToNextPoll();
    await waitFor(() => {
      expect(shouldPollListener).toHaveBeenCalledTimes(currentPollCount + 1);
    });

    return currentPollCount;
  };

  const waitForNextPollStartAndFetchFinish = async ({
    assumedCurrentCount = -1,
  }: { assumedCurrentCount?: number } = {}) => {
    const resultIndex = await waitForNextPollStart({ assumedCurrentCount });
    await fetchTestSuite.waitForFetchMockResult(resultIndex);
  };

  const startPollingAndWaitForPollStart = async (maxCallCount?: number) => {
    addResponses(successfulResponse);
    const sessionPoller = createPoller(maxCallCount);
    sessionPoller.start();
    await waitForNextPollStart({ assumedCurrentCount: 0 });
    expect(mockedHttpPollerSpies.getStartCallCount()).toBe(1);
    return sessionPoller;
  };

  const startPollingAndReturnFirstFetchArgs = async () => {
    await startPollingAndWaitForPollStart();
    const call = await fetchTestSuite.waitForFetchMockCall(0);
    return {
      url: call[0],
      options: call[1] as Parameters<typeof fetch>[1],
    };
  };

  const verifyPollingIsStopped = ({ assumedCurrentCount = -1 }: { assumedCurrentCount?: number } = {}) => {
    if (assumedCurrentCount > -1) {
      expect(shouldPollListener).toHaveBeenCalledTimes(assumedCurrentCount);
    }
    const shouldPollCount = shouldPollListener.mock.calls.length;
    const fetchCount = fetchTestSuite.getFetchCalls().length;
    mockedHttpPollerSpies.jumpToNextPoll();
    mockedHttpPollerSpies.jumpToNextPoll();
    mockedHttpPollerSpies.jumpToNextPoll();
    expect(shouldPollListener).toHaveBeenCalledTimes(shouldPollCount);
    expect(fetchTestSuite.getFetchCalls()).toHaveLength(fetchCount);
  };

  beforeAll(() => {
    fetchTestSuite.beforeAll();
  });

  afterAll(() => {
    fetchTestSuite.afterAll();
  });

  beforeEach(() => {
    fetchTestSuite.beforeEach();
  });

  afterEach(async () => {
    currentPoller.stop();
    await fetchTestSuite.afterEach(true);
    restoreHttpPollerSpies();
    // jest.resetAllMocks() cannot be used, because it breaks tests.
    shouldPollListener.mockReset();
    onError.mockReset();
    currentUser = undefined;
    mockedHttpPollerSpies.verifyPollerIsStopped();
  });

  it('.start() calls httpPoller.start() and given shouldPoll() before each fetch. Abort signal is created.', async () => {
    await startPollingAndWaitForPollStart();
    const [, result] = await fetchTestSuite.waitForFetchMockResult(0);
    const resultText = await result?.text();
    expect(resultText).toBe(validResponse);
    expect(getSpyTracker('getSignal')).toHaveBeenCalledTimes(1);
    addResponses(successfulResponse);
    await waitForNextPollStartAndFetchFinish({ assumedCurrentCount: 1 });
    addResponses(successfulResponse);
    await waitForNextPollStartAndFetchFinish({ assumedCurrentCount: 2 });
    addResponses(successfulResponse);
    await waitForNextPollStartAndFetchFinish({ assumedCurrentCount: 3 });
  });
  it('fetch calls are not done, if shouldPoll returns false. ShouldPoll is called until stopped', async () => {
    const poller = createPoller(0);
    poller.start();
    await waitForNextPollStart();
    expect(fetchTestSuite.getFetchCalls()).toHaveLength(0);
    await waitForNextPollStart({ assumedCurrentCount: 1 });
    await waitForNextPollStart({ assumedCurrentCount: 2 });
    poller.stop();
    mockedHttpPollerSpies.jumpToNextPoll();
    expect(shouldPollListener).toHaveBeenCalledTimes(3);
    expect(fetchTestSuite.getFetchCalls()).toHaveLength(0);
  });
  it(".stop() aborts the fetch and stops the poller. Aborting won't trigger onError callback", async () => {
    await startPollingAndWaitForPollStart();
    await fetchTestSuite.waitForFetchMockCall(0);
    expect(shouldPollListener).toHaveBeenCalledTimes(1);
    expect(fetchTestSuite.getFetchCalls()).toHaveLength(1);
    currentPoller.stop();
    expect(getSpyTracker('abort')).toHaveBeenCalledTimes(1);
    const [error] = await fetchTestSuite.waitForFetchMockResult(0);
    expect(error).toBeDefined();
    expect(onError).toHaveBeenCalledTimes(0);
    verifyPollingIsStopped({ assumedCurrentCount: 1 });
    expect(fetchTestSuite.getFetchCalls()).toHaveLength(1);
  });
  it('.stop() and start can be called multiple times', async () => {
    const poller = await startPollingAndWaitForPollStart();
    await fetchTestSuite.waitForFetchMockCall(0);
    poller.stop();
    poller.stop();
    poller.start();
    poller.start();
    poller.stop();
    poller.stop();
    expect(shouldPollListener).toHaveBeenCalledTimes(1);
    poller.start();
    await waitForNextPollStartAndFetchFinish({ assumedCurrentCount: 1 });
  });
  it("fetch url is picked from userManager's getUserInfoEndpoint(), signal and accessToken are in header", async () => {
    const { url, options } = await startPollingAndReturnFirstFetchArgs();
    expect(url).toBe(endPoint);
    expect(options?.signal).not.toBeUndefined();
    const authorizationHeader = (options?.headers as Headers).get('authorization') as string;
    expect(authorizationHeader.includes(String(currentUser?.access_token))).toBeTruthy();
    await fetchTestSuite.waitForFetchMockResult(0);
  });
  it('when fetch fails and statusCode indicates an auth error, the onError is called and polling is stopped ', async () => {
    await startPollingAndWaitForPollStart();
    expect(shouldPollListener).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledTimes(0);
    addResponses(forbiddenResponse);
    await waitForNextPollStartAndFetchFinish({ assumedCurrentCount: 1 });
    expect(onError).toHaveBeenCalledTimes(1);
    // so far one successfull and one error fetch
    verifyPollingIsStopped({ assumedCurrentCount: 2 });
    // start again
    addResponses(unauthorizedResponse);
    currentPoller.start();
    await waitForNextPollStartAndFetchFinish({ assumedCurrentCount: 2 });
    verifyPollingIsStopped({ assumedCurrentCount: 3 });
    expect(onError).toHaveBeenCalledTimes(2);
  });
  it('when fetch fails and statusCode DOES NOT indicate an auth error, the onError is NOT called and polling is NOT stopped', async () => {
    await startPollingAndWaitForPollStart();
    await fetchTestSuite.waitForFetchMockResult(0);
    addResponses(errorResponse);
    addResponses(successfulResponse);
    addResponses(successfulResponse);
    expect(shouldPollListener).toHaveBeenCalledTimes(1);
    await waitForNextPollStartAndFetchFinish({ assumedCurrentCount: 1 });
    expect(onError).toHaveBeenCalledTimes(0);
    // when non-auth error occurs, shouldPoll() is called right after to verify should polling be continued.
    // so shouldPollListener has +2 calls
    expect(shouldPollListener).toHaveBeenCalledTimes(3);
    await waitForNextPollStartAndFetchFinish({ assumedCurrentCount: 3 });
    expect(onError).toHaveBeenCalledTimes(0);
  });
  it('polling can be started and stopped at any time', async () => {
    addResponses(successfulResponse);
    addResponses(successfulResponse);
    addResponses(successfulResponse);
    addResponses(successfulResponse);
    const poller = await startPollingAndWaitForPollStart();
    poller.stop();
    verifyPollingIsStopped({ assumedCurrentCount: 1 });
    expect(shouldPollListener).toHaveBeenCalledTimes(1);
    poller.start();
    await waitForNextPollStartAndFetchFinish({ assumedCurrentCount: 1 });
    await waitForNextPollStart({ assumedCurrentCount: 2 });
    poller.stop();
    verifyPollingIsStopped({ assumedCurrentCount: 3 });
    poller.start();
    await waitForNextPollStartAndFetchFinish({ assumedCurrentCount: 3 });
    expect(shouldPollListener).toHaveBeenCalledTimes(4);
    expect(fetchTestSuite.getFetchCalls()).toHaveLength(4);
    poller.stop();
  });
});
