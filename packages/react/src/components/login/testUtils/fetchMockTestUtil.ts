/* eslint-disable import/no-extraneous-dependencies */
import fetchMock, { MockResponseInit } from 'jest-fetch-mock';
import { waitFor } from '@testing-library/react';

import { getLastMockCallArgs, hasListenerBeenCalled } from '../../../utils/testHelpers';
import { listenToPromise } from './timerTestUtil';

type FetchResponse = MockResponseInit | string | Error;
type FetchPromiseResult = Error | null | Response | undefined;

export type Responder = {
  path: string;
  defaultResponse?: FetchResponse;
  responses?: FetchResponse[];
  delay?: number;
  id?: string;
};

type RequestInfo = {
  requestListener: jest.Mock;
  responseListener: jest.Mock;
  promise?: Promise<FetchResponse>;
  responder: Responder;
};

export function createTimedFetchResponse(props: {
  response: FetchResponse;
  requestListener: jest.Mock;
  responseListener: jest.Mock;
  delay?: number;
}): Promise<string | MockResponseInit> {
  const { response, requestListener, responseListener, delay = 1000 } = props;
  return new Promise((resolve, reject) => {
    requestListener();
    setTimeout(() => {
      if (response instanceof Error) {
        reject(response);
      } else {
        resolve(response as MockResponseInit);
      }
      responseListener();
    }, delay);
  });
}

export function getFetchMockCalls() {
  return fetchMock.mock.calls;
}

export function getLastFetchMockCallArguments() {
  return getLastMockCallArgs(fetchMock);
}

export function getFetchMockResults() {
  return fetchMock.mock.results;
}

export async function waitForFetchMockResultIndexToExist(index: number, advanceTime = 0) {
  await waitFor(async () => {
    const mockResult = fetchMock.mock.results[index];
    if (!mockResult || !mockResult.value) {
      jest.advanceTimersByTime(advanceTime || 100);
      throw new Error(`No mock result at #${index}. There are ${fetchMock.mock.results.length} results.`);
    }
  });
  // return an array, because if the value is a promise, it is awaited for. Without advancing timers.
  return [fetchMock.mock.results[index].value];
}

export async function waitForFetchMockCallIndexToExist(index: number, advanceTime = 0) {
  await waitFor(async () => {
    const mockResult = fetchMock.mock.calls[index];
    if (!mockResult) {
      jest.advanceTimersByTime(advanceTime);
      throw new Error(`No mock call at #${index}. There are ${fetchMock.mock.calls.length} calls.`);
    }
  });
  return Promise.resolve(fetchMock.mock.calls[index]);
}

export async function waitForFetchMockResultFulfillment(index: number, advanceTime = 0): Promise<FetchPromiseResult> {
  const [response] = await waitForFetchMockResultIndexToExist(index, advanceTime);
  if (!response) {
    return Promise.resolve(new Error('no promise for waitForFetchMockResultFulfillment'));
  }
  if (!response.then) {
    return response;
  }
  const listener = listenToPromise(response);
  await waitFor(() => {
    if (!hasListenerBeenCalled(listener)) {
      jest.advanceTimersByTime(advanceTime || 100);
      throw new Error('Result is pending');
    }
  });
  return getLastMockCallArgs(listener)[0];
}

export function createControlledFetchMockUtil(responders?: Responder[]) {
  const history: RequestInfo[] = [];
  let responderList = responders ? [...responders] : [];

  fetchMock.mockResponse(async (req) => {
    const responder = responderList.find((res) => {
      return req.url.includes(res.path);
    });
    if (!responder) {
      return Promise.reject(new Error(`Unknown url ${req.url}`));
    }
    const { responses, defaultResponse, delay = 1000 } = responder;
    const response = (responses && responses.shift()) || defaultResponse || new Error('No response');

    const newRequestInfo: RequestInfo = {
      requestListener: jest.fn(),
      responseListener: jest.fn(),
      responder,
    };

    const promise = createTimedFetchResponse({
      response,
      requestListener: newRequestInfo.requestListener,
      responseListener: newRequestInfo.responseListener,
      delay,
    });

    newRequestInfo.promise = promise;
    history.push(newRequestInfo);
    return promise.finally(() => {
      newRequestInfo.promise = undefined;
    });
  });

  const getRequestsInfoById = (id: string) => {
    return history.filter((req) => req.responder.id === id);
  };

  const hasRequestStarted = (req: RequestInfo) => {
    return hasListenerBeenCalled(req.requestListener);
  };

  const hasRequestFinished = (req: RequestInfo) => {
    return hasListenerBeenCalled(req.responseListener);
  };

  const getNotStartedRequests = (list: RequestInfo[]) => {
    return list.filter((r) => !hasRequestStarted(r));
  };

  const getUnfinishedRequests = (list: RequestInfo[]) => {
    return list.filter((r) => !hasRequestFinished(r));
  };

  const getRequestResults = (list: RequestInfo[]): FetchResponse[] => {
    const finished = list.filter((r) => hasRequestFinished(r));
    return finished.map((req) => req.responseListener).map((listener) => getLastMockCallArgs(listener)[0]);
  };

  const getBiggestDelay = (list: RequestInfo[]) => {
    let max = 0;
    list.forEach((r) => {
      if (r.responder.delay) {
        max = Math.max(max, r.responder.delay);
      }
    });
    return max;
  };

  const getPendingRequests = (list: RequestInfo[]) => {
    return list.filter((r) => {
      if (!r.promise) {
        return false;
      }
      if (hasRequestStarted(r)) {
        return false;
      }
      return !hasRequestFinished(r);
    });
  };

  return {
    waitUntilRequestStarted: async ({
      id,
      advanceTime = 0,
      jumpToEnd,
    }: { id?: string; advanceTime?: number; jumpToEnd?: boolean } = {}) => {
      let targets = id ? getRequestsInfoById(id) : history;
      const advanceByTime = jumpToEnd ? getBiggestDelay(targets) : advanceTime;
      await waitFor(() => {
        jest.advanceTimersByTime(advanceByTime || 100);
        if (!targets.length && id) {
          targets = getRequestsInfoById(id);
        }
        if (!targets.length) {
          throw new Error('No request targets');
        }
        if (getNotStartedRequests(targets).length > 0) {
          throw new Error('Request not started');
        }
      });
    },
    waitUntilRequestFinished: async ({
      id,
      advanceTime = 0,
      jumpToEnd,
    }: { id?: string; advanceTime?: number; jumpToEnd?: boolean } = {}) => {
      let targets = id ? getRequestsInfoById(id) : history;
      const advanceByTime = jumpToEnd ? getBiggestDelay(targets) : advanceTime;
      await waitFor(() => {
        jest.advanceTimersByTime(advanceByTime || 100);
        if (!targets.length && id) {
          targets = getRequestsInfoById(id);
        }
        if (!targets.length) {
          throw new Error('No request targets');
        }
        if (getUnfinishedRequests(targets).length > 0) {
          throw new Error('Responses not finished');
        }
      });
      return getRequestResults(targets);
    },
    addResponder: (responder: Responder) => {
      responderList.push(responder);
    },
    setResponders: (newResponderList: Responder[]) => {
      responderList.length = 0;
      newResponderList.forEach((resp) => {
        responderList.push(resp);
      });
    },
    addResponse: (response: FetchResponse, id?: string) => {
      const idTargets = id ? responderList.filter((res) => res.id === id) : [];
      if (id && idTargets.length !== 1) {
        throw new Error(
          `No responder or too many responders (${idTargets.length}) with id "${id}" to target addResponse().`,
        );
      }
      if (!id && responderList.length !== 1) {
        throw new Error('No responder or too many responders to target addResponse()');
      }
      const addTo = idTargets[0] || responderList[0];
      if (addTo) {
        addTo.responses = addTo.responses || [];
        addTo.responses.push(response);
      }
    },
    getRequestsInfoById,
    hasRequestStarted,
    hasRequestFinished,
    cleanUp: async () => {
      if (!history.length) {
        return Promise.resolve();
      }
      const pending = getPendingRequests(history);
      await Promise.all(pending.map((req) => req.promise).filter((promise) => !!promise));
      history.length = 0;
      responderList = [];
      return Promise.resolve();
    },
    spyOnFetchMock: () => {
      const callStartCount = fetchMock.mock.calls.length;
      const resultStartCount = fetchMock.mock.results.length;
      return async ({
        waitForNewResult = 0,
        waitForNewCall = 0,
        advanceTime,
      }: { waitForNewResult?: number; waitForNewCall?: number; advanceTime?: number } = {}) => {
        if (!waitForNewCall) {
          // by default wait for just next result
          const increase = waitForNewResult || 1;
          return waitForFetchMockResultFulfillment(resultStartCount + increase, advanceTime);
        }
        return waitForFetchMockCallIndexToExist(callStartCount + waitForNewCall, advanceTime);
      };
    },
    getRequestCount: () => {
      return history.length;
    },
  };
}

export async function waitForFetchMockRequestsToFinish(advanceTime = 0) {
  await waitFor(async () => {
    const callLength = fetchMock.mock.calls.length;
    const resultsLength = fetchMock.mock.results.length;
    if (resultsLength < callLength) {
      jest.advanceTimersByTime(advanceTime || 100);
      throw new Error(`Pending mock call...`);
    }
  });
}

export async function getFetchMockResultsAfterAllFinished() {
  await waitForFetchMockRequestsToFinish();
  return Promise.resolve(getFetchMockResults);
}
