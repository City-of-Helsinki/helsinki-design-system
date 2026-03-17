// eslint-disable-next-line import/no-extraneous-dependencies
import { act } from '@testing-library/react';

import { getLastMockCallArgs } from '../../../utils/testHelpers';

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const { setImmediate: realSetImmediate } = require('timers');

export function createTimedPromise(response: unknown, delay = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (response instanceof Error) {
        reject(response);
        return;
      }
      resolve(response);
    }, delay);
  });
}

// Advance fake timers and flush pending React updates.
// Avoids using @testing-library's waitFor because dom v8's waitFor polls via
// faked setTimeout, creating recursive timer advancement that rapidly burns
// through the timeout when advanceTimersByTime is called inside the callback.
async function advanceAndFlush(advanceTime: number) {
  await act(async () => {
    jest.advanceTimersByTime(advanceTime);
  });
  await new Promise<void>((resolve) => {
    realSetImmediate(resolve);
  });
}

export async function advanceUntilListenerCalled(listener: jest.Mock, advanceTime = 200) {
  for (let i = 0; i < 1000; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await advanceAndFlush(advanceTime);
    if (listener.mock.calls.length >= 1) {
      return getLastMockCallArgs(listener);
    }
  }
  expect(listener).toHaveBeenCalledTimes(1);
  return getLastMockCallArgs(listener);
}

export function listenToPromise(promise: Promise<unknown>, listener = jest.fn()) {
  promise.then(listener).catch(listener);
  return listener;
}

export async function advanceUntilPromiseResolved(promise: Promise<unknown>, advanceTime = 200) {
  const listener = listenToPromise(promise);
  await advanceUntilListenerCalled(listener, advanceTime);
  return listener;
}

export async function advanceUntilDoesNotThrow(func: () => unknown | Promise<unknown>, advanceTime = 200) {
  for (let i = 0; i < 1000; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await advanceAndFlush(advanceTime);
    try {
      func();
      return;
    } catch (e) {
      // retry
    }
  }
  expect(func).not.toThrow();
}

export async function advanceUntilPromiseResolvedAndReturnValue(promise: Promise<unknown>, advanceTime = 200) {
  const listener = await advanceUntilPromiseResolved(promise, advanceTime);
  return getLastMockCallArgs(listener)[0];
}

export async function createAdvancingPromiseResolver(promise: Promise<unknown>, advanceTime = 200) {
  return async () => {
    await advanceUntilPromiseResolvedAndReturnValue(promise, advanceTime);
  };
}

export function getPromiseResultLater(promise: Promise<unknown>, advanceTime = 200): () => Promise<unknown> {
  const listener = listenToPromise(promise);
  const getResult = async () => {
    return getLastMockCallArgs(listener)[0] || advanceUntilListenerCalled(listener, advanceTime)[0];
  };
  return getResult;
}
