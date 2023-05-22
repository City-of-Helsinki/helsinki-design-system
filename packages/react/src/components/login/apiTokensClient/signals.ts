import { eventSignalType, EventSignal } from '../beacon/signals';
import { TokenData, apiTokensClientNamespace } from './index';

export type ApiTokensClientEvent = 'API_TOKENS_RENEWAL_STARTED' | 'API_TOKENS_UPDATED' | 'API_TOKENS_REMOVED';

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
