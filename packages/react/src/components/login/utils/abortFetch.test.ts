import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';

import { createFetchAborter, isAbortError } from './abortFetch';
import { createControlledFetchMockUtil, waitForFetchMockCallIndexToExist } from '../testUtils/fetchMockTestUtil';
import { advanceUntilListenerCalled, listenToPromise } from '../testUtils/timerTestUtil';
import { getMockCallArgs } from '../../../utils/testHelpers';

type FetchAborter = ReturnType<typeof createFetchAborter>;

describe(`abortFetch`, () => {
  let fetchAborter: FetchAborter | undefined;
  const defaultResponse = 'resolved';
  const { waitUntilRequestStarted, waitUntilRequestFinished, cleanUp, setResponders } = createControlledFetchMockUtil();

  beforeAll(() => {
    enableFetchMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    await cleanUp();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  afterAll(() => {
    disableFetchMocks();
  });

  it(`does not interfere with fetch. Abort() can be called after completion.`, async () => {
    setResponders([{ path: '/home', defaultResponse }]);
    fetchAborter = createFetchAborter();
    const promise = fetch('http://www.domain.com/home', { signal: fetchAborter.getSignal() });
    await waitUntilRequestFinished();
    const response = await promise;
    const text = await response?.text();
    expect(text).toEqual(defaultResponse);
    expect(fetchAborter.isAborted()).toBeFalsy();
    expect(() => {
      (fetchAborter as FetchAborter).abort();
      (fetchAborter as FetchAborter).abort();
    }).not.toThrow();
    expect(fetchAborter.isAborted()).toBeTruthy();
  });

  it(`calling abort() aborts the fetch`, async () => {
    setResponders([{ path: '/home', defaultResponse }]);
    fetchAborter = createFetchAborter();
    const promiseListener = listenToPromise(fetch('http://www.domain.com/home', { signal: fetchAborter.getSignal() }));
    await waitUntilRequestStarted();
    fetchAborter.abort();
    await advanceUntilListenerCalled(promiseListener);
    const [error1] = getMockCallArgs(promiseListener);
    expect(fetchAborter.isAborted()).toBeTruthy();
    expect(isAbortError(error1 as Error)).toBeTruthy();
    expect(() => {
      (fetchAborter as FetchAborter).abort();
    }).not.toThrow();
  });

  it(`same signal can be used twice. Calling getSignal() returns a new abort signal and aborts the previous one. isAborted is reset to return false.`, async () => {
    setResponders([
      { path: '/home', defaultResponse, delay: 5000 },
      { path: '/contacts', defaultResponse, delay: 500 },
    ]);
    fetchAborter = createFetchAborter();
    const signal = fetchAborter.getSignal();
    const promiseListener1 = listenToPromise(fetch('http://www.domain.com/home', { signal }));
    const promiseListener2 = listenToPromise(fetch('http://www.domain.com/contacts', { signal }));
    await waitForFetchMockCallIndexToExist(1);
    const newSignal = fetchAborter.getSignal();
    const [error1] = await advanceUntilListenerCalled(promiseListener1);
    const [error2] = await advanceUntilListenerCalled(promiseListener1);
    await advanceUntilListenerCalled(promiseListener2);
    expect(isAbortError(error1 as Error)).toBeTruthy();
    expect(isAbortError(error2 as Error)).toBeTruthy();
    expect(newSignal).not.toBe(signal);
    expect(fetchAborter.isAborted()).toBeFalsy();
    const promiseListener3 = listenToPromise(fetch('http://www.domain.com/home', { signal: newSignal }));
    await waitForFetchMockCallIndexToExist(2);
    fetchAborter.abort();
    const [error3] = await advanceUntilListenerCalled(promiseListener3);
    expect(isAbortError(error3 as Error)).toBeTruthy();
  });
});
