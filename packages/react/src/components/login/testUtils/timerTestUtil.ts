// eslint-disable-next-line import/no-extraneous-dependencies
import { waitFor } from '@testing-library/react';

import { getLastMockCallArgs } from '../../../utils/testHelpers';

export function createTimedPromise(response: unknown, delay = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (response instanceof Error) {
        reject(response);
      } else {
        resolve(response);
      }
    }, delay);
  });
}

export async function advanceUntilListenerCalled(listener: jest.Mock, advanceTime = 200) {
  await waitFor(() => {
    jest.advanceTimersByTime(advanceTime);
    expect(listener).toBeCalledTimes(1);
  });
  return getLastMockCallArgs(listener);
}

export function listenToPromise(promise: Promise<unknown>, listener = jest.fn()) {
  promise.then(listener).catch(listener);
  return listener;
}

export async function advanceUntilPromiseResolved(promise: Promise<unknown>, advanceTime = 200) {
  const listener = listenToPromise(promise);
  await advanceUntilListenerCalled(listener, advanceTime);
}

export async function advanceUntilDoesNotThrow(func: () => unknown | Promise<unknown>, advanceTime = 200) {
  await waitFor(() => {
    jest.advanceTimersByTime(advanceTime);
    expect(func).not.toThrow();
  });
}
