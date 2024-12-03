import { tokenizedFetchModuleNamespace } from '.';
import { createTriggerPropsForAllSignals, errorSignalType, EventPayload, eventSignalType } from '../beacon/signals';
import {
  createAbortSignalData,
  createStartSignalData,
  createTriggerPropsForAllTokenizedFetchSignals,
  createTriggerPropsForTokenizedFetchResponseSignals,
  triggerForAllTokenizedFetchEvents,
  triggerForAllTokenizedFetchSignals,
  triggerForAllTokenizedFetchErrors,
  isTokenizedFetchAbortedSignal,
  isTokenizedFetchModuleSignal,
  isTokenizedFetchStartedSignal,
  getTokenizedFetchModuleErrorPayload,
  getTokenizedFetchModuleEventPayload,
  getTokenizedFetchPayloadData,
} from './signals';
import { TokenizedFetchError } from './tokenizedFetchError';
import { oidcClientNamespace } from '../client';
import { createTokenizedFetchModule } from './tokenizedFetch';
import { Signal } from '../beacon/beacon';

describe(`signals`, () => {
  const eventData = { response: 'ok' };
  const module = createTokenizedFetchModule({});
  const createTokenizedFetchModuleEventSignal = ({ type, data }: EventPayload): Signal => {
    return {
      type: eventSignalType,
      namespace: tokenizedFetchModuleNamespace,
      payload: {
        type,
        data,
      },
      context: module,
    };
  };

  const createTokenizedFetchModuleErrorSignal = (error: TokenizedFetchError) => {
    const signal = createTokenizedFetchModuleEventSignal({ type: '' });
    signal.type = errorSignalType;
    signal.payload = error;
    return signal;
  };

  describe(`isTokenizedFetchModuleSignal`, () => {
    it(`returns true when signal.namespace equals tokenizedFetchModuleNamespace`, () => {
      expect(
        isTokenizedFetchModuleSignal({ type: eventSignalType, namespace: tokenizedFetchModuleNamespace }),
      ).toBeTruthy();
      expect(isTokenizedFetchModuleSignal({ type: 'any', namespace: tokenizedFetchModuleNamespace })).toBeTruthy();
      expect(isTokenizedFetchModuleSignal({ type: '', namespace: tokenizedFetchModuleNamespace })).toBeTruthy();
      expect(isTokenizedFetchModuleSignal({ namespace: tokenizedFetchModuleNamespace })).toBeTruthy();
    });
    it(`returns false when signal.namespace does not equal tokenizedFetchModuleNamespace`, () => {
      expect(isTokenizedFetchModuleSignal({ type: eventSignalType, namespace: oidcClientNamespace })).toBeFalsy();
      expect(isTokenizedFetchModuleSignal({ type: errorSignalType, namespace: 'any' })).toBeFalsy();
      expect(isTokenizedFetchModuleSignal({ namespace: '' })).toBeFalsy();
      expect(isTokenizedFetchModuleSignal(createTriggerPropsForAllSignals())).toBeFalsy();
    });
  });

  describe(`event signal functions`, () => {
    describe(`getTokenizedFetchModuleEventPayload`, () => {
      it(`Returns signal's payload, if signal is an event signal`, () => {
        const payload = { type: 'type', data: eventData };
        const signal = createTokenizedFetchModuleEventSignal(payload);
        expect(getTokenizedFetchModuleEventPayload(signal)).toEqual(payload);
        expect(getTokenizedFetchModuleEventPayload({ ...signal, type: errorSignalType })).toBeNull();
        expect(getTokenizedFetchModuleEventPayload({})).toBeNull();
      });
    });
    describe(`getTokenizedFetchPayloadData`, () => {
      it(`Returns signal's payload, if signal is an event signal`, () => {
        const payload = { type: 'type', data: eventData };
        const signal = createTokenizedFetchModuleEventSignal(payload);
        expect(getTokenizedFetchPayloadData(signal)).toEqual(payload.data);
        expect(getTokenizedFetchPayloadData({ ...signal, type: errorSignalType })).toEqual(payload.data);
        expect(getTokenizedFetchPayloadData({ ...signal, namespace: oidcClientNamespace })).toBeNull();
        expect(getTokenizedFetchPayloadData({})).toBeNull();
      });
    });
    describe(`getTokenizedFetchModuleErrorPayload`, () => {
      it(`Returns signal's payload, if signal is an error signal`, () => {
        const error = new TokenizedFetchError('ups');
        const signal = createTokenizedFetchModuleErrorSignal(error);
        expect(getTokenizedFetchModuleErrorPayload(signal)).toEqual(error);
        expect(getTokenizedFetchModuleErrorPayload({ ...signal, type: eventSignalType })).toBeNull();
        expect(getTokenizedFetchModuleErrorPayload({})).toBeNull();
        expect(getTokenizedFetchModuleErrorPayload(createTokenizedFetchModuleEventSignal({ type: 'ups' }))).toBeNull();
      });
    });
  });
  describe(`Abort signals`, () => {
    it(`isTokenizedFetchAbortedSignal identifies signal with createAbortSignalData()`, () => {
      const payload = { type: 'type', data: createAbortSignalData() };
      const signal = createTokenizedFetchModuleEventSignal(payload);
      expect(isTokenizedFetchAbortedSignal(signal)).toBeTruthy();
      expect(isTokenizedFetchAbortedSignal({ ...signal, payload: { data: {} } })).toBeFalsy();
      expect(isTokenizedFetchAbortedSignal({})).toBeFalsy();
      expect(
        isTokenizedFetchAbortedSignal(
          createTokenizedFetchModuleEventSignal({ type: 'type', data: createStartSignalData() }),
        ),
      ).toBeFalsy();
    });
    it(`isTokenizedFetchStartedSignal identifies signal with createStartSignalData()`, () => {
      const payload = { type: 'type', data: createStartSignalData() };
      const signal = createTokenizedFetchModuleEventSignal(payload);
      expect(isTokenizedFetchStartedSignal(signal)).toBeTruthy();
      expect(isTokenizedFetchStartedSignal({ ...signal, payload: { data: {} } })).toBeFalsy();
      expect(isTokenizedFetchStartedSignal({})).toBeFalsy();
      expect(
        isTokenizedFetchStartedSignal(
          createTokenizedFetchModuleEventSignal({ type: 'type', data: createAbortSignalData() }),
        ),
      ).toBeFalsy();
    });
  });
  describe(`Start signals`, () => {
    it(`isTokenizedFetchStartedSignal identifies signal with createStartSignalData()`, () => {
      const payload = { type: 'type', data: createStartSignalData() };
      const signal = createTokenizedFetchModuleEventSignal(payload);
      expect(isTokenizedFetchStartedSignal(signal)).toBeTruthy();
      expect(isTokenizedFetchStartedSignal({ ...signal, payload: { data: {} } })).toBeFalsy();
      expect(isTokenizedFetchStartedSignal({})).toBeFalsy();
      expect(
        isTokenizedFetchStartedSignal(
          createTokenizedFetchModuleEventSignal({ type: 'type', data: createAbortSignalData() }),
        ),
      ).toBeFalsy();
    });
  });
  describe(`Triggers match events`, () => {
    it(`triggerForAllTokenizedFetchErrors returns true if signal.type and payload.type matches`, () => {
      const signal = createTokenizedFetchModuleErrorSignal(new TokenizedFetchError('ups'));
      expect(triggerForAllTokenizedFetchErrors(signal)).toBeTruthy();
      expect(createTriggerPropsForAllTokenizedFetchSignals()).toBeTruthy();
      expect(triggerForAllTokenizedFetchErrors({ ...signal, payload: undefined })).toBeTruthy();
      expect(triggerForAllTokenizedFetchErrors({ ...signal, type: eventSignalType })).toBeFalsy();
      expect(triggerForAllTokenizedFetchErrors({ ...signal, namespace: oidcClientNamespace })).toBeFalsy();
      expect(triggerForAllTokenizedFetchErrors({})).toBeFalsy();
    });
    it(`triggerForAllTokenizedFetchEvents returns true if signal.type and payload.type matches`, () => {
      const signal = createTokenizedFetchModuleEventSignal({ type: undefined });
      expect(triggerForAllTokenizedFetchEvents(signal)).toBeTruthy();
      expect(createTriggerPropsForAllTokenizedFetchSignals()).toBeTruthy();
      expect(triggerForAllTokenizedFetchEvents({ ...signal, payload: undefined })).toBeTruthy();
      expect(triggerForAllTokenizedFetchEvents({ ...signal, type: errorSignalType })).toBeFalsy();
      expect(triggerForAllTokenizedFetchErrors({ ...signal, namespace: oidcClientNamespace })).toBeFalsy();
      expect(triggerForAllTokenizedFetchEvents({})).toBeFalsy();
    });
    it(`triggerForAllTokenizedFetchSignals returns true if signal namespace matches`, () => {
      const signal = createTokenizedFetchModuleEventSignal({ type: undefined });
      expect(triggerForAllTokenizedFetchSignals(signal)).toBeTruthy();
      expect(createTriggerPropsForAllTokenizedFetchSignals()).toBeTruthy();
      expect(triggerForAllTokenizedFetchSignals({ ...signal, payload: undefined })).toBeTruthy();
      expect(triggerForAllTokenizedFetchSignals({ ...signal, type: errorSignalType })).toBeTruthy();
      expect(triggerForAllTokenizedFetchSignals({ ...signal, namespace: oidcClientNamespace })).toBeFalsy();
      expect(triggerForAllTokenizedFetchSignals({})).toBeFalsy();
    });
    it(`createTriggerPropsForTokenizedFetchResponseSignals matches only if signal and its payload.typs matches`, () => {
      const responseType = 'fetchX';
      const trigger = createTriggerPropsForTokenizedFetchResponseSignals(responseType);
      const signal = createTokenizedFetchModuleEventSignal({ type: responseType });
      const mismatchingSignal = createTokenizedFetchModuleEventSignal({ type: 'wrong' });
      expect(trigger(signal)).toBeTruthy();
      expect(trigger(mismatchingSignal)).toBeFalsy();
      expect(trigger({ ...signal, payload: undefined })).toBeFalsy();
      expect(trigger(createTokenizedFetchModuleErrorSignal(new TokenizedFetchError('ups')))).toBeFalsy();
      expect(trigger({ ...signal, type: errorSignalType })).toBeFalsy();
      expect(trigger({ ...signal, namespace: oidcClientNamespace })).toBeFalsy();
      expect(trigger({})).toBeFalsy();
    });
  });
});
