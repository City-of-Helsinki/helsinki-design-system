import { eventTypes, baseEventIds, createEventCheckers } from '../shared/events/utils';

export type EventId = keyof typeof eventIds;
export type EventType = keyof typeof eventTypes;

// ModularOptionList only handles basic list interactions: option clicks and group label clicks
// All other events (close, blur, search, etc.) are handled by parent components (Select/Search)
export const eventIds = {
  ...baseEventIds,
} as const;

export { eventTypes };

// Create event checkers for ModularOptionList component
const eventCheckers = createEventCheckers(eventIds);

// Export only the event checkers that ModularOptionList actually handles in its dataUpdater
export const { isOptionClickEvent, isGroupClickEvent } = eventCheckers;
