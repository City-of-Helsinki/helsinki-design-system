// components
export * from './components/LoginProvider';
export * from './components/LoginButton';
export * from './components/LoginCallbackHandler';
export * from './components/WithAuthenticatedUser';
export * from './components/WithAuthentication';
export * from './components/WithoutAuthenticatedUser';
export * from './components/SessionEndedHandler';

// hooks
export * from './client/hooks';
export * from './beacon/hooks';
export * from './apiTokensClient/hooks';
export * from './sessionPoller/hooks';

// types
export * from './types';
export { ApiTokenClientProps, TokenData, ApiTokenClient, ApiTokensClientEvent } from './apiTokensClient/index';
export { SessionPoller, SessionPollerEvent, SessionPollerOptions } from './sessionPoller/sessionPoller';
export {
  OidcClient,
  OidcClientEvent,
  OidcClientProps,
  OidcClientState,
  LoginProps,
  LogoutProps,
  Amr,
} from './client/index';
export {
  SignalType,
  SignalNamespace,
  SignalPayload,
  ConnectedModule,
  Beacon,
  SignalContext,
  Signal,
  SignalListener,
  SignalTriggerProps,
  SignalTrigger,
  SignalListenerSource,
  Disposer,
} from './beacon/beacon';
export {
  NamespacedBeacon,
  ErrorPayload,
  ErrorSignal,
  EventType,
  EventData,
  EventPayload,
  EventSignal,
  StateChangeType,
  StateChangeSignalPayload,
  StateChangeSignal,
} from './beacon/signals';

// modules
export * from './client/oidcClient';
export * from './apiTokensClient/apiTokensClient';
export { createSessionPoller } from './sessionPoller/sessionPoller';

// beacon
export { createBeacon, createSignalTrigger } from './beacon/beacon';

// errors
export * from './apiTokensClient/apiTokensClientError';
export * from './client/oidcClientError';
export * from './sessionPoller/sessionPollerError';

// events
export { apiTokensClientEvents } from './apiTokensClient/index';
export { oidcClientEvents } from './client/index';
export { sessionPollerEvents } from './sessionPoller/sessionPoller';

// stateChanges
export { oidcClientStates } from './client/index';

// plain js
export { createLoginSystem } from './createLoginSystem';

// namespaces
export { apiTokensClientNamespace } from './apiTokensClient/index';
export { oidcClientNamespace } from './client/index';
export { sessionPollerNamespace } from './sessionPoller/sessionPoller';

// signals
export * from './apiTokensClient/signals';
export * from './client/signals';
export * from './sessionPoller/signals';
export {
  initSignalType,
  errorSignalType,
  eventSignalType,
  stateChangeSignalType,
  createNamespacedBeacon,
  createErrorSignal,
  createEventSignal,
  createStateChangeTriggerProps,
  createTriggerPropsForAllSignals,
  createTriggerForAllSignalTypes,
  createTriggerForAllNamespaces,
  convertSignalToTrigger,
  filterSignals,
  isErrorSignal,
  isEventSignal,
  isInitSignal,
  isStateChangeSignal,
  isNamespacedSignal,
  getEventSignalPayload,
  getStateChangeSignalPayload,
  getErrorSignalPayload,
  createInitTriggerProps,
  createEventTriggerProps,
  createErrorTriggerProps,
  createStateChangeSignal,
  waitForSignals,
} from './beacon/signals';
