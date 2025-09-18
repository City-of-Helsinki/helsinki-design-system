export type EventId = keyof typeof eventIds;
export type EventType = keyof typeof eventTypes;

export const eventIds = {
  listItem: 'listItem',
  listGroup: 'listGroup',
  clearButton: 'clearButton',
  generic: 'generic',
  search: 'search',
  searchResult: 'searchResult',
  assistive: 'assistive',
  error: 'error',
} as const;

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

const isClick = (eventType?: EventType) => eventType === eventTypes.click;
const isChange = (eventType?: EventType) => eventType === eventTypes.change;
const isError = (eventType?: EventType) => eventType === eventTypes.error;
const isGenericEvent = (eventId?: EventId) => eventId === eventIds.generic;
const isBlur = (eventType?: EventType) => eventType === eventTypes.blur;
const isIdForOption = (eventId: EventId) => eventId === eventIds.listItem;
const isIdForClear = (eventId: EventId) => eventId === eventIds.clearButton;

export const isOptionClickEvent = (eventId: EventId, eventType?: EventType) => {
  return isClick(eventType) && isIdForOption(eventId);
};

export const isGroupClickEvent = (eventId: EventId, eventType?: EventType) => {
  return isClick(eventType) && eventId === eventIds.listGroup;
};

export const isClearButtonClickEvent = (eventId: EventId, eventType?: EventType) => {
  return isClick(eventType) && isIdForClear(eventId);
};

export const isOutsideClickEvent = (eventId: EventId, eventType?: EventType) => {
  return isGenericEvent(eventId) && eventType === eventTypes.outSideClick;
};

export const isCloseEvent = (eventId: EventId, eventType?: EventType) => {
  return isGenericEvent(eventId) && eventType === eventTypes.close;
};

export const isCloseOnFocusMoveEvent = (eventId: EventId, eventType?: EventType) => {
  return isGenericEvent(eventId) && eventType === eventTypes.focusMovedToNonListElement;
};

export const isSearchChangeEvent = (eventId: EventId, eventType?: EventType) => {
  return isChange(eventType) && eventId === eventIds.search;
};

export const isSearchSuccessEvent = (eventId: EventId, eventType?: EventType) => {
  return eventId === eventIds.searchResult && eventType === eventTypes.success;
};

export const isSearchErrorEvent = (eventId: EventId, eventType?: EventType) => {
  return isError(eventType) && eventId === eventIds.searchResult;
};

export const isGenericBlurEvent = (eventId: EventId, eventType?: EventType) => {
  return isGenericEvent(eventId) && isBlur(eventType);
};
