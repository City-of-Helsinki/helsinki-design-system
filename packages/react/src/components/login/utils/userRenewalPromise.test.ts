import { User, SigninResponse } from 'oidc-client-ts';
import to from 'await-to-js';
import { waitFor } from '@testing-library/react';

import { createRenewalTrackingPromise } from './userRenewalPromise';
import { createOidcClientTestSuite } from '../testUtils/oidcClientTestUtil';
import { createRenewalTestUtil } from '../testUtils/renewalTestUtil';
import { isValidUser } from '../client/oidcClient';
import { createSignInResponse } from '../testUtils/userTestUtil';
import { advanceUntilListenerCalled, listenToPromise } from '../testUtils/timerTestUtil';
import { getLastMockCallArgs } from '../../../utils/testHelpers';

describe(`createRenewalTrackingPromise`, () => {
  const { initTests, cleanUp } = createOidcClientTestSuite();
  const { init } = createRenewalTestUtil();

  const initTestsWithResponse = async (response: SigninResponse | Error) => {
    const testData = await initTests({ userProps: {} });
    const { userManager } = testData;
    const testFunctions = init({ userManager });
    const fulfillmentListener = testFunctions.setListenerToRefreshResponse(response);
    const promise = createRenewalTrackingPromise(userManager);
    return { promise, fulfillmentListener, testFunctions };
  };

  beforeEach(async () => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  afterAll(() => {
    cleanUp();
  });
  it(`resolves after user is renewed and userLoaded event is raised. Returns a user`, async () => {
    const { promise, fulfillmentListener, testFunctions } = await initTestsWithResponse(createSignInResponse({}));
    const { getListener, raiseExpiringEvent } = testFunctions;
    raiseExpiringEvent();
    await advanceUntilListenerCalled(fulfillmentListener);
    const [, user] = await to(promise);
    expect(isValidUser(user as User)).toBeTruthy();
    expect(fulfillmentListener).toHaveBeenCalledTimes(1);
    expect(getListener('expiring')).toHaveBeenCalledTimes(1);
    expect(getListener('userLoaded')).toHaveBeenCalledTimes(1);
  });
  it(`rejects when renewal fails.`, async () => {
    const { promise, fulfillmentListener, testFunctions } = await initTestsWithResponse(new Error('Fail'));
    const { getListener, raiseExpiringEvent } = testFunctions;
    // cannot use await to() here, because promise must first be fulfilled with fake timers
    const promiseListener = listenToPromise(promise);
    raiseExpiringEvent();
    await advanceUntilListenerCalled(fulfillmentListener);
    await waitFor(() => {
      expect(promiseListener).toBeCalledTimes(1);
    });
    expect(getLastMockCallArgs(promiseListener)[0]).toBeInstanceOf(Error);
    expect(fulfillmentListener).toHaveBeenCalledTimes(1);
    expect(getListener('expiring')).toHaveBeenCalledTimes(1);
    expect(getListener('userLoaded')).toHaveBeenCalledTimes(0);
    expect(getListener('error')).toHaveBeenCalledTimes(1);
  });

  it(`rejects when user is unloaded while renewing. For example when logging out`, async () => {
    const { promise, fulfillmentListener, testFunctions } = await initTestsWithResponse(new Error('Fail'));
    const { raiseExpiringEvent, raiseUnloadedEvent } = testFunctions;
    // cannot use await to() here because promise is rejected immediately.
    // and promise must be fulfilled with fake timers
    const promiseListener = listenToPromise(promise);
    raiseExpiringEvent();
    raiseUnloadedEvent();
    await advanceUntilListenerCalled(fulfillmentListener);
    await waitFor(() => {
      expect(promiseListener).toBeCalledTimes(1);
    });
    expect(getLastMockCallArgs(promiseListener)[0]).toBeInstanceOf(Error);
    expect(fulfillmentListener).toHaveBeenCalledTimes(1);
  });
});
