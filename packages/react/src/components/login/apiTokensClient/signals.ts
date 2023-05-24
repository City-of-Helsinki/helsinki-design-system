import { eventSignalType, EventSignal } from '../beacon/signals';
import { ApiTokensClientEvent, TokenData, apiTokensClientNamespace } from './index';

export type ApiTokensEventSignal = EventSignal & {
  payload: {
    type: ApiTokensClientEvent;
    data: TokenData | null;
  };
};

export function createApiTokensChangeTrigger(
  eventType?: ApiTokensClientEvent,
): Pick<EventSignal, 'type' | 'namespace' | 'payload'> {
  return {
    type: eventSignalType,
    namespace: apiTokensClientNamespace,
    payload: eventType
      ? {
          type: eventType,
        }
      : undefined,
  };
}
