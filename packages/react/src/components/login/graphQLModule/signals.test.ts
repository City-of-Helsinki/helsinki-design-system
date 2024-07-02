/* eslint-disable jest/no-mocks-import */
import { GraphQLModuleEvent, graphQLModuleNamespace, graphQLModuleEvents } from '.';
import {
  createTriggerForAllNamespaces,
  createTriggerPropsForAllSignals,
  errorSignalType,
  eventSignalType,
  isEventSignal,
} from '../beacon/signals';
import {
  createGraphQLModuleErrorSignal,
  createGraphQLModuleEventSignal,
  isGraphQLModuleClearedSignal,
  isGraphQLModuleLoadAbortedSignal,
  isGraphQLModuleNoApiTokensErrorSignal,
  isGraphQLModuleNoClientErrorSignal,
  graphQLModuleLoadAbortedTrigger,
  graphQLModuleClearedTrigger,
  graphQLModuleLoadSuccessTrigger,
  graphQLModuleLoadingTrigger,
  noClientErrorTrigger,
  noApiTokensErrorTrigger,
  getGraphQLModuleEventPayload,
  isGraphQLModuleSignal,
  triggerForAllGraphQLModuleErrors,
  triggerForAllGraphQLModuleEvents,
  isGraphQLModuleLoadSuccessSignal,
  isGraphQLModuleLoadingSignal,
  loadFailedErrorTrigger,
  isGraphQLModuleLoadFailedSignal,
} from './signals';
import { SignalTrigger, createSignalTrigger } from '../beacon/beacon';
import { GraphQLModuleError, GraphQLModuleErrorType, graphQLModuleError } from './graphQLModuleError';
import { oidcClientNamespace } from '../client';
import { createQueryResponse } from './__mocks__/mockResponses';

describe(`Signals`, () => {
  const eventData = createQueryResponse();
  const eventChecks: Array<[typeof isGraphQLModuleClearedSignal, GraphQLModuleEvent, SignalTrigger]> = [
    [isGraphQLModuleClearedSignal, graphQLModuleEvents.GRAPHQL_MODULE_CLEARED, graphQLModuleClearedTrigger],
    [isGraphQLModuleLoadingSignal, graphQLModuleEvents.GRAPHQL_MODULE_LOADING, graphQLModuleLoadingTrigger],
    [
      isGraphQLModuleLoadSuccessSignal,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS,
      graphQLModuleLoadSuccessTrigger,
    ],
    [
      isGraphQLModuleLoadAbortedSignal,
      graphQLModuleEvents.GRAPHQL_MODULE_LOAD_ABORTED,
      graphQLModuleLoadAbortedTrigger,
    ],
  ];
  // create array of [basic signal, signal with more data] in same order as eventChecks
  const eventSignals = eventChecks.map(([, type]) => {
    return [createGraphQLModuleEventSignal({ type }), createGraphQLModuleEventSignal({ type, data: { foo: 'bar' } })];
  });
  const errorChecks: Array<[typeof isGraphQLModuleNoApiTokensErrorSignal, GraphQLModuleErrorType, SignalTrigger]> = [
    [isGraphQLModuleNoApiTokensErrorSignal, graphQLModuleError.GRAPHQL_NO_API_TOKENS, noApiTokensErrorTrigger],
    [isGraphQLModuleNoClientErrorSignal, graphQLModuleError.GRAPHQL_NO_CLIENT, noClientErrorTrigger],
    [isGraphQLModuleLoadFailedSignal, graphQLModuleError.GRAPHQL_LOAD_FAILED, loadFailedErrorTrigger],
  ];
  const errorSignals = errorChecks.map(([, type]) => {
    return [createGraphQLModuleErrorSignal(new GraphQLModuleError('test', type))];
  });
  describe(`isGraphQLModuleSignal`, () => {
    it(`returns true when signal.namespace equals graphQLModuleNamespace`, () => {
      expect(isGraphQLModuleSignal({ type: eventSignalType, namespace: graphQLModuleNamespace })).toBeTruthy();
      expect(isGraphQLModuleSignal({ type: 'any', namespace: graphQLModuleNamespace })).toBeTruthy();
      expect(isGraphQLModuleSignal({ type: '', namespace: graphQLModuleNamespace })).toBeTruthy();
      expect(isGraphQLModuleSignal({ namespace: graphQLModuleNamespace })).toBeTruthy();
    });
    it(`returns false when signal.namespace does not equal graphQLModuleNamespace`, () => {
      expect(isGraphQLModuleSignal({ type: eventSignalType, namespace: oidcClientNamespace })).toBeFalsy();
      expect(isGraphQLModuleSignal({ type: errorSignalType, namespace: 'any' })).toBeFalsy();
      expect(isGraphQLModuleSignal({ namespace: '' })).toBeFalsy();
      expect(isGraphQLModuleSignal(createTriggerPropsForAllSignals())).toBeFalsy();
    });
  });

  describe(`event signal functions`, () => {
    describe(`createGraphQLModuleEventSignal`, () => {
      const payload = { type: graphQLModuleEvents.GRAPHQL_MODULE_LOADING, data: eventData };
      it(`creates a signal with event type and payload has type and data`, () => {
        const signal = createGraphQLModuleEventSignal(payload);
        expect(signal.type).toBe(eventSignalType);
        expect(signal.namespace).toBe(graphQLModuleNamespace);
        expect(signal.payload.type).toBe(payload.type);
        expect(signal.payload.data).toEqual(eventData);
        expect(isGraphQLModuleSignal(signal)).toBeTruthy();
        expect(isEventSignal(signal)).toBeTruthy();
      });
      it(`Created signal must trigger associated listener`, () => {
        const trigger = createSignalTrigger({ type: eventSignalType, namespace: graphQLModuleNamespace });
        expect(trigger(createGraphQLModuleEventSignal(payload))).toBeTruthy();

        const trigger2 = createSignalTrigger({ type: eventSignalType });
        expect(trigger2(createGraphQLModuleEventSignal(payload))).toBeTruthy();

        const trigger3 = createSignalTrigger({ type: eventSignalType, payload });
        expect(trigger3(createGraphQLModuleEventSignal(payload))).toBeTruthy();
      });

      describe(`event signal creator, checker and trigger should be compatible with each other`, () => {
        eventChecks.forEach(([checker, event, trigger], index) => {
          const signal = eventSignals[index][0];
          const signalWithMoreProps = eventSignals[index][1];
          it(`Signal with ${event} is match with ${checker.name} and ${trigger.name} and returns true`, () => {
            expect(checker(signal)).toBeTruthy();
            expect(trigger(signal)).toBeTruthy();
            expect(trigger(signalWithMoreProps)).toBeTruthy();
            expect(triggerForAllGraphQLModuleEvents(signal)).toBeTruthy();
            expect(triggerForAllGraphQLModuleEvents(signalWithMoreProps)).toBeTruthy();
          });
          it(`Check ${checker.name} and ${trigger.name} do not return true with wrong namespace or signals`, () => {
            expect(trigger({ ...signal, namespace: oidcClientNamespace })).toBeFalsy();
            expect(trigger({ ...signal, ...createTriggerForAllNamespaces() })).toBeFalsy();
            expect(triggerForAllGraphQLModuleErrors(signal)).toBeFalsy();
            // cross check others. None should work with wrong signals
            eventChecks.forEach(([anotherChecker, anotherEvent, wrongTrigger], anotherIndex) => {
              if (event === anotherEvent) {
                return;
              }
              const wrongSignal = eventSignals[anotherIndex][0];
              expect(checker(wrongSignal)).toBeFalsy();
              expect(trigger(wrongSignal)).toBeFalsy();
              expect(anotherChecker(signal)).toBeFalsy();
              expect(wrongTrigger(signal)).toBeFalsy();
            });

            errorChecks.forEach(([errorChecker, , wrongTrigger], errorIndex) => {
              const wrongSignal = errorSignals[errorIndex][0];
              expect(checker(wrongSignal)).toBeFalsy();
              expect(trigger(wrongSignal)).toBeFalsy();
              expect(errorChecker(signal)).toBeFalsy();
              expect(wrongTrigger(signal)).toBeFalsy();
            });
          });
        });
      });
    });
    describe(`getGraphQLModuleEventPayload`, () => {
      it(`Returns signal's payload, if signal is a event signal`, () => {
        const payload = { type: graphQLModuleEvents.GRAPHQL_MODULE_LOAD_SUCCESS, data: eventData };
        const signal = createGraphQLModuleEventSignal(payload);
        expect(getGraphQLModuleEventPayload(signal)).toEqual(payload);
        expect(getGraphQLModuleEventPayload({ ...signal, type: errorSignalType })).toBeNull();
        expect(getGraphQLModuleEventPayload({})).toBeNull();
      });
    });
  });
  describe(`error signal functions`, () => {
    describe(`error signal creator, checker and trigger should be compatible with each other`, () => {
      errorChecks.forEach(([checker, errorType, trigger], index) => {
        const signal = errorSignals[index][0];
        it(`Signal with ${errorType} is match with ${checker.name} and ${trigger.name} and returns true`, () => {
          expect(checker(signal)).toBeTruthy();
          expect(trigger(signal)).toBeTruthy();
          expect(triggerForAllGraphQLModuleErrors(signal)).toBeTruthy();
        });
        it(`Check ${checker.name} and ${trigger.name} do not return true with wrong namespace or signals`, () => {
          expect(trigger({ ...signal, namespace: oidcClientNamespace })).toBeFalsy();
          expect(trigger({ ...signal, ...createTriggerForAllNamespaces() })).toBeFalsy();
          expect(triggerForAllGraphQLModuleEvents(signal)).toBeFalsy();
          // cross check others. None should work with wrong signals
          errorChecks.forEach(([anotherChecker, anotherErrorType, wrongTrigger], anotherIndex) => {
            if (errorType === anotherErrorType) {
              return;
            }
            const wrongSignal = errorSignals[anotherIndex][0];
            expect(checker(wrongSignal)).toBeFalsy();
            expect(trigger(wrongSignal)).toBeFalsy();
            expect(anotherChecker(signal)).toBeFalsy();
            expect(wrongTrigger(signal)).toBeFalsy();
          });
        });
      });
    });
  });
});
