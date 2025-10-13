import {
  eventIds,
  eventTypes,
  EventId,
  EventType,
  isOptionClickEvent,
  isGroupClickEvent,
  isOutsideClickEvent,
  isCloseEvent,
  isCloseOnFocusMoveEvent,
  isGenericBlurEvent,
  isSearchChangeEvent,
  isSearchSuccessEvent,
  isSearchErrorEvent,
  isClearButtonClickEvent,
} from './events';

type TestProps = {
  func: (...args: never[]) => boolean;
  ids: EventId[];
  types: EventType[];
};

describe('events', () => {
  const ids = Object.keys(eventIds) as EventId[];
  const types = Object.keys(eventTypes) as EventType[];
  // Test all event checkers that Search component uses

  const successfulFunctionProps: TestProps[] = [
    {
      func: isOptionClickEvent,
      ids: [eventIds.listItem],
      types: [eventTypes.click],
    },
    {
      func: isGroupClickEvent,
      ids: [eventIds.listGroup],
      types: [eventTypes.click],
    },
    {
      func: isOutsideClickEvent,
      ids: [eventIds.generic],
      types: [eventTypes.outSideClick],
    },
    {
      func: isCloseEvent,
      ids: [eventIds.generic],
      types: [eventTypes.close],
    },
    {
      func: isCloseOnFocusMoveEvent,
      ids: [eventIds.generic],
      types: [eventTypes.focusMovedToNonListElement],
    },
    {
      func: isGenericBlurEvent,
      ids: [eventIds.generic],
      types: [eventTypes.blur],
    },
    {
      func: isSearchChangeEvent,
      ids: [eventIds.search],
      types: [eventTypes.change],
    },
    {
      func: isSearchSuccessEvent,
      ids: [eventIds.searchResult],
      types: [eventTypes.success],
    },
    {
      func: isSearchErrorEvent,
      ids: [eventIds.searchResult],
      types: [eventTypes.error],
    },
    {
      func: isClearButtonClickEvent,
      ids: [eventIds.clearButton],
      types: [eventTypes.click],
    },
  ];
  it('Func returns true only when certain ids and types match.', async () => {
    const successfulCalls: TestProps[] = [];
    let expectedSuccessfulCalls = 0;
    ids.forEach((eventIdKey) => {
      const eventId = eventIds[eventIdKey];
      types.forEach((eventTypeKey) => {
        const eventType = eventTypes[eventTypeKey];
        // call every function with every id + type
        // only defined success combinations should return true
        successfulFunctionProps.forEach((props) => {
          const idMatch = props.ids.includes(eventId);
          const typeMatch = props.types.includes(eventType);
          expect(props.func(eventId as never, eventType as never)).toBe(idMatch && typeMatch);
          // store successful calls to make sure every function was called successfully at least once
          if (idMatch && typeMatch) {
            successfulCalls.push({ func: props.func, ids: [eventId], types: [eventType] });
          }
        });
      });
    });
    // each test suite must have successful tests for each event id and event type
    successfulFunctionProps.forEach((props) => {
      expectedSuccessfulCalls += Math.max(props.ids.length, props.types.length);
    });
    expect(successfulCalls.length).toBe(expectedSuccessfulCalls);
  });
});
