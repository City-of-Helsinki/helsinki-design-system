import { createUser } from '../testUtils/userTestUtil';
import { compareSignals, ConnectedModule, LISTEN_TO_ALL_MARKER, Signal, joinTypeAndNamespace } from './beacon';
import { errorSignalType, eventSignalType } from './signals';

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

    describe(`and returns true, `, () => {
      it(`if all source object key/value pairs match target key/value pairs`, async () => {
        allSources.forEach((signal) => {
          expect(compareSignals(signal, signal as Signal)).toBeTruthy();
        });
      });
      it(`also when target has more keys that source`, async () => {
        allSources.forEach((signal) => {
          expect(compareSignals(signal, ({ ...signal, extra: 'value' } as unknown) as Signal)).toBeTruthy();
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
    describe(`and returns false, `, () => {
      it(`if all source object key/value pairs does not match target key/value pairs`, async () => {
        allSignals.forEach((signal) => {
          expect(compareSignals({ ...signal, type: 'X' }, signal)).toBeFalsy();
          expect(compareSignals({ ...signal, namespace: 'X' }, signal)).toBeFalsy();
          expect(compareSignals({ ...signal, payload: { ...payloadA, ...payloadB } }, signal)).toBeFalsy();
          expect(
            compareSignals(
              { ...signal, context: ({ ...contextA, namespace: 'Z' } as unknown) as ConnectedModule },
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
          expect(compareSignals(({ ...signal, extra: 'value' } as unknown) as Signal, signal)).toBeFalsy();
        });
      });
    });
  });
});
