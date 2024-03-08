import {
  eventIds,
  eventTypes,
  isClearOptionsClickEvent,
  EventId,
  EventType,
  isOptionClickEvent,
  isOpenOrCloseEvent,
  isGroupClickEvent,
  isOutsideClickEvent,
  isCloseEvent,
} from './events';

type TestProps = {
  func: (...args: never[]) => boolean;
  ids: EventId[];
  types: EventType[];
};

describe('events', () => {
  const ids = Object.keys(eventIds);
  const types = Object.keys(eventTypes);
  // given function return true when given id and type matches

  const successfulFunctionProps: TestProps[] = [
    {
      func: isClearOptionsClickEvent,
      ids: [eventIds.clearButton],
      types: [eventTypes.click],
    },
    {
      func: isOptionClickEvent,
      ids: [eventIds.listItem],
      types: [eventTypes.click],
    },
    {
      func: isOpenOrCloseEvent,
      ids: [eventIds.selectedOptions, eventIds.arrowButton],
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
  ];
  it('Func returns true only when certain ids and types match.', async () => {
    const successfulCalls: TestProps[] = [];
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
    // +1 is for matching both ids in "isOpenOrCloseEvent" test
    expect(successfulCalls.length).toBe(successfulFunctionProps.length + 1);
  });
});
