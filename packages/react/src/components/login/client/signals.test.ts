import { OidcClientEvent, OidcClientState, oidcClientEvents, oidcClientNamespace, oidcClientStates } from '.';
import {
  createTriggerForAllNamespaces,
  createTriggerPropsForAllSignals,
  errorSignalType,
  eventSignalType,
  isErrorSignal,
  isEventSignal,
  isStateChangeSignal,
  stateChangeSignalType,
} from '../beacon/signals';
import { apiTokensClientNamespace } from '../apiTokensClient/index';
import {
  handlingLoginCallbackTrigger,
  invalidUserErrorTrigger,
  loggingInTrigger,
  loggingOutTrigger,
  noSessionTrigger,
  createOidcClientErrorSignal,
  createOidcClientEventSignal,
  createOidcClientStateChangeSignal,
  renewalErrorTrigger,
  signInErrorTrigger,
  triggerForAllOidcClientErrors,
  triggerForAllOidcClientEvents,
  triggerForAllOidcClientStateChanges,
  userRemovedTrigger,
  userRenewalStartedTrigger,
  userUpdatedTrigger,
  validSessionTrigger,
  getOidcClientErrorPayload,
  getOidcClientEventPayload,
  getOidcClientStateChangePayload,
  isHandlingLoginCallbackSignal,
  isInvalidUserErrorSignal,
  isLoggingInSignal,
  isLoggingOutSignal,
  isNoSessionSignal,
  isOidcClientSignal,
  isRenewalErrorSignal,
  isSigninErroSignal,
  isUserRemovedSignal,
  isUserRenewalStartedSignal,
  isUserUpdatedSignal,
  isValidSessionSignal,
} from './signals';
import { SignalTrigger, createSignalTrigger } from '../beacon/beacon';
import { OidcClientError, OidcClientErrorType, oidcClientErrors } from './oidcClientError';

describe(`signals`, () => {
  const states = Object.keys(oidcClientStates);
  const stateChecks: Array<[typeof isLoggingOutSignal, OidcClientState, SignalTrigger]> = [
    [isLoggingInSignal, oidcClientStates.LOGGING_IN, loggingInTrigger],
    [isLoggingOutSignal, oidcClientStates.LOGGING_OUT, loggingOutTrigger],
    [isHandlingLoginCallbackSignal, oidcClientStates.HANDLING_LOGIN_CALLBACK, handlingLoginCallbackTrigger],
    [isNoSessionSignal, oidcClientStates.NO_SESSION, noSessionTrigger],
    [isValidSessionSignal, oidcClientStates.VALID_SESSION, validSessionTrigger],
  ];
  // create array of [basic signal, signal with more data] in same order as stateChecks
  const stateChangeSignals = stateChecks.map(([, state]) => {
    return [
      createOidcClientStateChangeSignal({ state }),
      createOidcClientStateChangeSignal({ state, previousState: states.find((listedState) => listedState !== state) }),
    ];
  });
  const eventChecks: Array<[typeof isUserRemovedSignal, OidcClientEvent, SignalTrigger]> = [
    [isUserRemovedSignal, oidcClientEvents.USER_REMOVED, userRemovedTrigger],
    [isUserRenewalStartedSignal, oidcClientEvents.USER_RENEWAL_STARTED, userRenewalStartedTrigger],
    [isUserUpdatedSignal, oidcClientEvents.USER_UPDATED, userUpdatedTrigger],
  ];
  // create array of [basic signal, signal with more data] in same order as eventChecks
  const eventSignals = eventChecks.map(([, type]) => {
    return [createOidcClientEventSignal({ type }), createOidcClientEventSignal({ type, data: { foo: 'bar' } })];
  });
  const errorChecks: Array<[typeof isInvalidUserErrorSignal, OidcClientErrorType, SignalTrigger]> = [
    [isInvalidUserErrorSignal, oidcClientErrors.INVALID_OR_EXPIRED_USER, invalidUserErrorTrigger],
    [isRenewalErrorSignal, oidcClientErrors.RENEWAL_FAILED, renewalErrorTrigger],
    [isSigninErroSignal, oidcClientErrors.SIGNIN_ERROR, signInErrorTrigger],
  ];
  const errorSignals = errorChecks.map(([, type]) => {
    return [createOidcClientErrorSignal(new OidcClientError('test', type))];
  });
  describe(`isOidcClientSignal`, () => {
    it(`returns true when signal.namespace equals oidcClientNamespace`, () => {
      expect(isOidcClientSignal({ type: eventSignalType, namespace: oidcClientNamespace })).toBeTruthy();
      expect(isOidcClientSignal({ type: 'any', namespace: oidcClientNamespace })).toBeTruthy();
      expect(isOidcClientSignal({ type: '', namespace: oidcClientNamespace })).toBeTruthy();
      expect(isOidcClientSignal({ namespace: oidcClientNamespace })).toBeTruthy();
    });
    it(`returns false when signal.namespace does not equal oidcClientNamespace`, () => {
      expect(isOidcClientSignal({ type: eventSignalType, namespace: apiTokensClientNamespace })).toBeFalsy();
      expect(isOidcClientSignal({ type: errorSignalType, namespace: 'any' })).toBeFalsy();
      expect(isOidcClientSignal({ namespace: '' })).toBeFalsy();
      expect(isOidcClientSignal(createTriggerPropsForAllSignals())).toBeFalsy();
    });
  });
  describe(`event signal functions`, () => {
    describe(`createOidcClientEventSignal`, () => {
      const payload = { type: oidcClientEvents.USER_REMOVED };
      it(`creates a signal with event type and oidcClientNamespace`, () => {
        const signal = createOidcClientEventSignal();
        expect(signal.type).toBe(eventSignalType);
        expect(signal.namespace).toBe(oidcClientNamespace);
        expect(isOidcClientSignal(signal)).toBeTruthy();
        expect(isEventSignal(signal)).toBeTruthy();
      });
      it(`Created signal must trigger associated listener`, () => {
        const trigger = createSignalTrigger({ type: eventSignalType, namespace: oidcClientNamespace });
        expect(trigger(createOidcClientEventSignal(payload))).toBeTruthy();

        const trigger2 = createSignalTrigger({ type: eventSignalType });
        expect(trigger2(createOidcClientEventSignal(payload))).toBeTruthy();

        const trigger3 = createSignalTrigger({ type: eventSignalType, payload });
        expect(trigger3(createOidcClientEventSignal(payload))).toBeTruthy();
      });
    });
    describe(`getOidcClientEventPayload`, () => {
      it(`Returns signal's payload if signal is a event signal`, () => {
        const payload = { type: 'event_happened' };
        const signal = createOidcClientEventSignal(payload);
        expect(getOidcClientEventPayload(signal)).toEqual(payload);
        expect(getOidcClientEventPayload({ ...signal, type: errorSignalType })).toBeNull();
        expect(getOidcClientEventPayload({})).toBeNull();
      });
    });
    describe(`event signal creator, checker and trigger should be compatible with each other`, () => {
      eventChecks.forEach(([checker, event, trigger], index) => {
        const signal = eventSignals[index][0];
        const signalWithMoreProps = eventSignals[index][1];
        it(`Signal with ${event} is match with ${checker.name} and ${trigger.name} and returns true`, () => {
          expect(checker(signal)).toBeTruthy();
          expect(trigger(signal)).toBeTruthy();
          expect(trigger(signalWithMoreProps)).toBeTruthy();
          expect(triggerForAllOidcClientEvents(signal)).toBeTruthy();
          expect(triggerForAllOidcClientEvents(signalWithMoreProps)).toBeTruthy();
        });
        it(`Check ${checker.name} and ${trigger.name} do not return true with wrong namespace or signals`, () => {
          expect(trigger({ ...signal, namespace: apiTokensClientNamespace })).toBeFalsy();
          expect(trigger({ ...signal, ...createTriggerForAllNamespaces() })).toBeFalsy();
          expect(triggerForAllOidcClientStateChanges(signal)).toBeFalsy();
          expect(triggerForAllOidcClientErrors(signal)).toBeFalsy();
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
  describe(`stateChange signal functions`, () => {
    describe(`createOidcClientStateChangeSignal`, () => {
      const payload = { state: oidcClientStates.HANDLING_LOGIN_CALLBACK, previousState: oidcClientStates.LOGGING_IN };
      it(`creates a signal with stateChange type and oidcClientNamespace and given payload`, () => {
        const signal = createOidcClientStateChangeSignal(payload);
        expect(signal.type).toBe(stateChangeSignalType);
        expect(signal.namespace).toBe(oidcClientNamespace);
        expect(signal.payload?.state).toBe(payload.state);
        expect(signal.payload?.previousState).toBe(payload.previousState);
        expect(isOidcClientSignal(signal)).toBeTruthy();
        expect(isStateChangeSignal(signal)).toBeTruthy();
      });
      it(`Created signal must trigger associated listener`, () => {
        const trigger = createSignalTrigger({ type: stateChangeSignalType, namespace: oidcClientNamespace });
        expect(trigger(createOidcClientStateChangeSignal(payload))).toBeTruthy();

        const trigger2 = createSignalTrigger({ type: stateChangeSignalType });
        expect(trigger2(createOidcClientStateChangeSignal(payload))).toBeTruthy();

        const trigger3 = createSignalTrigger({ type: stateChangeSignalType, payload });
        expect(trigger3(createOidcClientStateChangeSignal(payload))).toBeTruthy();
      });
    });
    describe(`getOidcClientStateChangePayload`, () => {
      it(`Returns signal's payload if signal is a stateChange signal`, () => {
        const payload = { state: oidcClientStates.HANDLING_LOGIN_CALLBACK, previousState: oidcClientStates.LOGGING_IN };
        const signal = createOidcClientStateChangeSignal(payload);
        expect(getOidcClientStateChangePayload(signal)).toEqual(payload);
        expect(getOidcClientStateChangePayload({ ...signal, type: errorSignalType })).toBeNull();
        expect(getOidcClientStateChangePayload({})).toBeNull();
      });
    });
    describe(`stateChange signal creator, checker and trigger should be compatible with each other`, () => {
      stateChecks.forEach(([checker, state, trigger], index) => {
        const signal = stateChangeSignals[index][0];
        const signalWithMoreProps = stateChangeSignals[index][1];
        it(`Signal with ${state} is match with ${checker.name} and ${trigger.name} and returns true`, () => {
          expect(checker(signal)).toBeTruthy();
          expect(trigger(signal)).toBeTruthy();
          expect(trigger(signalWithMoreProps)).toBeTruthy();
          expect(triggerForAllOidcClientStateChanges(signal)).toBeTruthy();
          expect(triggerForAllOidcClientStateChanges(signalWithMoreProps)).toBeTruthy();
        });
        it(`Check ${checker.name} and ${trigger.name} do not return true with wrong namespace or signals`, () => {
          expect(trigger({ ...signal, namespace: apiTokensClientNamespace })).toBeFalsy();
          expect(trigger({ ...signal, ...createTriggerForAllNamespaces() })).toBeFalsy();
          expect(triggerForAllOidcClientEvents(signal)).toBeFalsy();
          expect(triggerForAllOidcClientErrors(signal)).toBeFalsy();
          // cross check others. None should work with wrong signals
          stateChecks.forEach(([anotherChecker, anotherState, wrongTrigger], anotherIndex) => {
            if (state === anotherState) {
              return;
            }
            const wrongSignal = stateChangeSignals[anotherIndex][0];
            expect(checker(wrongSignal)).toBeFalsy();
            expect(trigger(wrongSignal)).toBeFalsy();
            expect(anotherChecker(signal)).toBeFalsy();
            expect(wrongTrigger(signal)).toBeFalsy();
          });
          eventChecks.forEach(([eventChecker, , wrongTrigger], eventIndex) => {
            const eventSignal = eventSignals[eventIndex][0];
            expect(checker(eventSignal)).toBeFalsy();
            expect(trigger(eventSignal)).toBeFalsy();
            expect(eventChecker(signal)).toBeFalsy();
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
  describe(`error signal functions`, () => {
    describe(`createOidcClientErrorSignal`, () => {
      const payload = new OidcClientError('test', oidcClientErrors.RENEWAL_FAILED);
      it(`creates a signal with error type and oidcClientNamespace and given payload`, () => {
        const signal = createOidcClientErrorSignal(payload);
        expect(signal.type).toBe(errorSignalType);
        expect(signal.namespace).toBe(oidcClientNamespace);
        expect((signal.payload as OidcClientError).type).toBe(payload.type);
        expect(isOidcClientSignal(signal)).toBeTruthy();
        expect(isErrorSignal(signal)).toBeTruthy();
      });
      it(`Created signal must trigger associated listener`, () => {
        const trigger = createSignalTrigger({ type: errorSignalType, namespace: oidcClientNamespace });
        expect(trigger(createOidcClientErrorSignal(payload))).toBeTruthy();

        const trigger2 = createSignalTrigger({ type: errorSignalType });
        expect(trigger2(createOidcClientErrorSignal(payload))).toBeTruthy();

        const trigger3 = createSignalTrigger({ type: errorSignalType, payload });
        expect(trigger3(createOidcClientErrorSignal(payload))).toBeTruthy();
      });
    });
    describe(`getOidcClientErrorPayload`, () => {
      it(`Returns signal's payload if signal is an error signal`, () => {
        const payload = new OidcClientError('test', oidcClientErrors.RENEWAL_FAILED);
        const signal = createOidcClientErrorSignal(payload);
        expect(getOidcClientErrorPayload(signal)).toEqual(payload);
        expect(getOidcClientErrorPayload({ ...signal, type: eventSignalType })).toBeNull();
        expect(getOidcClientErrorPayload({})).toBeNull();
      });
    });
    describe(`error signal creator, checker and trigger should be compatible with each other`, () => {
      errorChecks.forEach(([checker, errorType, trigger], index) => {
        const signal = errorSignals[index][0];
        it(`Signal with ${errorType} is match with ${checker.name} and ${trigger.name} and returns true`, () => {
          expect(checker(signal)).toBeTruthy();
          expect(trigger(signal)).toBeTruthy();
          expect(triggerForAllOidcClientErrors(signal)).toBeTruthy();
        });
        it(`Check ${checker.name} and ${trigger.name} do not return true with wrong namespace or signals`, () => {
          expect(trigger({ ...signal, namespace: apiTokensClientNamespace })).toBeFalsy();
          expect(trigger({ ...signal, ...createTriggerForAllNamespaces() })).toBeFalsy();
          expect(triggerForAllOidcClientEvents(signal)).toBeFalsy();
          expect(triggerForAllOidcClientStateChanges(signal)).toBeFalsy();
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
