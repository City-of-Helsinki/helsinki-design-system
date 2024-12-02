import { disableFetchMocks } from 'jest-fetch-mock';
import { waitFor } from '@testing-library/dom';

import { createApiTokenClient } from './apiTokensClient';
import { Beacon, createBeacon, Signal, SignalTriggerProps } from '../beacon/beacon';
import { createApiTokenClientTracker } from './createApiTokenClientTracker';
import { apiTokensClientEvents, TokenData } from './index';
import { createInitTriggerProps, errorSignalType } from '../beacon/signals';
import { apiTokensClientError, ApiTokensClientError, ApiTokensClientErrorType } from './apiTokensClientError';
import { advanceUntilPromiseResolved } from '../testUtils/timerTestUtil';
import { createApiTokensClientEventSignal, createApiTokensClientEventTriggerProps } from './signals';
import { getLastMockCallArgs } from '../../../utils/testHelpers';

type InitProps = {
  trackerProps?: Parameters<typeof createApiTokenClientTracker>[0];
  tokens?: TokenData;
  isRenewing?: boolean;
  autoConnect?: boolean;
  init?: boolean;
};

describe(`createApiTokenClientTracker`, () => {
  let currentBeacon: Beacon;
  let currentTracker: ReturnType<typeof createApiTokenClientTracker>;
  const tokenData: TokenData = { first: '1', second: '2' };
  const newTokenData: TokenData = { first: '1.1', second: '2.1', third: '3.1' };
  const newestTokenData: TokenData = { first: '1.2', second: '2.2', third: '3.2', fourth: '4.2' };
  const onChangeTracker = jest.fn();
  const getLastChangedTokens = () => {
    return getLastMockCallArgs(onChangeTracker)[0];
  };
  const initTests = ({ trackerProps = {}, tokens, autoConnect, isRenewing, init }: InitProps) => {
    const tokenStorage: [TokenData | null] = [tokens || null];
    const renewalStorage: [boolean] = [!!isRenewing];

    const apiTokensClient = createApiTokenClient({ url: '/does-not-matter' });
    const getTokensSpy = jest.spyOn(apiTokensClient, 'getTokens').mockImplementation(() => {
      return tokenStorage[0];
    });
    const isRenewingSpy = jest.spyOn(apiTokensClient, 'isRenewing').mockImplementation(() => {
      return renewalStorage[0];
    });
    currentBeacon = createBeacon();
    currentBeacon.addSignalContext(apiTokensClient);
    currentTracker = createApiTokenClientTracker({ ...trackerProps, onChange: onChangeTracker });

    const emitApiTokenSignal = (signal: Partial<Signal>) => {
      currentBeacon.emit({ ...signal, namespace: apiTokensClient.namespace });
    };

    const emitInitSignal = () => {
      emitApiTokenSignal(createInitTriggerProps());
    };

    const emitUpdateSignal = (signalTokens: TokenData) => {
      const eventSignalProps = createApiTokensClientEventSignal({
        type: apiTokensClientEvents.API_TOKENS_UPDATED,
        data: signalTokens,
      });
      emitApiTokenSignal(eventSignalProps);
    };

    const emitRenewalSignal = () => {
      emitApiTokenSignal(
        createApiTokensClientEventTriggerProps({
          type: apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED,
        }),
      );
    };

    const emitRemovedSignal = () => {
      emitApiTokenSignal(
        createApiTokensClientEventTriggerProps({
          type: apiTokensClientEvents.API_TOKENS_REMOVED,
        }),
      );
    };

    const emitErrorSignal = (type: ApiTokensClientErrorType) => {
      const payload = new ApiTokensClientError('Error', type);
      emitApiTokenSignal({ type: errorSignalType, payload });
    };

    if (autoConnect) {
      currentTracker.connect(currentBeacon);
    }
    if (init) {
      emitInitSignal();
    }

    return {
      beacon: currentBeacon,
      tracker: currentTracker,
      getTokensSpy,
      emitInitSignal,
      emitUpdateSignal,
      emitRenewalSignal,
      emitRemovedSignal,
      emitErrorSignal,
      apiTokensClient,
      isRenewingSpy,
      setRenewalState: (state: boolean) => {
        renewalStorage[0] = state;
      },
      setTokens: (newTokens: TokenData) => {
        tokenStorage[0] = newTokens;
      },
    };
  };

  const initTestsWithConnectedAndInitalizedTokens = (
    trackerProps?: Parameters<typeof createApiTokenClientTracker>[0],
  ) => {
    return initTests({
      trackerProps,
      autoConnect: true,
      init: true,
      tokens: tokenData,
    });
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    currentTracker.dispose();
    onChangeTracker.mockClear();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  afterAll(() => {
    disableFetchMocks();
  });

  describe(`when tracker.connect() is called`, () => {
    it('listeners are added', async () => {
      const { beacon, tracker } = initTests({});
      const listenerSpy = jest.spyOn(beacon, 'addListener');
      tracker.connect(beacon);
      expect(listenerSpy).toHaveBeenCalledTimes(1);
      expect(onChangeTracker).toHaveBeenCalledTimes(0);
    });
    it('listeners are added removed if connect is called twice.', async () => {
      const { beacon, tracker } = initTests({});
      const disposerTracker = jest.fn();
      const listenerSpy = jest.spyOn(beacon, 'addListener').mockReturnValue(disposerTracker);
      const secondBeacon = createBeacon();
      const listenerSpy2 = jest.spyOn(secondBeacon, 'addListener').mockReturnValue(disposerTracker);
      tracker.connect(beacon);
      expect(listenerSpy).toHaveBeenCalledTimes(1);
      expect(disposerTracker).toHaveBeenCalledTimes(0);
      tracker.connect(secondBeacon);
      expect(listenerSpy).toHaveBeenCalledTimes(1);
      expect(listenerSpy2).toHaveBeenCalledTimes(1);
      expect(disposerTracker).toHaveBeenCalledTimes(1);
      expect(onChangeTracker).toHaveBeenCalledTimes(0);
    });
  });
  describe(`dispose()`, () => {
    it('removes all data and rejects on-going promise', async () => {
      const { beacon, tracker, emitRenewalSignal, emitUpdateSignal } = initTests({});
      let renewalSuccessful: boolean | null = null;
      tracker.connect(beacon);
      emitUpdateSignal(newTokenData);
      expect(onChangeTracker).toHaveBeenCalledTimes(1);
      expect(tracker.getTokens()).toMatchObject(newTokenData);
      emitRenewalSignal();
      // tokens are kept, so no change triggered.
      expect(onChangeTracker).toHaveBeenCalledTimes(1);
      tracker.waitForApiTokens().then((value) => {
        renewalSuccessful = value;
      });
      tracker.dispose();
      await waitFor(() => {
        expect(renewalSuccessful === false).toBe(true);
      });

      // start new renewal, which does nothing as listener are removed
      emitRenewalSignal();
      emitUpdateSignal(newestTokenData);
      expect(tracker.getTokens()).toMatchObject({});
      // should resolve immediately because there is no on-going renewal
      const ok = await tracker.waitForApiTokens();
      expect(ok).toBe(true);
      expect(onChangeTracker).toHaveBeenCalledTimes(1);
      // calling twice does not throw
      tracker.dispose();
      tracker.dispose();
      // dispose does not trigger change
      expect(onChangeTracker).toHaveBeenCalledTimes(1);
    });
  });
  describe(`when apiTokenClient init event is received`, () => {
    it('api tokens are stored', async () => {
      const initialTokens = { token1: 'token1' };
      const { tracker, emitInitSignal } = initTests({
        tokens: initialTokens,
        autoConnect: true,
      });
      emitInitSignal();
      expect(tracker.getTokens()).toMatchObject(initialTokens);
      expect(onChangeTracker).toHaveBeenCalledTimes(1);
      expect(getLastChangedTokens()).toMatchObject(initialTokens);
    });
    it('if renewal was in progress, a promise is created which adds new listeners to the beacon. Promise is resoved with new tokens.', async () => {
      const updatedTokens = { token1: 'updated1' };
      const { emitInitSignal, beacon, tracker, emitUpdateSignal } = initTests({
        autoConnect: false,
        isRenewing: true,
      });
      const listenerSpy = jest.spyOn(beacon, 'addListener');

      tracker.connect(beacon);
      expect(listenerSpy).toHaveBeenCalledTimes(1);
      emitInitSignal();
      expect(onChangeTracker).toHaveBeenCalledTimes(1);
      expect(listenerSpy).toHaveBeenCalledTimes(2);
      const renewalPromise = tracker.waitForApiTokens();
      emitUpdateSignal(updatedTokens);
      await renewalPromise;
      expect(tracker.getTokens()).toMatchObject(updatedTokens);
      expect(onChangeTracker).toHaveBeenCalledTimes(2);
      expect(getLastChangedTokens()).toMatchObject(updatedTokens);
    });
  });
  describe(`when apiTokenClient starts renewing`, () => {
    it('A listener is added that can cancel the promise. tracker.stopWaitingForTokens() emits the cancel event.', async () => {
      const { beacon, tracker, emitRenewalSignal } = initTests({
        autoConnect: true,
        init: true,
      });
      const listenerSpy = jest.spyOn(beacon, 'addListener');

      emitRenewalSignal();
      const renewalPromise = tracker.waitForApiTokens();
      expect(listenerSpy).toHaveBeenCalledTimes(1);
      tracker.stopWaitingForTokens();
      await renewalPromise;
      // test needs at least one "expect"
      expect(tracker.getTokens()).toBeDefined();
    });
    it('The listener timeouts in given time', async () => {
      const timeout = 4000;
      const { tracker, emitRenewalSignal } = initTests({
        trackerProps: { timeout },
        autoConnect: true,
        init: true,
      });

      emitRenewalSignal();
      const renewalPromise = tracker.waitForApiTokens();
      jest.advanceTimersByTime(timeout);
      await renewalPromise;
      expect(tracker.getTokens()).toBeDefined();
    });
    it('Given external signal triggers can cancel the promise', async () => {
      const rejectionSignalType = 'rejectIt';
      const rejectionSignalTrigger: SignalTriggerProps = { type: rejectionSignalType, namespace: 'anyspace' };
      const { beacon, tracker, emitRenewalSignal } = initTests({
        trackerProps: { rejectionSignalTrigger },
        autoConnect: true,
        init: true,
      });

      emitRenewalSignal();
      const renewalPromise = tracker.waitForApiTokens();
      beacon.emit(rejectionSignalTrigger as unknown as Signal);
      await renewalPromise;
      expect(tracker.getTokens()).toBeDefined();
    });
  });
  describe(`when apiTokenClient renewal is completed successfully`, () => {
    it('New tokens are stored. Promise is resolved. Old tokens are kept while renewing (default)', async () => {
      const tokens = tokenData;
      const { tracker, emitRenewalSignal, emitUpdateSignal } = initTestsWithConnectedAndInitalizedTokens();

      emitRenewalSignal();
      expect(tracker.getTokens()).toMatchObject(tokens);
      const renewalPromise = tracker.waitForApiTokens();
      emitUpdateSignal(newTokenData);
      await renewalPromise;
      expect(tracker.getTokens()).toMatchObject(newTokenData);
    });
    it('All update signals sets new tokens.', async () => {
      const { tracker, emitUpdateSignal } = initTestsWithConnectedAndInitalizedTokens();

      emitUpdateSignal(newTokenData);
      expect(tracker.getTokens()).toMatchObject(newTokenData);
      // first call was in init
      expect(onChangeTracker).toHaveBeenCalledTimes(2);
      expect(getLastChangedTokens()).toMatchObject(newTokenData);
      emitUpdateSignal(newestTokenData);
      expect(tracker.getTokens()).toMatchObject(newestTokenData);
      expect(onChangeTracker).toHaveBeenCalledTimes(3);
      expect(getLastChangedTokens()).toMatchObject(newestTokenData);
    });
    it('New tokens are stored also after a cancel event.', async () => {
      const { tracker, emitRenewalSignal, emitUpdateSignal } = initTestsWithConnectedAndInitalizedTokens();

      emitRenewalSignal();
      const renewalPromise = tracker.waitForApiTokens();
      tracker.stopWaitingForTokens();
      await renewalPromise;
      emitUpdateSignal(newTokenData);
      expect(tracker.getTokens()).toMatchObject(newTokenData);
    });
    it('if props.keepTokensWhileRenewing is false, tokens are cleared when renewal starts.', async () => {
      const { tracker, emitRenewalSignal, emitUpdateSignal } = initTestsWithConnectedAndInitalizedTokens({
        keepTokensWhileRenewing: false,
      });

      expect(onChangeTracker).toHaveBeenCalledTimes(1);
      emitRenewalSignal();
      expect(onChangeTracker).toHaveBeenCalledTimes(2);
      expect(Object.keys(getLastChangedTokens())).toHaveLength(0);
      expect(Object.keys(tracker.getTokens())).toHaveLength(0);
      const renewalPromise = tracker.waitForApiTokens();
      emitUpdateSignal(newTokenData);
      await renewalPromise;
      expect(tracker.getTokens()).toMatchObject(newTokenData);
      expect(onChangeTracker).toHaveBeenCalledTimes(3);
      expect(getLastChangedTokens()).toMatchObject(newTokenData);
    });
  });
  describe(`when apiTokenClient renewal fails`, () => {
    it('Promise is resolved. Tokens are cleared if keepTokensAfterRenewalError is not true (default false).', async () => {
      const { tracker, emitRenewalSignal, emitErrorSignal, emitUpdateSignal } =
        initTestsWithConnectedAndInitalizedTokens();

      emitRenewalSignal();
      const renewalPromise = tracker.waitForApiTokens();
      emitErrorSignal(apiTokensClientError.INVALID_API_TOKENS);
      await renewalPromise;
      expect(Object.keys(tracker.getTokens())).toHaveLength(0);
      expect(onChangeTracker).toHaveBeenCalledTimes(2);
      expect(Object.keys(getLastChangedTokens())).toHaveLength(0);
      emitUpdateSignal(newTokenData);
      expect(tracker.getTokens()).toMatchObject(newTokenData);
      emitRenewalSignal();
      const renewalPromise2 = tracker.waitForApiTokens();
      emitErrorSignal(apiTokensClientError.API_TOKEN_FETCH_FAILED);
      await renewalPromise2;
      expect(Object.keys(tracker.getTokens())).toHaveLength(0);
    });
    it('Tokens are not cleared if keepTokensAfterRenewalError is true.', async () => {
      const { tracker, emitRenewalSignal, emitErrorSignal } = initTestsWithConnectedAndInitalizedTokens({
        keepTokensAfterRenewalError: true,
      });

      expect(onChangeTracker).toHaveBeenCalledTimes(1);
      emitRenewalSignal();
      const renewalPromise = tracker.waitForApiTokens();
      emitErrorSignal(apiTokensClientError.INVALID_API_TOKENS);
      await renewalPromise;
      expect(Object.keys(tracker.getTokens())).toHaveLength(2);
      expect(onChangeTracker).toHaveBeenCalledTimes(1);
      expect(getLastChangedTokens()).toMatchObject(tokenData);
    });
  });
  describe(`when apiTokenClient removes tokens`, () => {
    it('Tokens are also removed from the util if props.keepTokensWhileRenewing is false. Default is true', async () => {
      const { tracker, emitRemovedSignal } = initTestsWithConnectedAndInitalizedTokens({
        keepTokensWhileRenewing: false,
      });

      expect(onChangeTracker).toHaveBeenCalledTimes(1);
      expect(Object.keys(tracker.getTokens())).toHaveLength(2);
      emitRemovedSignal();
      expect(Object.keys(tracker.getTokens())).toHaveLength(0);
      expect(onChangeTracker).toHaveBeenCalledTimes(2);
      expect(Object.keys(getLastChangedTokens())).toHaveLength(0);
    });
    it('Tokens are not removed from the util if props.keepTokensWhileRenewing is true', async () => {
      const { tracker, emitRemovedSignal } = initTestsWithConnectedAndInitalizedTokens();
      expect(Object.keys(tracker.getTokens())).toHaveLength(2);
      emitRemovedSignal();
      expect(Object.keys(tracker.getTokens())).toHaveLength(2);
      expect(onChangeTracker).toHaveBeenCalledTimes(1);
      expect(Object.keys(getLastChangedTokens())).toHaveLength(2);
    });
  });
  describe(`Multiple utils do not interfere with each others`, () => {
    const initWithMultipleTrackers = () => {
      const result = initTests({ tokens: tokenData });
      result.tracker.connect(result.beacon);
      result.emitInitSignal();
      const tracker2 = createApiTokenClientTracker({
        rejectionSignalTrigger: { type: 'tracker1', namespace: 'anyspace1' },
        keepTokensAfterRenewalError: true,
        timeout: 5000,
      });
      const tracker3 = createApiTokenClientTracker({
        rejectionSignalTrigger: { type: 'tracker1', namespace: 'anyspace1' },
        keepTokensWhileRenewing: false,
        timeout: 30000,
      });
      tracker2.connect(result.beacon);
      tracker3.connect(result.beacon);
      return {
        ...result,
        tracker2,
        tracker3,
      };
    };
    it('All receive signals', async () => {
      const { tracker, tracker2, tracker3, emitUpdateSignal, emitRenewalSignal } = initWithMultipleTrackers();

      expect(tracker.getTokens()).toMatchObject(tokenData);
      // tracker2 and tracker3 were added after init signal.
      expect(tracker2.getTokens()).toMatchObject({});
      expect(tracker3.getTokens()).toMatchObject({});
      emitRenewalSignal();
      const promise = Promise.all([
        tracker.waitForApiTokens(),
        tracker2.waitForApiTokens(),
        tracker3.waitForApiTokens(),
      ]);
      emitUpdateSignal(newTokenData);
      await promise;
      expect(tracker.getTokens()).toMatchObject(newTokenData);
      expect(tracker2.getTokens()).toMatchObject(newTokenData);
      expect(tracker3.getTokens()).toMatchObject(newTokenData);

      emitUpdateSignal(newestTokenData);
      await promise;
      expect(tracker.getTokens()).toMatchObject(newestTokenData);
      expect(tracker2.getTokens()).toMatchObject(newestTokenData);
      expect(tracker3.getTokens()).toMatchObject(newestTokenData);
    });
    it('All states change independently according to own settings.', async () => {
      const { tracker, tracker2, tracker3, emitUpdateSignal, emitRenewalSignal, emitRemovedSignal, emitErrorSignal } =
        initWithMultipleTrackers();

      emitUpdateSignal(newTokenData);
      emitRemovedSignal();
      expect(tracker.getTokens()).toMatchObject(newTokenData);
      expect(tracker2.getTokens()).toMatchObject(newTokenData);
      // tracker3 has keepTokensWhileRenewing: false
      expect(tracker3.getTokens()).toMatchObject({});

      // renewal with error
      emitRenewalSignal();
      const promise2 = Promise.all([
        tracker.waitForApiTokens(),
        tracker2.waitForApiTokens(),
        tracker3.waitForApiTokens(),
      ]);
      emitErrorSignal(apiTokensClientError.API_TOKEN_FETCH_FAILED);
      await promise2;
      expect(tracker.getTokens()).toMatchObject({});
      // tracker3 has keepTokensAfterRenewalError: true
      expect(tracker2.getTokens()).toMatchObject(newTokenData);
      // tracker3 has keepTokensWhileRenewing: false
      expect(tracker3.getTokens()).toMatchObject({});
    });
    it('Stopping a tracker do not stop others.', async () => {
      const { tracker, tracker2, tracker3, emitUpdateSignal, emitRenewalSignal } = initWithMultipleTrackers();

      emitUpdateSignal(newTokenData);
      expect(tracker.getTokens()).toMatchObject(newTokenData);
      expect(tracker2.getTokens()).toMatchObject(newTokenData);
      expect(tracker3.getTokens()).toMatchObject(newTokenData);
      emitRenewalSignal();
      const trackerPromise = tracker.waitForApiTokens();
      const tracker2Promise = tracker2.waitForApiTokens();
      const tracker3Promise = tracker3.waitForApiTokens();

      tracker.stopWaitingForTokens();
      await trackerPromise;

      tracker2.stopWaitingForTokens();
      await tracker2Promise;

      emitUpdateSignal(newestTokenData);
      await tracker3Promise;
      expect(tracker.getTokens()).toMatchObject({});
      expect(tracker2.getTokens()).toMatchObject({});
      expect(tracker3.getTokens()).toMatchObject(newestTokenData);
    });
    it('Timeouts work independently', async () => {
      const { tracker, tracker2, tracker3, emitUpdateSignal, emitRenewalSignal } = initWithMultipleTrackers();
      const resolveTracking = [false, false, false];

      emitUpdateSignal(newTokenData);
      expect(tracker.getTokens()).toMatchObject(newTokenData);
      expect(tracker2.getTokens()).toMatchObject(newTokenData);
      expect(tracker3.getTokens()).toMatchObject(newTokenData);
      emitRenewalSignal();
      // default timeout 15000ms
      const trackerPromise = tracker.waitForApiTokens().then(() => {
        resolveTracking[0] = true;
      });
      // timeout 5000ms
      const tracker2Promise = tracker2.waitForApiTokens().then(() => {
        resolveTracking[1] = true;
      });
      // timeout 30000ms
      const tracker3Promise = tracker3.waitForApiTokens().then(() => {
        resolveTracking[2] = true;
      });

      await advanceUntilPromiseResolved(tracker2Promise);
      expect(resolveTracking).toMatchObject([false, true, false]);

      await advanceUntilPromiseResolved(trackerPromise);
      expect(resolveTracking).toMatchObject([true, true, false]);

      await advanceUntilPromiseResolved(tracker3Promise);
      expect(resolveTracking).toMatchObject([true, true, true]);
    });
  });
});
