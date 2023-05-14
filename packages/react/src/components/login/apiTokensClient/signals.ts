import { eventSignalType, EventSignal } from '../beacon/signals';
import { TokenData, apiTokensClientNamespace } from './index';

export type ApiTokensClientEvent = 'API_TOKENS_RENEWAL_STARTED' | 'API_TOKENS_UPDATED' | 'API_TOKENS_REMOVED';

export type ApiTokensEventSignal = EventSignal & {
  payload: {
    type: ApiTokensClientEvent;
    data: TokenData | null;
  };
};

export function createApiTokensChangeTrigger(): Pick<EventSignal, 'type' | 'namespace'> {
  return {
    type: eventSignalType,
    namespace: apiTokensClientNamespace,
  };
}
