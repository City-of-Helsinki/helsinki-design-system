export type EventId = keyof typeof eventIds;
export type EventType = keyof typeof eventTypes;

export const eventIds = {
  selectedOptions: 'selectedOptions',
  listItem: 'listItem',
  listGroup: 'listGroup',
  clearButton: 'clearButton',
  clearAllButton: 'clearAllButton',
  showAllButton: 'showAllButton',
  tag: 'tag',
  arrowButton: 'arrowButton',
  generic: 'generic',
  filter: 'filter',
  search: 'search',
  searchResult: 'searchResult',
} as const;

export const eventTypes = {
  click: 'click',
  outSideClick: 'outSideClick',
  change: 'change',
  error: 'error',
  cancelled: 'cancelled',
  close: 'close',
  success: 'success',
} as const;

export const isTagEventId = (eventId: EventId) => {
  return eventId === eventIds.tag;
};

const isClick = (eventType?: EventType) => eventType === eventTypes.click;
const isChange = (eventType?: EventType) => eventType === eventTypes.change;
const isError = (eventType?: EventType) => eventType === eventTypes.error;
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

export const isFilterChangeEvent = (eventId: EventId, eventType?: EventType) => {
  return isChange(eventType) && eventId === eventIds.filter;
};

export const isSearchChangeEvent = (eventId: EventId, eventType?: EventType) => {
  return isChange(eventType) && eventId === eventIds.search;
};

export const isShowAllClickEvent = (eventId: EventId, eventType?: EventType) => {
  return isClick(eventType) && eventId === eventIds.showAllButton;
};

export const isSearchSuccessEvent = (eventId: EventId, eventType?: EventType) => {
  return eventId === eventIds.searchResult && eventType === eventTypes.success;
};

export const isSearchErrorEvent = (eventId: EventId, eventType?: EventType) => {
  return isError(eventType) && eventId === eventIds.searchResult;
};
