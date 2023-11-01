import to from 'await-to-js';
import HttpStatusCode from 'http-status-typed';

import retryPollingUntilSuccessful, { RetryingPollerProps } from './httpPollerWithPromises';
import { HttpPollerProps } from './httpPoller';
import { getMockCalls } from '../../../utils/testHelpers';
import { advanceUntilDoesNotThrow } from '../testUtils/timerTestUtil';
import { createMockTestUtil } from '../testUtils/mockTestUtil';

type TestResponse = {
  status: HttpStatusCode.OK | HttpStatusCode.FORBIDDEN | -1;
  data?: string;
};

// all vars used in jest.mock must start with "mock"
const mockActualHttpPoller = jest.requireActual('./httpPoller');

const mockMapForHttpPoller = createMockTestUtil();

jest.mock('./httpPoller', () => ({
  __esModule: true,
  default: (props: HttpPollerProps) => {
    const poller = mockActualHttpPoller.default(props);
    mockMapForHttpPoller.reset();
    mockMapForHttpPoller.addSpy(poller, 'start');
    mockMapForHttpPoller.addSpy(poller, 'stop');
    return poller;
  },
  isSuccessfulHttpResponse: (...args: unknown[]) => mockActualHttpPoller.isSuccessfulHttpResponse(...args),
}));

const getStartCallCount = () => {
  return mockMapForHttpPoller.getCalls('start').length;
};

const getStopCallCount = () => {
  return mockMapForHttpPoller.getCalls('stop').length;
};

describe(`httpPollerWithPromises.ts`, () => {
  const pollFunctionMockCallback = jest.fn();
  const successfulResponse: TestResponse = {
    status: HttpStatusCode.OK,
    data: 'success',
  };
  const forbiddenResponse: TestResponse = { status: HttpStatusCode.FORBIDDEN };
  const errorResponse: TestResponse = { status: -1 };
  const responsesWithErrorForbiddenSuccess = [errorResponse, forbiddenResponse, successfulResponse];
  const pollIntervalInMs = 60000;
  const pollFunctionFulfillmentTime = 1000;
  let isResolved = false;
  let isRejected = false;

  function createPollingPromise(responses: TestResponse[], props?: Partial<RetryingPollerProps>): Promise<Response> {
    const list = [...responses];
    const retryPromise = retryPollingUntilSuccessful({
      pollFunction: async () => {
        pollFunctionMockCallback();
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const response = list.shift();
            if (!response || response.status === -1) {
              reject(new Error('An error'));
            }
            resolve(response as Response);
          }, pollFunctionFulfillmentTime);
        });
      },
      pollIntervalInMs,
      ...props,
    });
    retryPromise
      .then(() => {
        isResolved = true;
      })
      .catch(() => {
        isRejected = true;
      });
    return retryPromise;
  }

  beforeEach(() => {
    isResolved = false;
    isRejected = false;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.resetAllMocks();
    mockMapForHttpPoller.reset();
  });

  const advanceTimersToNextPoll = async () => {
    jest.advanceTimersByTime(pollIntervalInMs);
  };

  const waitForPollingToProceed = async ({ assumedCallCount = -1 }: { assumedCallCount?: number } = {}) => {
    expect(isResolved).toBeFalsy();
    expect(isRejected).toBeFalsy();
    const callCountBefore =
      assumedCallCount > -1 ? assumedCallCount - 1 : getMockCalls(pollFunctionMockCallback).length;
    const callCountAfter = callCountBefore + 1;
    await advanceUntilDoesNotThrow(() => {
      expect(pollFunctionMockCallback).toHaveBeenCalledTimes(callCountAfter);
    });
  };
  const waitForPollingToEnd = async ({ assumedState }: { assumedState?: 'resolved' | 'rejected' }) => {
    await advanceUntilDoesNotThrow(() => {
      expect(isResolved).toEqual(assumedState === 'resolved');
      expect(isRejected).toEqual(assumedState === 'rejected');
    });
  };

  it('First request is done immediately without httpPoller. Successful response is returned.', async () => {
    const promise = createPollingPromise([successfulResponse]);
    await waitForPollingToProceed({ assumedCallCount: 1 });
    await waitForPollingToEnd({
      assumedState: 'resolved',
    });
    const response = await promise;
    expect(response).toEqual(successfulResponse);
    expect(mockMapForHttpPoller.getListener('start')).toBeUndefined();
  });
  it(`If first request fails, httpPoller is started. 
      Promise is resolved, when request is successful.
      New attempts are not made after that. Successful response is returned.`, async () => {
    const promise = createPollingPromise(responsesWithErrorForbiddenSuccess);
    await waitForPollingToProceed({ assumedCallCount: 1 });
    advanceTimersToNextPoll();
    await waitForPollingToProceed({ assumedCallCount: 2 });
    advanceTimersToNextPoll();
    await waitForPollingToProceed({ assumedCallCount: 3 });
    await waitForPollingToEnd({
      assumedState: 'resolved',
    });
    const [err, response] = await to(promise);
    expect(err).toBeNull();
    expect(response).toEqual(successfulResponse);
    advanceTimersToNextPoll();
    advanceTimersToNextPoll();
    expect(pollFunctionMockCallback).toHaveBeenCalledTimes(3);
    expect(getStartCallCount()).toBe(1);
    expect(getStopCallCount()).toBe(1);
  });
  it(`maxRetries sets maximum number retries. 
      When maxRetries is reached, the promise is rejected 
      and new attempts are not made after that. 
      An error is returned.`, async () => {
    const promise = createPollingPromise(responsesWithErrorForbiddenSuccess, {
      maxRetries: 1,
    });

    await waitForPollingToProceed({ assumedCallCount: 1 });
    advanceTimersToNextPoll();
    await waitForPollingToProceed({ assumedCallCount: 2 });
    await waitForPollingToEnd({
      assumedState: 'rejected',
    });
    const [err, result] = await to(promise);
    expect(err).toBeDefined();
    expect(result).toBeUndefined();
    advanceTimersToNextPoll();
    advanceTimersToNextPoll();
    expect(pollFunctionMockCallback).toHaveBeenCalledTimes(2);
    expect(getStartCallCount()).toBe(1);
    expect(getStopCallCount()).toBe(1);
  });
  it(`If maxRetries is 0, only one request is done. HttpPoller is not started.`, async () => {
    const promise = createPollingPromise(responsesWithErrorForbiddenSuccess, {
      maxRetries: 0,
    });
    await waitForPollingToProceed({ assumedCallCount: 1 });
    advanceTimersToNextPoll();
    advanceTimersToNextPoll();
    await waitForPollingToEnd({
      assumedState: 'rejected',
    });
    const [err, result] = await to(promise);
    expect(err).toBeDefined();
    expect(result).toBeUndefined();
    advanceTimersToNextPoll();
    advanceTimersToNextPoll();
    expect(pollFunctionMockCallback).toHaveBeenCalledTimes(1);
    expect(getStartCallCount()).toBe(0);
    expect(getStopCallCount()).toBe(0);
  });
});
