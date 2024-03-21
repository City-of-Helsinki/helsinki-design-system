export type EventId = keyof typeof eventIds;
export type EventType = keyof typeof eventTypes;

export const eventIds = {
  selectedOptions: 'selectedOptions',
  listItem: 'listItem',
  listGroup: 'listGroup',
  clearButton: 'clearButton',
  clearAllButton: 'clearAllButton',
  showAllButton: 'showAllButton',
  arrowButton: 'arrowButton',
  tag: 'tag',
  filter: 'filter',
  search: 'search',
  searchResult: 'searchResult',
  generic: 'generic',
} as const;

export const eventTypes = {
  click: 'click',
  outSideClick: 'outSideClick',
  change: 'change',
  success: 'success',
  error: 'error',
  cancelled: 'cancelled',
  blur: 'blur',
  focus: 'focus',
  close: 'close',
  focusMovedToNonListElement: 'focusMovedToNonListElement',
} as const;

export const isTagEventId = (eventId: EventId) => {
  return eventId === eventIds.tag;
};

const isClick = (eventType?: EventType) => eventType === eventTypes.click;
const isChange = (eventType?: EventType) => eventType === eventTypes.change;
const isError = (eventType?: EventType) => eventType === eventTypes.error;
const isBlur = (eventType?: EventType) => eventType === eventTypes.blur;
const isCancelled = (eventType?: EventType) => eventType === eventTypes.cancelled;
const isGenericEvent = (eventId?: EventId) => eventId === eventIds.generic;
const isIdForOption = (eventId: EventId) => eventId === eventIds.listItem || isTagEventId(eventId);
const isIdForClear = (eventId: EventId) => eventId === eventIds.clearAllButton || eventId === eventIds.clearButton;
const isEventForListToggle = (eventId: EventId) =>
  eventId === eventIds.selectedOptions || eventId === eventIds.arrowButton;

export const isOpenOrCloseEvent = (eventId: EventId, eventType?: EventType) => {
  return isClick(eventType) && isEventForListToggle(eventId);
};

export const isOptionClickEvent = (eventId: EventId, eventType?: EventType) => {
  return isClick(eventType) && isIdForOption(eventId);
};

export const isGroupClickEvent = (eventId: EventId, eventType?: EventType) => {
  return isClick(eventType) && eventId === eventIds.listGroup;
};

export const isClearOptionsClickEvent = (eventId: EventId, eventType?: EventType) => {
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

export const isFilterChangeEvent = (eventId: EventId, eventType?: EventType) => {
  return isChange(eventType) && eventId === eventIds.filter;
};

export const isSearchChangeEvent = (eventId: EventId, eventType?: EventType) => {
  return isChange(eventType) && eventId === eventIds.search;
};

export const isShowAllClickEvent = (eventId: EventId, eventType?: EventType) => {
  return isClick(eventType) && eventId === eventIds.showAllButton;
};

export const isSearchUpdateEvent = (eventId: EventId, eventType?: EventType) => {
  return eventId === eventIds.searchResult && eventType === eventTypes.success;
};

export const isSearchErrorEvent = (eventId: EventId, eventType?: EventType) => {
  return isError(eventType) && eventId === eventIds.searchResult;
};

export const isSearchCancelledEvent = (eventId: EventId, eventType?: EventType) => {
  return isCancelled(eventType) && eventId === eventIds.searchResult;
};

export const isGenericBlurEvent = (eventId: EventId, eventType?: EventType) => {
  return isGenericEvent(eventId) && isBlur(eventType);
};
