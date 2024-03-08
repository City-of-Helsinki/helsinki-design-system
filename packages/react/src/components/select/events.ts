export type EventId = keyof typeof eventIds;
export type EventType = keyof typeof eventTypes;

export const eventIds = {
  selectedOptions: 'selectedOptions',
  listItem: 'listItem',
  listGroup: 'listGroup',
  clearButton: 'clearButton',
  arrowButton: 'arrowButton',
  generic: 'generic',
} as const;

export const eventTypes = {
  click: 'click',
  outSideClick: 'outSideClick',
  change: 'change',
  error: 'error',
  close: 'close',
} as const;

const isClick = (eventType?: EventType) => eventType === eventTypes.click;
const isGenericEvent = (eventId?: EventId) => eventId === eventIds.generic;
const isIdForOption = (eventId: EventId) => eventId === eventIds.listItem;
const isIdForClear = (eventId: EventId) => eventId === eventIds.clearButton;
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
