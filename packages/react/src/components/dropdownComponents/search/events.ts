import { eventTypes, baseEventIds, createEventCheckers } from '../shared/events/utils';

export type EventId = keyof typeof eventIds;
export type EventType = keyof typeof eventTypes;

export const eventIds = {
  ...baseEventIds,
  clearButton: 'clearButton',
} as const;

export { eventTypes };

// Create event checkers for Search component
const eventCheckers = createEventCheckers(eventIds);

// Export all the event checker functions
export const {
  isOutsideClickEvent,
  isCloseEvent,
  isCloseOnFocusMoveEvent,
  isGenericBlurEvent,
  isSearchChangeEvent,
  isSearchSuccessEvent,
  isSearchErrorEvent,
  isOptionClickEvent,
  isGroupClickEvent,
} = eventCheckers;

// Search-specific event checkers
export const isClearButtonClickEvent = (eventId: EventId, eventType?: EventType) => {
  return eventCheckers.isClick(eventType) && eventId === eventIds.clearButton;
};
