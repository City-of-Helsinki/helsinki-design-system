import { SessionPollerEvent, sessionPollerEvents, sessionPollerNamespace } from './sessionPoller';
import {
  createTriggerForAllNamespaces,
  createTriggerPropsForAllSignals,
  errorSignalType,
  eventSignalType,
  isEventSignal,
} from '../beacon/signals';
import {
  sessionEndedTrigger,
  createSessionPollerErrorSignal,
  createSessionPollerEventSignal,
  sessionPollingFailedTrigger,
  sessionPollingStartedTrigger,
  sessionPollingStoppedTrigger,
  triggerForAllSessionPollerErrors,
  triggerForAllSessionPollerEvents,
  getSessionPollerEventPayload,
  isSessionEndedSignal,
  isSessionPollerSignal,
  isSessionPollerStartedSignal,
  isSessionPollerStoppedSignal,
  isSessionPollingFailureSignal,
  getSessionPollerErrorPayload,
} from './signals';
import { SignalTrigger, createSignalTrigger } from '../beacon/beacon';
import { SessionPollerError, SessionPollerErrorType, sessionPollerErrors } from './sessionPollerError';
import { isInvalidUserErrorSignal } from '../client/signals';
import { oidcClientNamespace } from '../client';

describe(`signals`, () => {
  const eventData = { tokens: 'token' };
  const eventChecks: Array<[
    typeof isSessionPollerStartedSignal,
    SessionPollerEvent,
    typeof sessionPollingStartedTrigger,
  ]> = [
    [isSessionPollerStartedSignal, sessionPollerEvents.SESSION_POLLING_STARTED, sessionPollingStartedTrigger],
    [isSessionPollerStoppedSignal, sessionPollerEvents.SESSION_POLLING_STOPPED, sessionPollingStoppedTrigger],
  ];
  // create array of [basic signal, signal with more data] in same order as eventChecks
  const eventSignals = eventChecks.map(([, type]) => {
    return [createSessionPollerEventSignal({ type }), createSessionPollerEventSignal({ type, data: { foo: 'bar' } })];
  });
  const errorChecks: Array<[typeof isInvalidUserErrorSignal, SessionPollerErrorType, SignalTrigger]> = [
    [isSessionPollingFailureSignal, sessionPollerErrors.SESSION_POLLING_FAILED, sessionPollingFailedTrigger],
    [isSessionEndedSignal, sessionPollerErrors.SESSION_ENDED, sessionEndedTrigger],
  ];
  const errorSignals = errorChecks.map(([, type]) => {
    return [createSessionPollerErrorSignal(new SessionPollerError('test', type))];
  });
  describe(`isSessionPollerSignal`, () => {
    it(`returns true when signal.namespace equals sessionPollerNamespace`, () => {
      expect(isSessionPollerSignal({ type: eventSignalType, namespace: sessionPollerNamespace })).toBeTruthy();
      expect(isSessionPollerSignal({ type: 'any', namespace: sessionPollerNamespace })).toBeTruthy();
      expect(isSessionPollerSignal({ type: '', namespace: sessionPollerNamespace })).toBeTruthy();
      expect(isSessionPollerSignal({ namespace: sessionPollerNamespace })).toBeTruthy();
    });
    it(`returns false when signal.namespace does not equal sessionPollerNamespace`, () => {
      expect(isSessionPollerSignal({ type: eventSignalType, namespace: oidcClientNamespace })).toBeFalsy();
      expect(isSessionPollerSignal({ type: errorSignalType, namespace: 'any' })).toBeFalsy();
      expect(isSessionPollerSignal({ namespace: '' })).toBeFalsy();
      expect(isSessionPollerSignal(createTriggerPropsForAllSignals())).toBeFalsy();
    });
  });

  describe(`event signal functions`, () => {
    describe(`createSessionPollerEventSignal`, () => {
      const payload = { type: sessionPollerEvents.SESSION_POLLING_STARTED, data: eventData };
      it(`creates a signal with event type and payload has type and data`, () => {
        const signal = createSessionPollerEventSignal(payload);
        expect(signal.type).toBe(eventSignalType);
        expect(signal.namespace).toBe(sessionPollerNamespace);
        expect(signal.payload.type).toBe(payload.type);
        expect(signal.payload.data).toEqual(eventData);
        expect(isSessionPollerSignal(signal)).toBeTruthy();
        expect(isEventSignal(signal)).toBeTruthy();
      });
      it(`Created signal must trigger associated listener`, () => {
        const trigger = createSignalTrigger({ type: eventSignalType, namespace: sessionPollerNamespace });
        expect(trigger(createSessionPollerEventSignal(payload))).toBeTruthy();

        const trigger2 = createSignalTrigger({ type: eventSignalType });
        expect(trigger2(createSessionPollerEventSignal(payload))).toBeTruthy();

        const trigger3 = createSignalTrigger({ type: eventSignalType, payload });
        expect(trigger3(createSessionPollerEventSignal(payload))).toBeTruthy();
      });

      describe(`event signal creator, checker and trigger should be compatible with each other`, () => {
        eventChecks.forEach(([checker, event, trigger], index) => {
          const signal = eventSignals[index][0];
          const signalWithMoreProps = eventSignals[index][1];
          it(`Signal with ${event} is match with ${checker.name} and ${trigger.name} and returns true`, () => {
            expect(checker(signal)).toBeTruthy();
            expect(trigger(signal)).toBeTruthy();
            expect(trigger(signalWithMoreProps)).toBeTruthy();
            expect(triggerForAllSessionPollerEvents(signal)).toBeTruthy();
            expect(triggerForAllSessionPollerEvents(signalWithMoreProps)).toBeTruthy();
          });
          it(`Check ${checker.name} and ${trigger.name} do not return true with wrong namespace or signals`, () => {
            expect(trigger({ ...signal, namespace: oidcClientNamespace })).toBeFalsy();
            expect(trigger({ ...signal, ...createTriggerForAllNamespaces() })).toBeFalsy();
            expect(triggerForAllSessionPollerErrors(signal)).toBeFalsy();
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
    describe(`getSessionPollerEventPayload`, () => {
      it(`Returns signal's payload, if signal is an event signal`, () => {
        const payload = { type: sessionPollerEvents.SESSION_POLLING_STOPPED, data: eventData };
        const signal = createSessionPollerEventSignal(payload);
        expect(getSessionPollerEventPayload(signal)).toEqual(payload);
        expect(getSessionPollerEventPayload({ ...signal, type: errorSignalType })).toBeNull();
        expect(getSessionPollerEventPayload({})).toBeNull();
      });
    });
    describe(`getSessionPollerErrorPayload`, () => {
      it(`Returns signal's payload, if signal is an error signal`, () => {
        const payload = new SessionPollerError('test', sessionPollerErrors.SESSION_ENDED);
        const signal = createSessionPollerErrorSignal(payload);
        expect(getSessionPollerErrorPayload(signal)).toEqual(payload);
        expect(getSessionPollerErrorPayload({ ...signal, type: eventSignalType })).toBeNull();
        expect(getSessionPollerErrorPayload({})).toBeNull();
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
          expect(triggerForAllSessionPollerErrors(signal)).toBeTruthy();
        });
        it(`Check ${checker.name} and ${trigger.name} do not return true with wrong namespace or signals`, () => {
          expect(trigger({ ...signal, namespace: oidcClientNamespace })).toBeFalsy();
          expect(trigger({ ...signal, ...createTriggerForAllNamespaces() })).toBeFalsy();
          expect(triggerForAllSessionPollerEvents(signal)).toBeFalsy();
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
