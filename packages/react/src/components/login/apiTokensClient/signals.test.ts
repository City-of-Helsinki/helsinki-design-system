import { ApiTokensClientEvent, apiTokensClientNamespace, apiTokensClientEvents } from '.';
import {
  createTriggerForAllNamespaces,
  createTriggerPropsForAllSignals,
  errorSignalType,
  eventSignalType,
  isEventSignal,
} from '../beacon/signals';
import {
  createApiTokensClientErrorSignal,
  createApiTokensClientEventSignal,
  apiTokensFetchFailedErrorTrigger,
  apiTokensRemovedTrigger,
  apiTokensRenewalStartedTrigger,
  apiTokensUpdatedTrigger,
  invalidApiTokensErrorTrigger,
  invalidApiTokensUserErrorTrigger,
  triggerForAllApiTokensClientErrors,
  triggerForAllApiTokensClientEvents,
  getApiTokensClientEventPayload,
  isApiTokensClientSignal,
  isApiTokensFetchFailedErrorSignal,
  isApiTokensRemovedSignal,
  isApiTokensRenewalStartedSignal,
  isApiTokensUpdatedSignal,
  isInvalidApiTokensErrorSignal,
  isInvalidApiTokensUserErrorSignal,
} from './signals';
import { SignalTrigger, createSignalTrigger } from '../beacon/beacon';
import { ApiTokensClientError, ApiTokensClientErrorType, apiTokensClientError } from './apiTokensClientError';
import { oidcClientNamespace } from '../client';

describe(`signals`, () => {
  const eventData = { tokens: 'token' };
  const eventChecks: Array<[typeof isApiTokensRemovedSignal, ApiTokensClientEvent, SignalTrigger]> = [
    [isApiTokensRemovedSignal, apiTokensClientEvents.API_TOKENS_REMOVED, apiTokensRemovedTrigger],
    [isApiTokensRenewalStartedSignal, apiTokensClientEvents.API_TOKENS_RENEWAL_STARTED, apiTokensRenewalStartedTrigger],
    [isApiTokensUpdatedSignal, apiTokensClientEvents.API_TOKENS_UPDATED, apiTokensUpdatedTrigger],
  ];
  // create array of [basic signal, signal with more data] in same order as eventChecks
  const eventSignals = eventChecks.map(([, type]) => {
    return [
      createApiTokensClientEventSignal({ type }),
      createApiTokensClientEventSignal({ type, data: { foo: 'bar' } }),
    ];
  });
  const errorChecks: Array<[typeof isApiTokensFetchFailedErrorSignal, ApiTokensClientErrorType, SignalTrigger]> = [
    [isApiTokensFetchFailedErrorSignal, apiTokensClientError.API_TOKEN_FETCH_FAILED, apiTokensFetchFailedErrorTrigger],
    [isInvalidApiTokensErrorSignal, apiTokensClientError.INVALID_API_TOKENS, invalidApiTokensErrorTrigger],
    [
      isInvalidApiTokensUserErrorSignal,
      apiTokensClientError.INVALID_USER_FOR_API_TOKENS,
      invalidApiTokensUserErrorTrigger,
    ],
  ];
  const errorSignals = errorChecks.map(([, type]) => {
    return [createApiTokensClientErrorSignal(new ApiTokensClientError('test', type))];
  });
  describe(`isApiTokensClientSignal`, () => {
    it(`returns true when signal.namespace equals apiTokensClientNamespace`, () => {
      expect(isApiTokensClientSignal({ type: eventSignalType, namespace: apiTokensClientNamespace })).toBeTruthy();
      expect(isApiTokensClientSignal({ type: 'any', namespace: apiTokensClientNamespace })).toBeTruthy();
      expect(isApiTokensClientSignal({ type: '', namespace: apiTokensClientNamespace })).toBeTruthy();
      expect(isApiTokensClientSignal({ namespace: apiTokensClientNamespace })).toBeTruthy();
    });
    it(`returns false when signal.namespace does not equal apiTokensClientNamespace`, () => {
      expect(isApiTokensClientSignal({ type: eventSignalType, namespace: oidcClientNamespace })).toBeFalsy();
      expect(isApiTokensClientSignal({ type: errorSignalType, namespace: 'any' })).toBeFalsy();
      expect(isApiTokensClientSignal({ namespace: '' })).toBeFalsy();
      expect(isApiTokensClientSignal(createTriggerPropsForAllSignals())).toBeFalsy();
    });
  });

  describe(`event signal functions`, () => {
    describe(`createApiTokensClientEventSignal`, () => {
      const payload = { type: apiTokensClientEvents.API_TOKENS_REMOVED, data: eventData };
      it(`creates a signal with event type and payload has type and data`, () => {
        const signal = createApiTokensClientEventSignal(payload);
        expect(signal.type).toBe(eventSignalType);
        expect(signal.namespace).toBe(apiTokensClientNamespace);
        expect(signal.payload.type).toBe(payload.type);
        expect(signal.payload.data).toEqual(eventData);
        expect(isApiTokensClientSignal(signal)).toBeTruthy();
        expect(isEventSignal(signal)).toBeTruthy();
      });
      it(`Created signal must trigger associated listener`, () => {
        const trigger = createSignalTrigger({ type: eventSignalType, namespace: apiTokensClientNamespace });
        expect(trigger(createApiTokensClientEventSignal(payload))).toBeTruthy();

        const trigger2 = createSignalTrigger({ type: eventSignalType });
        expect(trigger2(createApiTokensClientEventSignal(payload))).toBeTruthy();

        const trigger3 = createSignalTrigger({ type: eventSignalType, payload });
        expect(trigger3(createApiTokensClientEventSignal(payload))).toBeTruthy();
      });

      describe(`event signal creator, checker and trigger should be compatible with each other`, () => {
        eventChecks.forEach(([checker, event, trigger], index) => {
          const signal = eventSignals[index][0];
          const signalWithMoreProps = eventSignals[index][1];
          it(`Signal with ${event} is match with ${checker.name} and ${trigger.name} and returns true`, () => {
            expect(checker(signal)).toBeTruthy();
            expect(trigger(signal)).toBeTruthy();
            expect(trigger(signalWithMoreProps)).toBeTruthy();
            expect(triggerForAllApiTokensClientEvents(signal)).toBeTruthy();
            expect(triggerForAllApiTokensClientEvents(signalWithMoreProps)).toBeTruthy();
          });
          it(`Check ${checker.name} and ${trigger.name} do not return true with wrong namespace or signals`, () => {
            expect(trigger({ ...signal, namespace: oidcClientNamespace })).toBeFalsy();
            expect(trigger({ ...signal, ...createTriggerForAllNamespaces() })).toBeFalsy();
            expect(triggerForAllApiTokensClientErrors(signal)).toBeFalsy();
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
    describe(`getApiTokensClientEventPayload`, () => {
      it(`Returns signal's payload, if signal is a event signal`, () => {
        const payload = { type: apiTokensClientEvents.API_TOKENS_REMOVED, data: eventData };
        const signal = createApiTokensClientEventSignal(payload);
        expect(getApiTokensClientEventPayload(signal)).toEqual(payload);
        expect(getApiTokensClientEventPayload({ ...signal, type: errorSignalType })).toBeNull();
        expect(getApiTokensClientEventPayload({})).toBeNull();
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
          expect(triggerForAllApiTokensClientErrors(signal)).toBeTruthy();
        });
        it(`Check ${checker.name} and ${trigger.name} do not return true with wrong namespace or signals`, () => {
          expect(trigger({ ...signal, namespace: oidcClientNamespace })).toBeFalsy();
          expect(trigger({ ...signal, ...createTriggerForAllNamespaces() })).toBeFalsy();
          expect(triggerForAllApiTokensClientEvents(signal)).toBeFalsy();
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
