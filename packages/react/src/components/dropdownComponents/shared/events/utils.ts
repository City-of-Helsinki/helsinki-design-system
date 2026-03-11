// Common event type and ID types
export type EventType = keyof typeof eventTypes;
export type EventId = string;

// Common event types shared across components
export const eventTypes = {
  click: 'click',
  outSideClick: 'outSideClick',
  change: 'change',
  error: 'error',
  cancelled: 'cancelled',
  blur: 'blur',
  focus: 'focus',
  focusMovedToNonListElement: 'focusMovedToNonListElement',
  close: 'close',
  success: 'success',
} as const;

// Common event checking utilities
const isClick = (eventType?: EventType) => eventType === eventTypes.click;
const isChange = (eventType?: EventType) => eventType === eventTypes.change;
const isError = (eventType?: EventType) => eventType === eventTypes.error;
const isBlur = (eventType?: EventType) => eventType === eventTypes.blur;

/**
 * Factory function to create event checkers with component-specific event IDs
 */
export function createEventCheckers<TEventIds extends Record<string, string>>(eventIds: TEventIds) {
  const isGenericEvent = (eventId?: string) => eventId === eventIds.generic;

  return {
    // Generic event checkers (work with any eventIds)
    isOutsideClickEvent: (eventId: string, eventType?: EventType) => {
      return isGenericEvent(eventId) && eventType === eventTypes.outSideClick;
    },

    isCloseEvent: (eventId: string, eventType?: EventType) => {
      return isGenericEvent(eventId) && eventType === eventTypes.close;
    },

    isCloseOnFocusMoveEvent: (eventId: string, eventType?: EventType) => {
      return isGenericEvent(eventId) && eventType === eventTypes.focusMovedToNonListElement;
    },

    isGenericBlurEvent: (eventId: string, eventType?: EventType) => {
      return isGenericEvent(eventId) && isBlur(eventType);
    },

    isSearchChangeEvent: (eventId: string, eventType?: EventType) => {
      return isChange(eventType) && eventId === eventIds.search;
    },

    isSearchSuccessEvent: (eventId: string, eventType?: EventType) => {
      return eventId === eventIds.searchResult && eventType === eventTypes.success;
    },

    isSearchErrorEvent: (eventId: string, eventType?: EventType) => {
      return isError(eventType) && eventId === eventIds.searchResult;
    },

    isOptionClickEvent: (eventId: string, eventType?: EventType) => {
      return isClick(eventType) && eventId === eventIds.listItem;
    },

    isGroupClickEvent: (eventId: string, eventType?: EventType) => {
      return isClick(eventType) && eventId === eventIds.listGroup;
    },

    // Helper functions available to all components
    isClick,
    isChange,
    isError,
    isBlur,
    isGenericEvent,
  };
}

// Base event IDs that most dropdown components need
export const baseEventIds = {
  listItem: 'listItem',
  listGroup: 'listGroup',
  generic: 'generic',
  search: 'search',
  searchResult: 'searchResult',
  assistive: 'assistive',
  error: 'error',
} as const;
