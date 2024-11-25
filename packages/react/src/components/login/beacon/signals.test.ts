import { getLastMockCallArgs } from '../../../utils/testHelpers';
import { createTimedPromise } from '../testUtils/timerTestUtil';
import { createUser } from '../testUtils/userTestUtil';
import {
  compareSignals,
  ConnectedModule,
  LISTEN_TO_ALL_MARKER,
  Signal,
  joinTypeAndNamespace,
  createBeacon,
  splitTypeAndNamespace,
} from './beacon';
import {
  createErrorTriggerProps,
  createNamespacedBeacon,
  createTriggerForAllSignalTypes,
  createTriggerPropsForAllSignals,
  errorSignalType,
  eventSignalType,
  waitForSignals,
} from './signals';

describe(`signals`, () => {
  describe(`compareSignals checks, if given source (argument #0) matches the given target (argument #0)`, () => {
    const eventSignal = { type: eventSignalType };
    const errorSignal = { type: errorSignalType };
    const namespaceA = { namespace: 'namespaceA' };
    const namespaceB = { namespace: 'namespaceB' };
    const payloadA = { payload: { type: 'payloadTypeA', data: null } };
    const payloadB = { payload: { type: 'payloadTypeB', data: { user: createUser() } } };
    const contextA = { context: { namespace: 'contextA', connect: jest.fn() } as ConnectedModule };
    const contextB = { context: { namespace: 'contextA', connect: jest.fn() } as ConnectedModule };

    const eventSignalWithNamespaceA = { ...eventSignal, ...namespaceA };
    const eventSignalWithNamespaceB = { ...eventSignal, ...namespaceB };
    const eventSignalWithNamespaceAPayloadA = { ...eventSignalWithNamespaceA, ...payloadA };
    const eventSignalWithNamespaceBPayloadB = { ...eventSignalWithNamespaceB, ...payloadB };
    const eventSignalWithNamespaceAPayloadAContextA = {
      ...eventSignalWithNamespaceAPayloadA,
      ...contextA,
    };
    const eventSignalWithNamespaceBPayloadBContextB = {
      ...eventSignalWithNamespaceBPayloadB,
      ...contextB,
    };

    const plainObjects: Partial<Signal>[] = [
      eventSignal,
      errorSignal,
      namespaceA,
      namespaceB,
      payloadB,
      payloadA,
      contextA,
      contextB,
    ];

    const eventSignals: Signal[] = [
      eventSignal,
      eventSignalWithNamespaceB,
      eventSignalWithNamespaceAPayloadA,
      eventSignalWithNamespaceBPayloadB,
      eventSignalWithNamespaceAPayloadAContextA,
      eventSignalWithNamespaceBPayloadBContextB,
    ];
    const errorSignals = eventSignals.map((signal) => {
      return { ...signal, ...errorSignal };
    });

    const allSignals = [...eventSignals, ...errorSignals];
    const allSources = [...plainObjects, ...allSignals];

    describe(`and returns true,`, () => {
      it(`if all source object key/value pairs match target key/value pairs`, async () => {
        allSources.forEach((signal) => {
          expect(compareSignals(signal, signal as Signal)).toBeTruthy();
        });
      });
      it(`also when target has more keys that source`, async () => {
        allSources.forEach((signal) => {
          expect(compareSignals(signal, { ...signal, extra: 'value' } as unknown as Signal)).toBeTruthy();
        });
        eventSignals.forEach((signal) => {
          expect(compareSignals(signal, { ...eventSignalWithNamespaceBPayloadBContextB, ...signal })).toBeTruthy();
        });
      });
      it(`also when type is LISTEN_ALL_MARKER`, async () => {
        allSignals.forEach((signal) => {
          expect(compareSignals({ ...signal, type: LISTEN_TO_ALL_MARKER }, signal)).toBeTruthy();
        });
        allSignals.forEach((signal) => {
          expect(compareSignals(LISTEN_TO_ALL_MARKER, signal)).toBeTruthy();
        });
      });
      it(`also when namespace is LISTEN_ALL_MARKER`, async () => {
        allSignals.forEach((signal) => {
          expect(compareSignals({ ...signal, namespace: LISTEN_TO_ALL_MARKER }, signal)).toBeTruthy();
        });
      });
      it(`if argument #0 is string`, async () => {
        allSignals.forEach((signal) => {
          expect(compareSignals(joinTypeAndNamespace(signal), signal)).toBeTruthy();
          expect(compareSignals(joinTypeAndNamespace({ type: signal.type }), signal)).toBeTruthy();
          expect(compareSignals(joinTypeAndNamespace({ namespace: signal.namespace }), signal)).toBeTruthy();
          expect(
            compareSignals(joinTypeAndNamespace(signal, LISTEN_TO_ALL_MARKER, LISTEN_TO_ALL_MARKER), signal),
          ).toBeTruthy();
        });
      });
    });
    describe(`and returns false,`, () => {
      it(`if all source object key/value pairs does not match target key/value pairs`, async () => {
        allSignals.forEach((signal) => {
          expect(compareSignals({ ...signal, type: 'X' }, signal)).toBeFalsy();
          expect(compareSignals({ ...signal, namespace: 'X' }, signal)).toBeFalsy();
          expect(compareSignals({ ...signal, payload: { ...payloadA, ...payloadB } }, signal)).toBeFalsy();
          expect(
            compareSignals(
              { ...signal, context: { ...contextA, namespace: 'Z' } as unknown as ConnectedModule },
              signal,
            ),
          ).toBeFalsy();
        });
        eventSignals.forEach((evs) => {
          errorSignals.forEach((ers) => {
            expect(compareSignals(evs, ers)).toBeFalsy();
          });
        });
      });
      it(`also when source has more keys that target`, async () => {
        allSignals.forEach((signal) => {
          expect(compareSignals({ ...signal, extra: 'value' } as unknown as Signal, signal)).toBeFalsy();
        });
      });
    });
  });
  describe(`waitForSignals`, () => {
    const beacon = createBeacon();
    let result: Signal[] = [];
    const rejections: Error[] = [];

    const catchButThrow = (err) => {
      throw err;
    };
    const catchAndCollect = (err) => {
      rejections.push(err);
    };

    const checkResultIsNotSet = async () => {
      await createTimedPromise(null, 10);
      expect(result).toHaveLength(0);
    };
    const signalList = [
      'signal1:*',
      'signal2:namespace1',
      { type: 'signal3', namespace: 'namespace2' },
      createErrorTriggerProps('namespace3'),
    ];
    const fulfillingSignal = { type: 'fullfiller', namespace: 'X' };
    const signalListTypes = signalList.map((signal) => splitTypeAndNamespace(signal).type);
    const emitSignalAndCheckResult = async (index = -1) => {
      const signal = index === -1 ? { type: 'wrongSignal' } : splitTypeAndNamespace(signalList[index]);
      beacon.emit({
        ...signal,
        payload: { type: 'should not matter' },
        context: { namespace: 'any', connect: () => undefined },
      });
      await checkResultIsNotSet();
    };
    afterEach(() => {
      result.length = 0;
      rejections.length = 0;
    });
    it(`creates a promise which is fulfilled when all given signal triggers have been passed`, async () => {
      const promise = waitForSignals(beacon, signalList)
        .then((signals) => {
          result = signals;
        })
        .catch(catchButThrow);
      emitSignalAndCheckResult(-1);
      emitSignalAndCheckResult(0);
      emitSignalAndCheckResult(1);
      emitSignalAndCheckResult(2);
      emitSignalAndCheckResult(3);
      await promise;
      expect(result.map((signal) => signal.type)).toEqual(signalListTypes);
    });
    it(`signal order does not matter by default (options.strictOrder = false)`, async () => {
      const promise = waitForSignals(beacon, signalList, { allowSkipping: false })
        .then((signals) => {
          result = signals;
        })
        .catch(catchButThrow);
      emitSignalAndCheckResult(3);
      emitSignalAndCheckResult(1);
      emitSignalAndCheckResult(2);
      emitSignalAndCheckResult(0);
      await promise;
      expect(result.map((signal) => signal.type)).toEqual([
        signalListTypes[3],
        signalListTypes[1],
        signalListTypes[2],
        signalListTypes[0],
      ]);
    });
    it(`if options.allowSkipping is true (default), then all listed signals before the triggered one are marked as triggered. Results have only triggered signals.`, async () => {
      const promise = waitForSignals(beacon, signalList)
        .then((signals) => {
          result = signals;
        })
        .catch(catchButThrow);
      emitSignalAndCheckResult(1);
      emitSignalAndCheckResult(3);
      await promise;
      expect(result.map((signal) => signal.type)).toEqual([signalListTypes[1], signalListTypes[3]]);
    });
    it(`if options.allowSkipping is true (default), then one signal can fulfill the promise`, async () => {
      const promise = waitForSignals(beacon, [...signalList, ...signalList, fulfillingSignal])
        .then((signals) => {
          result = signals;
        })
        .catch(catchButThrow);
      beacon.emit(fulfillingSignal);
      await promise;
      expect(result.map((signal) => signal.type)).toEqual([fulfillingSignal.type]);
    });
    it(`if options.rejectsOn has triggers, any of the triggers will reject the promise`, async () => {
      const promise = waitForSignals(beacon, signalList, { rejectOn: signalList })
        .then((signals) => {
          result = signals;
        })
        .catch(catchAndCollect);
      emitSignalAndCheckResult(3);
      await promise;
      expect(result).toHaveLength(0);
      expect(rejections).toHaveLength(1);
    });
    it(`if options.allowSkipping is false, catching a signal in wrong order will reject`, async () => {
      const promise = waitForSignals(beacon, signalList, { strictOrder: true })
        .then((signals) => {
          result = signals;
        })
        .catch(catchAndCollect);
      emitSignalAndCheckResult(0);
      emitSignalAndCheckResult(2);
      await promise;
      expect(result).toHaveLength(0);
      expect(rejections).toHaveLength(1);
    });
  });
  describe(`createNamespacedBeacon()`, () => {
    const createBeaconAndDedicated = () => {
      const namespace1 = 'namespace1';
      const namespace2 = 'namespace2';
      const beacon = createBeacon();
      const dedicatedBeacon1 = createNamespacedBeacon(namespace1);
      const dedicatedBeacon2 = createNamespacedBeacon(namespace2);
      const listener1 = jest.fn();
      beacon.addListener(createTriggerForAllSignalTypes(), listener1);
      return {
        beacon,
        dedicatedBeacon1,
        dedicatedBeacon2,
        listener1,
        getLastSignal: (mock = listener1) => {
          return getLastMockCallArgs(mock)[0];
        },
        namespace1,
        namespace2,
        emitTestSignal: (namespace?: string, emittingBeacon = beacon) => {
          emittingBeacon.emit({
            type: 'testSignal',
            namespace,
            payload: {},
            context: { namespace: 'any', connect: () => undefined },
          });
        },
      };
    };

    it(`Without a stored beacon, it does not emit but does not throw either`, async () => {
      const { dedicatedBeacon1 } = createBeaconAndDedicated();
      expect(dedicatedBeacon1.getBeacon()).toBeUndefined();
      expect(dedicatedBeacon1.namespace).toBe('namespace1');
      expect(() => dedicatedBeacon1.emit('dedicated1')).not.toThrow();
      expect(() => dedicatedBeacon1.emitStateChange('state')).not.toThrow();
      expect(() => dedicatedBeacon1.emitError(new Error('error'))).not.toThrow();
      expect(() => dedicatedBeacon1.emitEvent('event')).not.toThrow();
    });
    it(`Listeners added before beacon are added after storeBeacon is called.`, async () => {
      const { beacon, dedicatedBeacon1, dedicatedBeacon2, emitTestSignal, namespace1, namespace2 } =
        createBeaconAndDedicated();
      const dedicatedBeacon1Listener = jest.fn();
      const dedicatedBeacon2Listener = jest.fn();
      dedicatedBeacon1.addListener(createTriggerPropsForAllSignals(namespace2), dedicatedBeacon1Listener);
      dedicatedBeacon2.addListener(createTriggerPropsForAllSignals(namespace1), dedicatedBeacon2Listener);
      dedicatedBeacon1.storeBeacon(beacon);
      dedicatedBeacon2.storeBeacon(beacon);
      emitTestSignal(namespace1);
      emitTestSignal(namespace1);
      expect(dedicatedBeacon1Listener).toHaveBeenCalledTimes(0);
      expect(dedicatedBeacon2Listener).toHaveBeenCalledTimes(2);
      emitTestSignal(namespace2);
      emitTestSignal(namespace2);
      expect(dedicatedBeacon1Listener).toHaveBeenCalledTimes(2);
      expect(dedicatedBeacon2Listener).toHaveBeenCalledTimes(2);
    });
    it(`Listeners added before beacon exists are moved to new beacon and old ones are disposed`, async () => {
      const { beacon, dedicatedBeacon1, emitTestSignal, namespace2 } = createBeaconAndDedicated();
      const beacon2 = createBeacon();
      const neverMovedDedicatedBeacon = createNamespacedBeacon('namespaceX');
      const neverMovedDedicatedListener = jest.fn();
      const dedicatedBeacon1Listener = jest.fn();
      dedicatedBeacon1.addListener(createTriggerPropsForAllSignals(namespace2), dedicatedBeacon1Listener);
      // dedicatedBeacon2 is never moved, so it receives all signals
      neverMovedDedicatedBeacon.addListener(createTriggerPropsForAllSignals(namespace2), neverMovedDedicatedListener);
      dedicatedBeacon1.storeBeacon(beacon);
      neverMovedDedicatedBeacon.storeBeacon(beacon);
      emitTestSignal(namespace2);
      expect(dedicatedBeacon1Listener).toHaveBeenCalledTimes(1);
      expect(neverMovedDedicatedListener).toHaveBeenCalledTimes(1);
      // Switch to new beacon
      dedicatedBeacon1.storeBeacon(beacon2);
      emitTestSignal(namespace2);
      expect(dedicatedBeacon1Listener).toHaveBeenCalledTimes(1);
      expect(neverMovedDedicatedListener).toHaveBeenCalledTimes(2);
      emitTestSignal(namespace2, beacon2);
      expect(dedicatedBeacon1Listener).toHaveBeenCalledTimes(2);
      expect(neverMovedDedicatedListener).toHaveBeenCalledTimes(2);

      // Switch to back to original beacon
      dedicatedBeacon1.storeBeacon(beacon);
      emitTestSignal(namespace2);
      expect(dedicatedBeacon1Listener).toHaveBeenCalledTimes(3);
    });
    it(`Listeners added after beacon is created are not moved just disposed. In actual usage, they are added when beacon is created.`, async () => {
      const { beacon, dedicatedBeacon1, emitTestSignal, namespace2 } = createBeaconAndDedicated();
      const beacon2 = createBeacon();
      const dedicatedBeacon1Listener = jest.fn();
      dedicatedBeacon1.addListener(createTriggerPropsForAllSignals(namespace2), dedicatedBeacon1Listener);
      dedicatedBeacon1.storeBeacon(beacon);
      const dedicatedBeacon1ListenerAddedAfterBeaconExists = jest.fn();
      dedicatedBeacon1.addListener(
        createTriggerPropsForAllSignals(namespace2),
        dedicatedBeacon1ListenerAddedAfterBeaconExists,
      );
      emitTestSignal(namespace2);
      expect(dedicatedBeacon1ListenerAddedAfterBeaconExists).toHaveBeenCalledTimes(1);
      expect(dedicatedBeacon1Listener).toHaveBeenCalledTimes(1);
      dedicatedBeacon1.storeBeacon(beacon2);
      emitTestSignal(namespace2);
      expect(dedicatedBeacon1ListenerAddedAfterBeaconExists).toHaveBeenCalledTimes(1);
      expect(dedicatedBeacon1Listener).toHaveBeenCalledTimes(1);
      emitTestSignal(namespace2, beacon2);
      expect(dedicatedBeacon1ListenerAddedAfterBeaconExists).toHaveBeenCalledTimes(1);
      expect(dedicatedBeacon1Listener).toHaveBeenCalledTimes(2);
    });
    it(`By default, the listeners ignore signals in its own namespace. Setting parameter "excludeOwn" to false, overrides it`, async () => {
      const { beacon, dedicatedBeacon1, emitTestSignal, namespace2, namespace1 } = createBeaconAndDedicated();
      const listener = jest.fn();
      const listenerAddedAfterBeaconExists = jest.fn();
      const listenerForAlsoOwnNamespace = jest.fn();
      const listenerForAlsoOwnNamespaceAddedAfterBeaconExists = jest.fn();

      dedicatedBeacon1.addListener(createTriggerPropsForAllSignals(namespace2), listener);
      dedicatedBeacon1.addListener(createTriggerPropsForAllSignals(), listenerForAlsoOwnNamespace, false);
      dedicatedBeacon1.storeBeacon(beacon);
      dedicatedBeacon1.addListener(createTriggerPropsForAllSignals(namespace2), listenerAddedAfterBeaconExists);
      dedicatedBeacon1.addListener(
        createTriggerPropsForAllSignals(),
        listenerForAlsoOwnNamespaceAddedAfterBeaconExists,
        false,
      );
      emitTestSignal(namespace2);
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listenerAddedAfterBeaconExists).toHaveBeenCalledTimes(1);
      expect(listenerForAlsoOwnNamespace).toHaveBeenCalledTimes(1);
      expect(listenerForAlsoOwnNamespaceAddedAfterBeaconExists).toHaveBeenCalledTimes(1);

      emitTestSignal(namespace1);
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listenerAddedAfterBeaconExists).toHaveBeenCalledTimes(1);
      expect(listenerForAlsoOwnNamespace).toHaveBeenCalledTimes(2);
      expect(listenerForAlsoOwnNamespaceAddedAfterBeaconExists).toHaveBeenCalledTimes(2);
    });
  });
});
