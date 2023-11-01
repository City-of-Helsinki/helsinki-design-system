import HttpStatusCode from 'http-status-typed';
import fetchMock, { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock';
import { waitFor } from '@testing-library/react';

import createHttpPoller, { HttpPoller, HttpPollerProps } from './httpPoller';
import { createFetchAborter } from './abortFetch';

type TestResponse = {
  status: HttpStatusCode.OK | HttpStatusCode.FORBIDDEN | -1;
  data?: string;
};

type TestProps = {
  requestResponses: TestResponse[];
  onErrorReturnValue: { keepPolling: boolean };
  shouldPollReturnValue: boolean;
};

const originalSetTimeout = global.setTimeout;
const setImmediate = (f: (value?: unknown) => void) => originalSetTimeout(f, 0);

describe(`httpPoller`, () => {
  const pollFunctionMockCallback = jest.fn();
  const onErrorMockCallback = jest.fn();
  const shouldPollMockCallback = jest.fn();
  const loadCallTracker = jest.fn();
  const onSuccessMockCallback = jest.fn();
  const intervalInMs = 200;
  let poller: HttpPoller;
  const forbiddenResponse: TestResponse = { status: HttpStatusCode.FORBIDDEN };
  const errorResponse: TestResponse = { status: -1 };
  const successResponse: TestResponse = { status: HttpStatusCode.OK };
  const pollerDefaultTestProps: TestProps = {
    requestResponses: [successResponse, successResponse, successResponse],
    onErrorReturnValue: { keepPolling: true },
    shouldPollReturnValue: true,
  };

  function createPoller(props: TestProps, onSuccess?: HttpPollerProps['onSuccess']): HttpPoller {
    const requestResponses = [...props.requestResponses];
    return createHttpPoller({
      pollFunction: async () => {
        pollFunctionMockCallback();
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            loadCallTracker();
            const response = requestResponses.shift() as Response;
            if (response.status === -1) {
              reject(new Error('An error'));
            } else {
              resolve(response);
            }
          }, intervalInMs * 2);
        });
      },
      onError: (returnedHttpStatus) => {
        onErrorMockCallback(returnedHttpStatus);
        return props.onErrorReturnValue;
      },
      shouldPoll: () => {
        shouldPollMockCallback();
        if (requestResponses.length === 0) {
          return false;
        }
        return props.shouldPollReturnValue;
      },
      onSuccess,
      pollIntervalInMs: intervalInMs,
    });
  }
  const advanceOneInterval = async () => {
    jest.advanceTimersByTime(intervalInMs + 1);
  };
  const advanceToTimerEnd = async () => {
    await advanceOneInterval();
  };
  const advanceFromTimerEndToLoadEnd = async () => {
    await advanceOneInterval();
    await advanceOneInterval();
    // https://stackoverflow.com/questions/52177631/jest-timer-and-promise-dont-work-well-settimeout-and-async-function
    await new Promise((resolve) => setImmediate(resolve));
  };
  const advanceFromStartTimerToLoadEnd = async () => {
    await advanceToTimerEnd();
    await advanceFromTimerEndToLoadEnd();
  };
  const advanceFromTimerEndToNextTimerEnd = async () => {
    await advanceFromTimerEndToLoadEnd();
    await advanceToTimerEnd();
  };
  beforeAll(() => {
    enableFetchMocks();
  });
  afterAll(() => {
    disableFetchMocks();
  });
  afterEach(() => {
    poller.stop();
    jest.resetAllMocks();
    jest.useRealTimers();
  });
  beforeEach(() => {
    jest.useFakeTimers();
  });
  describe('Calling start() starts the timer and when timer ends ', () => {
    it('the pollFunction and shouldPoll have been called continuously', async () => {
      poller = createPoller({
        ...pollerDefaultTestProps,
      });
      poller.start();
      expect(shouldPollMockCallback).not.toBeCalled();
      expect(pollFunctionMockCallback).not.toBeCalled();
      expect(onErrorMockCallback).not.toBeCalled();
      await advanceToTimerEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(1);
      expect(pollFunctionMockCallback).toHaveBeenCalledTimes(1);
      await advanceFromTimerEndToNextTimerEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(2);
      expect(pollFunctionMockCallback).toHaveBeenCalledTimes(2);
      expect(loadCallTracker).toHaveBeenCalledTimes(1);
      expect(onErrorMockCallback).toHaveBeenCalledTimes(0);
    });
    it('the pollFunction should not be called if shouldPoll returns false', async () => {
      poller = createPoller({
        ...pollerDefaultTestProps,
        shouldPollReturnValue: false,
      });
      poller.start();
      await advanceToTimerEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(1);
      expect(pollFunctionMockCallback).toHaveBeenCalledTimes(0);
      await advanceToTimerEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(2);
      expect(pollFunctionMockCallback).toHaveBeenCalledTimes(0);
    });
    it(`the onError is called with responseStatus when response status is not httpStatus.OK (200). 
        Polling continues when onError returns {keepPolling : true}`, async () => {
      poller = createPoller({
        ...pollerDefaultTestProps,
        requestResponses: [forbiddenResponse],
      });
      poller.start();
      await advanceFromStartTimerToLoadEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(1);
      expect(onErrorMockCallback).toHaveBeenCalledTimes(1);
      expect(onErrorMockCallback).toBeCalledWith(HttpStatusCode.FORBIDDEN);
      await advanceToTimerEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(2);
    });
    it(`the onError is called also on network error 
        and polling stops after error when onError returns {keepPolling : false}`, async () => {
      poller = createPoller({
        ...pollerDefaultTestProps,
        requestResponses: [errorResponse],
        onErrorReturnValue: { keepPolling: false },
      });
      poller.start();
      await advanceFromStartTimerToLoadEnd();
      expect(onErrorMockCallback).toHaveBeenCalledTimes(1);
      expect(onErrorMockCallback).toBeCalledWith(undefined);
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(1);
      expect(pollFunctionMockCallback).toHaveBeenCalledTimes(1);
      await advanceToTimerEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(1);
      expect(pollFunctionMockCallback).toHaveBeenCalledTimes(1);
    });
    it(`neither onError or onSuccess are called if request is aborted`, async () => {
      const fetchAborter = createFetchAborter();
      const timeoutListener = jest.fn();
      fetchMock.mockOnce(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              timeoutListener();
              resolve({});
            }, 1000);
          }),
      );
      poller = createHttpPoller({
        pollFunction: async () => fetch('http://domain.com', { signal: fetchAborter.getSignal() }),
        onError: (returnedHttpStatus) => {
          onErrorMockCallback(returnedHttpStatus);
          return { keepPolling: true };
        },
        shouldPoll: () => true,
        onSuccess: () => {
          onSuccessMockCallback();
          return { keepPolling: true };
        },
        pollIntervalInMs: intervalInMs,
      });
      poller.start();
      await waitFor(async () => {
        await advanceOneInterval();
        expect(fetchMock).toHaveBeenCalledTimes(1);
      });
      fetchAborter.abort();
      await waitFor(async () => {
        await advanceOneInterval();
        expect(timeoutListener).toHaveBeenCalledTimes(1);
      });
      expect(onErrorMockCallback).toHaveBeenCalledTimes(0);
      expect(onSuccessMockCallback).toHaveBeenCalledTimes(0);
    });
    it('Polling never starts if poller.stop is called', async () => {
      poller = createPoller({
        ...pollerDefaultTestProps,
      });
      poller.start();
      poller.stop();
      await advanceFromStartTimerToLoadEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(0);
      expect(pollFunctionMockCallback).toHaveBeenCalledTimes(0);
      expect(loadCallTracker).toHaveBeenCalledTimes(0);
    });
    it('Response is ignored if poller.stop is called after load has started', async () => {
      poller = createPoller({
        ...pollerDefaultTestProps,
        requestResponses: [forbiddenResponse],
      });
      poller.start();
      await advanceToTimerEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(1);
      expect(pollFunctionMockCallback).toHaveBeenCalledTimes(1);
      poller.stop();
      await advanceFromTimerEndToLoadEnd();
      expect(loadCallTracker).toHaveBeenCalledTimes(1);
      expect(onErrorMockCallback).toHaveBeenCalledTimes(0);
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(1);
      expect(pollFunctionMockCallback).toHaveBeenCalledTimes(1);
    });
    it('Multiple starts do not start multiple requests', async () => {
      poller = createPoller({
        ...pollerDefaultTestProps,
        requestResponses: [forbiddenResponse],
      });
      poller.start();
      poller.start();
      poller.start();
      await advanceToTimerEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(1);
      expect(pollFunctionMockCallback).toHaveBeenCalledTimes(1);
      poller.stop();
      await advanceFromTimerEndToLoadEnd();
      expect(onErrorMockCallback).toHaveBeenCalledTimes(0);
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(1);
      expect(pollFunctionMockCallback).toHaveBeenCalledTimes(1);
      expect(loadCallTracker).toHaveBeenCalledTimes(1);
    });
    it(`the onSuccess is called with response object when response is successful
        Polling continues when onSuccess returns { keepPolling: true }`, async () => {
      const onSuccess: HttpPollerProps['onSuccess'] = (response) => {
        onSuccessMockCallback(response);
        return { keepPolling: true };
      };
      poller = createPoller(pollerDefaultTestProps, onSuccess);
      poller.start();
      await advanceFromStartTimerToLoadEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(1);
      expect(onSuccessMockCallback).toHaveBeenCalledTimes(1);
      expect(onSuccessMockCallback).toBeCalledWith(pollerDefaultTestProps.requestResponses[0]);
      await advanceToTimerEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(2);
      expect(onSuccessMockCallback).toHaveBeenCalledTimes(1);
      await advanceFromTimerEndToLoadEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(2);
      expect(onSuccessMockCallback).toHaveBeenCalledTimes(2);
      await advanceFromStartTimerToLoadEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(3);
      expect(onSuccessMockCallback).toHaveBeenCalledTimes(3);
    });
    it(`polling is stopped if onSuccess returns { keepPolling: false }`, async () => {
      const onSuccess: HttpPollerProps['onSuccess'] = (response) => {
        onSuccessMockCallback(response);
        return { keepPolling: false };
      };
      poller = createPoller(pollerDefaultTestProps, onSuccess);
      poller.start();
      await advanceFromStartTimerToLoadEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(1);
      expect(onSuccessMockCallback).toHaveBeenCalledTimes(1);
      await advanceFromStartTimerToLoadEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(1);
      expect(onSuccessMockCallback).toHaveBeenCalledTimes(1);
      await advanceFromStartTimerToLoadEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(1);
      expect(onSuccessMockCallback).toHaveBeenCalledTimes(1);
    });
    it(`the onSuccess is not called when response was not successful`, async () => {
      const onSuccess: HttpPollerProps['onSuccess'] = (response) => {
        onSuccessMockCallback(response);
        return { keepPolling: false };
      };
      poller = createPoller(
        {
          ...pollerDefaultTestProps,
          requestResponses: [forbiddenResponse],
        },
        onSuccess,
      );
      poller.start();
      await advanceFromStartTimerToLoadEnd();
      expect(shouldPollMockCallback).toHaveBeenCalledTimes(1);
      expect(onErrorMockCallback).toHaveBeenCalledTimes(1);
      expect(onSuccessMockCallback).toHaveBeenCalledTimes(0);
    });
    it('the onSuccess is not called when poller.stop is called after load has started', async () => {
      const onSuccess: HttpPollerProps['onSuccess'] = (response) => {
        onSuccessMockCallback(response);
        return { keepPolling: false };
      };
      poller = createPoller(pollerDefaultTestProps, onSuccess);
      poller.start();
      await advanceToTimerEnd();
      poller.stop();
      await advanceFromTimerEndToLoadEnd();
      expect(loadCallTracker).toHaveBeenCalledTimes(1);
      expect(onSuccessMockCallback).toHaveBeenCalledTimes(0);
    });
  });
});
