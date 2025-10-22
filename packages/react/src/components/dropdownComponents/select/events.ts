import { eventTypes, baseEventIds, createEventCheckers } from '../shared/events/utils';

export type EventId = keyof typeof eventIds;
export type EventType = keyof typeof eventTypes;

export const eventIds = {
  ...baseEventIds,
  selectedOptions: 'selectedOptions',
  clearButton: 'clearButton',
  clearAllButton: 'clearAllButton',
  showAllButton: 'showAllButton',
  tag: 'tag',
  filter: 'filter',
  searchInputField: 'searchInputField',
} as const;

export { eventTypes };

// Create event checkers for Select component
const eventCheckers = createEventCheckers(eventIds);

// Export common event checker functions (with overrides where needed)
export const {
  isOutsideClickEvent,
  isCloseEvent,
  isCloseOnFocusMoveEvent,
  isGenericBlurEvent,
  isSearchChangeEvent,
  isSearchSuccessEvent,
  isSearchErrorEvent,
  isGroupClickEvent,
} = eventCheckers;

// Select-specific event checkers (overriding common ones where needed)
export const isRemoveTagEventId = (eventId: EventId) => {
  return eventId === eventIds.tag;
};

const isIdForOption = (eventId: EventId) => eventId === eventIds.listItem || isRemoveTagEventId(eventId);
const isIdForClear = (eventId: EventId) => eventId === eventIds.clearAllButton || eventId === eventIds.clearButton;
const isEventForListToggle = (eventId: EventId) => eventId === eventIds.selectedOptions;

// Override the common isOptionClickEvent to handle tags
export const isOptionClickEvent = (eventId: EventId, eventType?: EventType) => {
  return eventCheckers.isClick(eventType) && isIdForOption(eventId);
};

export const isOpenOrCloseEvent = (eventId: EventId, eventType?: EventType) => {
  return eventCheckers.isClick(eventType) && isEventForListToggle(eventId);
};

export const isClearOptionsClickEvent = (eventId: EventId, eventType?: EventType) => {
  return eventCheckers.isClick(eventType) && isIdForClear(eventId);
};

export const isFilterChangeEvent = (eventId: EventId, eventType?: EventType) => {
  return eventCheckers.isChange(eventType) && eventId === eventIds.filter;
};

export const isShowAllClickEvent = (eventId: EventId, eventType?: EventType) => {
  return eventCheckers.isClick(eventType) && eventId === eventIds.showAllButton;
};
