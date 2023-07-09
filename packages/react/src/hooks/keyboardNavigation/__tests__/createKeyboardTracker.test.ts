import { fireEvent } from '@testing-library/react';

import {
  ElementData,
  ElementMapper,
  ElementPath,
  EventType,
  KeyboardTracker,
  KeyboardTrackerProps,
  NodeSelector,
  getArrayItemAtIndex,
} from '..';
import { createElementMapper } from '../createElementMapper';
import { createFocusTracker } from '../createFocusTracker';
import { createKeyboardTracker } from '../createKeyboardTracker';
import { multiLevelDom, multiLevelDomSelectorsForKeyboardTracker, visibleElementBounds } from '../test.util';

// (( ))const mockedElementMapper = getNav

type ElementMapperKey = keyof ElementMapper;
type FocusTracker = ReturnType<typeof createFocusTracker>;
type FocusTrackerKey = keyof FocusTracker;
type onChangeParameters = [EventType, KeyboardTracker, ElementPath | null | undefined];

const mockActualElementMapper = jest.requireActual('../createElementMapper');

const elementMapperSpyFactory: Map<ElementMapperKey, jest.SpyInstance> = new Map();
const mockAddElementMapperSpy = (obj: ElementMapper) => {
  elementMapperSpyFactory.clear();
  Object.keys(obj).forEach((key) => {
    const target = obj[key];
    if (typeof target === 'function') {
      const spy = jest.spyOn(obj, key as ElementMapperKey);
      elementMapperSpyFactory.set(key as ElementMapperKey, spy);
    }
  });
};

jest.mock('../createElementMapper', () => ({
  ...(jest.requireActual('../createElementMapper') as Record<string, unknown>),
  createElementMapper: (...args: Parameters<typeof createElementMapper>) => {
    const actualTracker = mockActualElementMapper.createElementMapper(...args);
    mockAddElementMapperSpy(actualTracker);
    return actualTracker;
  },
}));

const mockActualFocusTracker = jest.requireActual('../createFocusTracker');

const focusTrackerSpyFactory: Map<FocusTrackerKey, jest.SpyInstance> = new Map();
const mockAddEFocusTrackerSpy = (obj: FocusTracker) => {
  focusTrackerSpyFactory.clear();
  Object.keys(obj).forEach((key) => {
    const target = obj[key];
    if (typeof target === 'function') {
      const spy = jest.spyOn(obj, key as FocusTrackerKey);
      focusTrackerSpyFactory.set(key as FocusTrackerKey, spy);
    }
  });
};

jest.mock('../createFocusTracker', () => ({
  ...(jest.requireActual('../createFocusTracker') as Record<string, unknown>),
  createFocusTracker: (...args: Parameters<typeof createFocusTracker>) => {
    const actualTracker = mockActualFocusTracker.createFocusTracker(...args);
    mockAddEFocusTrackerSpy(actualTracker);
    return actualTracker;
  },
}));

const getElementMapperSpy = (key: ElementMapperKey) => {
  return elementMapperSpyFactory.get(key);
};
const getFocusTrackerSpy = (key: FocusTrackerKey) => {
  return focusTrackerSpyFactory.get(key);
};

describe('createKeyboardTracker', () => {
  function createDOM(childNodesAsString: string) {
    const buttonInside = `<button id="button-inside">button inside</button>`;
    const div = document.createElement('div');
    div.innerHTML = `${buttonInside}${childNodesAsString}`;
    document.body.appendChild(div);
    const buttonOutside = document.createElement('button');
    buttonOutside.innerHTML = 'button outside';
    buttonOutside.setAttribute('id', 'button-outside');
    document.body.appendChild(buttonOutside);
    return div;
  }

  beforeAll(() => {
    // jsdom has no getBoundingClientRect support
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(visibleElementBounds);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  let dom: HTMLDivElement;
  let tracker: KeyboardTracker;
  const changeListener = jest.fn();
  const getChangeListenerCallsByType = (type: EventType): onChangeParameters[] => {
    const { calls } = changeListener.mock;
    return calls.filter((call) => {
      const c = call[0];
      return c === type;
    });
  };
  const checkChangeListenerCalls = (events: EventType[]): void => {
    const { calls } = changeListener.mock;
    const callTypes = calls.map((call) => call[0]);
    expect(callTypes).toEqual(events);
  };

  const getPathFromChangeListenerCall = (call?: onChangeParameters): ElementPath => {
    return (call && call[2]) || [];
  };

  const setFocus = (element: HTMLElement) => {
    element.focus();
    fireEvent.focus(element);
  };

  const moveFocusIn = () => {
    const button = dom.querySelectorAll('#button-inside')[0] as HTMLButtonElement;
    button.focus();
    // if fireEvent.focus is called too, then focusin and focuschange are triggered,
    // because two focus events are sent.
    return button;
  };

  const moveFocusOut = () => {
    const button = document.body.querySelectorAll('#button-outside')[0] as HTMLButtonElement;
    setFocus(button);
    return button;
  };

  const getContainerElements = (element: HTMLElement, depth: number) => {
    const fakePath = new Array(depth);
    fakePath[depth - 1] = { element };
    return (multiLevelDomSelectorsForKeyboardTracker.containerSelector as NodeSelector)(element, fakePath);
  };

  const getContainerElement = (indexPath: number[]) => {
    return indexPath.reduce((currentElement, pathIndex, arrayIndex) => {
      if (!currentElement) {
        return undefined;
      }
      const containers = getContainerElements(currentElement, arrayIndex + 1);
      return containers && (containers[pathIndex] as HTMLElement);
    }, dom as HTMLElement | undefined);
  };

  const getFocusableElements = (indexPath: number[]) => {
    const container = getContainerElement(indexPath);
    if (!container) {
      return [];
    }
    const fakePath = new Array(indexPath.length + 1);
    fakePath[fakePath.length - 1] = { element: container };
    const nodes = (multiLevelDomSelectorsForKeyboardTracker.focusableSelector as NodeSelector)(
      container as HTMLElement,
      fakePath,
    );
    return nodes ? Array.from(nodes) : [];
  };

  const getFocusableElement = (indexPath: number[]) => {
    const clone = [...indexPath];
    const last = clone.pop();
    const focusables = getFocusableElements(clone);
    return focusables ? Array.from(focusables)[last as number] : undefined;
  };

  const triggerKeyboardCommand = (direction: EventType, keys: KeyboardTrackerProps['keys'], index = 0) => {
    const keyList = keys && keys[direction];
    if (!keyList) {
      throw new Error(`No key for ${direction}`);
    }
    fireEvent.keyUp(dom, { key: keyList[index] });
  };

  const keys: KeyboardTrackerProps['keys'] = {
    next: ['ArrowDown', 'ArrowRight'],
    previous: ['ArrowUp', 'ArrowLeft'],
    levelDown: ['PageDown', 'Space'],
    levelUp: ['Escape', 'PageUp'],
  };

  beforeEach(() => {
    if (dom) {
      document.body.removeChild(dom);
    }
    changeListener.mockClear();
    dom = createDOM(multiLevelDom);
    tracker = createKeyboardTracker(dom, {
      keys,
      onChange: changeListener,
      ...multiLevelDomSelectorsForKeyboardTracker,
    });
  });
  describe('When created', () => {
    it('getFocusedElement() returns document.activeDocument. onChange is not triggered. Element map is not created.', () => {
      expect(tracker.getFocusedElement()).toBe(document.body);
      expect(changeListener).toHaveBeenCalledTimes(0);
      expect(getElementMapperSpy('refresh')).toHaveBeenCalledTimes(0);
    });
  });
  describe('When focus is moved inside, elementMapper.refresh() is called and "focusIn" and "dataUpdated" events are triggered.', () => {
    it('If focus is set to an untracked element, focusTracker does not store the element', () => {
      const focusedButton = moveFocusIn();
      expect(tracker.getFocusedElement()).toBe(focusedButton);
      getChangeListenerCallsByType('focusIn');
      expect(changeListener).toHaveBeenCalledTimes(2);
      const focusInCalls = getChangeListenerCallsByType('focusIn');
      expect(focusInCalls).toHaveLength(1);
      expect(getPathFromChangeListenerCall(focusInCalls[0])).toEqual([
        {
          type: 'untracked',
          element: focusedButton,
          index: -1,
        },
      ]);
      expect(tracker.getFocusedElementPath()).toBeNull();
      expect(getChangeListenerCallsByType('dataUpdated')).toHaveLength(1);
      expect(getElementMapperSpy('refresh')).toHaveBeenCalledTimes(1);
    });
    it('If focus is set to a tracked element, focusTracker stores the element.', () => {
      const element = getFocusableElement([1, 0]) as HTMLElement;
      setFocus(element);
      expect(changeListener).toHaveBeenCalledTimes(2);
      const focusInCalls = getChangeListenerCallsByType('focusIn');
      expect(focusInCalls).toHaveLength(1);

      expect(getArrayItemAtIndex(getPathFromChangeListenerCall(focusInCalls[0]), -1)).toEqual({
        type: 'focusable',
        element,
        index: 0,
      });
      expect(getFocusTrackerSpy('storeValidPathToFocusedElement')).toHaveBeenCalledTimes(1);
      expect(tracker.getFocusedElement()).toBe(element);
      expect(tracker.getFocusedElementPath()).toHaveLength(3);
    });
  });
  describe('When focus is moved outside', () => {
    it('ElementMapper.dispose() is called and "focusOut" and "dataUpdated" are triggered', () => {
      moveFocusIn();
      changeListener.mockClear();
      const focusedButton = moveFocusOut();
      expect(tracker.getFocusedElement()).toBe(focusedButton);
      expect(changeListener).toHaveBeenCalledTimes(2);
      const focusOutCalls = getChangeListenerCallsByType('focusOut');
      const dataUpdatedCalls = getChangeListenerCallsByType('dataUpdated');
      expect(focusOutCalls).toHaveLength(1);
      expect(dataUpdatedCalls).toHaveLength(1);
      expect(getPathFromChangeListenerCall(focusOutCalls[0])).toEqual([
        {
          type: 'untracked',
          element: focusedButton,
          index: -1,
        },
      ]);
      expect(getElementMapperSpy('dispose')).toHaveBeenCalledTimes(1);
      expect(getFocusTrackerSpy('storeFocusedElement')).toHaveBeenCalledTimes(1);
    });
  });
  describe('When focus is moved within, "focusChange" event is triggered.', () => {
    it('If focus is set in an tracked element, focusTracker stores the element.', () => {
      const secondLiFocusables = getFocusableElements([1]);
      const element = secondLiFocusables[0] as HTMLElement;
      const element2 = secondLiFocusables[1] as HTMLElement;
      setFocus(element);
      changeListener.mockClear();
      setFocus(element2);
      expect(changeListener).toHaveBeenCalledTimes(1);
      const focusChangeCalls = getChangeListenerCallsByType('focusChange');
      expect(focusChangeCalls).toHaveLength(1);

      expect(getArrayItemAtIndex(getPathFromChangeListenerCall(focusChangeCalls[0]), -1)).toEqual({
        type: 'focusable',
        element: element2,
        index: 1,
      });
      expect(tracker.getFocusedElement()).toBe(element2);
      expect(tracker.getFocusedElementPath()).toHaveLength(3);

      changeListener.mockClear();
      setFocus(element);
      expect(changeListener).toHaveBeenCalledTimes(1);
      expect(
        getArrayItemAtIndex(getPathFromChangeListenerCall(getChangeListenerCallsByType('focusChange')[0]), -1),
      ).toEqual({
        type: 'focusable',
        element,
        index: +0,
      });
      expect(tracker.getFocusedElement()).toBe(element);
    });
  });
  describe('Keyboard commands are tracked', () => {
    const checkFocusTrackerNavigationCalls = ({
      previous,
      next,
      levelUp,
      levelDown,
    }: Partial<Record<EventType, number>>) => {
      expect(getFocusTrackerSpy('previous')).toHaveBeenCalledTimes(previous || 0);
      expect(getFocusTrackerSpy('next')).toHaveBeenCalledTimes(next || 0);
      expect(getFocusTrackerSpy('levelUp')).toHaveBeenCalledTimes(levelUp || 0);
      expect(getFocusTrackerSpy('levelDown')).toHaveBeenCalledTimes(levelDown || 0);
      return true;
    };
    it('Nothing is focused, if tracker is not initiated, i.e. root element is not mapped.', () => {
      triggerKeyboardCommand('next', keys);
      expect(tracker.getFocusedElementPath()).toBeNull();
      checkFocusTrackerNavigationCalls({ next: 1 });
    });
    it('When a "next" key is pressed, focus is set to the first element, if no element is focused already.', () => {
      const firstContainerFocusables = getFocusableElements([0]);
      const firstElement = getArrayItemAtIndex(firstContainerFocusables, 0) as HTMLElement;
      // must initiate the tracker
      tracker.refresh();
      triggerKeyboardCommand('next', keys);
      expect(tracker.getFocusedElement()).toBe(firstElement);
      checkFocusTrackerNavigationCalls({ next: 1 });
    });
    it('When a "previous" key is pressed, focus is set to the first element, if no element is focused already.', () => {
      const lastContainerFocusables = getFocusableElements([3]);
      const lastElement = getArrayItemAtIndex(lastContainerFocusables, -1) as HTMLElement;
      // must initiate the tracker
      tracker.refresh();
      triggerKeyboardCommand('previous', keys);
      expect(tracker.getFocusedElement()).toBe(lastElement);
      checkFocusTrackerNavigationCalls({ previous: 1 });
    });
    it('When any tracked key is pressed, navigation function of the focusTracker is called. ', () => {
      const keyCounts: Partial<Record<EventType, number>> = { next: 0, previous: 0, levelUp: 0, levelDown: 0 };
      const addCount = (direction: EventType) => {
        (keyCounts[direction] as number) += 1;
      };
      const testMoves = (direction: EventType) => {
        triggerKeyboardCommand(direction, keys, 0);
        addCount(direction);
        expect(checkFocusTrackerNavigationCalls(keyCounts)).toBeTruthy();

        triggerKeyboardCommand(direction, keys, 1);
        addCount(direction);
        expect(checkFocusTrackerNavigationCalls(keyCounts)).toBeTruthy();
      };
      tracker.refresh();
      testMoves('next');
      testMoves('previous');
      testMoves('levelUp');
      testMoves('levelDown');
    });
    it('setKeys() changes the keys ', () => {
      const newKeys: KeyboardTrackerProps['keys'] = {
        next: ['a', 'b'],
        previous: ['c', 'd'],
        levelDown: ['e', 'f'],
        levelUp: ['1', '2'],
      };
      tracker.setKeys(newKeys);
      const keyCounts: Partial<Record<EventType, number>> = { next: 0, previous: 0, levelUp: 0, levelDown: 0 };
      const addCount = (direction: EventType) => {
        (keyCounts[direction] as number) += 1;
      };
      const testMoves = (direction: EventType) => {
        triggerKeyboardCommand(direction, newKeys, 0);
        addCount(direction);
        expect(checkFocusTrackerNavigationCalls(keyCounts)).toBeTruthy();

        triggerKeyboardCommand(direction, newKeys, 1);
        addCount(direction);
        expect(checkFocusTrackerNavigationCalls(keyCounts)).toBeTruthy();
      };
      tracker.refresh();
      testMoves('next');
      testMoves('previous');
      testMoves('levelUp');
      testMoves('levelDown');
      triggerKeyboardCommand('next', keys, 0);
      triggerKeyboardCommand('previous', keys, 0);
      triggerKeyboardCommand('levelUp', keys, 0);
      triggerKeyboardCommand('levelDown', keys, 0);
      expect(checkFocusTrackerNavigationCalls(keyCounts)).toBeTruthy();
    });
    it('setKeys() returns all keys and changes only passed keys', () => {
      expect(tracker.setKeys({})).toEqual(keys);
      const newNext = {
        next: ['a', 'b'],
      };
      const newPrevious = {
        previous: ['c', 'd'],
      };
      expect(tracker.setKeys(newNext)).toEqual({ ...keys, ...newNext });
      expect(tracker.setKeys(newPrevious)).toEqual({ ...keys, ...newNext, ...newPrevious });
    });
  });
  describe('setFocusedElementByIndex(). Function does not trigger "focusChange" events.', () => {
    it('Sets focus to a focusable element by array of indexes. Returns true, if focus was set to the element.', () => {
      const indexTo01 = [0, 1];
      const indexTo21 = [2, 1];
      const events: EventType[] = ['dataUpdated', 'focusIn'];
      changeListener.mockClear();
      // tracker's first index is always root (0)
      expect(tracker.setFocusedElementByIndex([0, ...indexTo01])).toBeTruthy();
      checkChangeListenerCalls(events);
      expect(tracker.getFocusedElement()).toBe(getFocusableElement(indexTo01));

      expect(tracker.setFocusedElementByIndex([0, ...indexTo21])).toBeTruthy();
      expect(tracker.getFocusedElement()).toBe(getFocusableElement(indexTo21));
      checkChangeListenerCalls(events);
    });
    it('Negative index can be used', () => {
      const positiveIndexTo01 = [0, 1];
      const negativeIndexTo01 = [0, -1];
      changeListener.mockClear();
      expect(tracker.setFocusedElementByIndex([0, ...negativeIndexTo01])).toBeTruthy();
      expect(tracker.getFocusedElement()).toBe(getFocusableElement(positiveIndexTo01));
    });
    it('Returns false when element is not focused.', () => {
      changeListener.mockClear();
      // tracker's first index is always root (0)
      expect(tracker.setFocusedElementByIndex([0, 20])).toBeFalsy();
    });
    it('Sets focus to a focusable element by single index number. Single number should be used when there are no subLevels. Focusables of the root element or its containers are only selectable with one number.', () => {
      const indexTo01 = [0, 1];
      const numberTo01 = 1;
      const indexTo21 = [2, 1];
      const numberTo21 = 5;
      changeListener.mockClear();
      expect(tracker.setFocusedElementByIndex(numberTo01)).toBeTruthy();
      expect(tracker.getFocusedElement()).toBe(getFocusableElement(indexTo01));

      expect(tracker.setFocusedElementByIndex(numberTo21)).toBeTruthy();
      expect(tracker.getFocusedElement()).toBe(getFocusableElement(indexTo21));
    });
    it('Negative index can be used with single numbers', () => {
      const indexTo21 = [2, 1];
      const negativeNumberTo21 = -3;

      expect(tracker.setFocusedElementByIndex(negativeNumberTo21)).toBeTruthy();
      expect(tracker.getFocusedElement()).toBe(getFocusableElement(indexTo21));
    });
  });
  describe('setFocusToElement() calls focusTracker.setFocusToElement()', () => {
    it('It also initiates elementMapper or focus could not be set', () => {
      const indexTo3201 = [3, 2, 0, 1];
      const targetElement = getFocusableElement(indexTo3201) as HTMLElement;
      expect(tracker.setFocusToElement(targetElement)).toBeTruthy();
      expect(getElementMapperSpy('refresh')).toHaveBeenCalledTimes(1);
      expect(getFocusTrackerSpy('setFocusToElement')).toHaveBeenCalledTimes(1);
      checkChangeListenerCalls(['dataUpdated', 'focusIn']);
      expect(tracker.getFocusedElement()).toBe(targetElement);
    });
  });
  describe('setFocusToElementDataOrPath() calls focusTracker.setFocusToElementDataOrPath()', () => {
    it('It also initiates elementMapper or focus could not be set', () => {
      const indexTo3201 = [3, 2, 0, 1];
      const targetElement = getFocusableElement(indexTo3201) as HTMLElement;
      expect(tracker.setFocusToElementDataOrPath({ element: targetElement })).toBeTruthy();
      expect(getElementMapperSpy('refresh')).toHaveBeenCalledTimes(1);
      expect(getFocusTrackerSpy('setFocusToElementDataOrPath')).toHaveBeenCalledTimes(1);
      checkChangeListenerCalls(['dataUpdated', 'focusIn']);
      expect(tracker.getFocusedElement()).toBe(targetElement);
    });
  });
  describe('getNavigationOptions() returns navigation options from currently focused element', () => {
    it('All options are undefined when no element is focused', () => {
      expect(tracker.getNavigationOptions()).toEqual({});
      checkChangeListenerCalls([]);
    });
    it('All options are returned', () => {
      const indexTo20 = getFocusableElement([2, 0]) as HTMLElement;
      const indexTo21 = getFocusableElement([2, 1]) as HTMLElement;
      const indexTo22 = getFocusableElement([2, 2]) as HTMLElement;

      expect(tracker.setFocusToElement(indexTo21)).toBeTruthy();
      expect(tracker.getNavigationOptions()).toEqual({
        previous: indexTo20,
        next: indexTo22,
        levelUp: undefined,
        levelDown: undefined,
      });
    });
  });
  describe('getFocusedElement() returns currently focused element.', () => {
    it('Returns also element outside of the root', () => {
      expect(tracker.getFocusedElement()).toEqual(document.body);
    });
    it('Returns focused element', () => {
      const targetElement = getFocusableElement([3, 2, 0, 1]) as HTMLElement;
      expect(tracker.setFocusToElementDataOrPath({ element: targetElement })).toBeTruthy();
      expect(tracker.getFocusedElement()).toEqual(targetElement);

      const targetElement2 = getFocusableElement([0, 1]) as HTMLElement;
      expect(tracker.setFocusToElement(targetElement2)).toBeTruthy();
      expect(tracker.getFocusedElement()).toEqual(targetElement2);
    });
  });
  describe('getFocusedElementPath() calls focusTracker.getFocusedElementPath() and returns currently focused element.', () => {
    it('Returns null if no element is focused within the root', () => {
      expect(tracker.getFocusedElementPath()).toBeNull();
      expect(getFocusTrackerSpy('getPathToCurrentFocusedElement')).toHaveBeenCalledTimes(1);
    });
    it('Returns path to focused element', () => {
      const targetElement = getFocusableElement([3, 2, 0, 1]) as HTMLElement;
      expect(tracker.setFocusToElementDataOrPath({ element: targetElement })).toBeTruthy();
      // reset the spy, because setFocusToElementDataOrPath uses it.
      const spy = getFocusTrackerSpy('getPathToCurrentFocusedElement');
      (spy as jest.SpyInstance).mockClear();

      const path = tracker.getFocusedElementPath();
      const elementData = getArrayItemAtIndex(path, -1) as ElementData;
      expect(path).toHaveLength(5);
      expect(elementData.element).toBe(targetElement);
      expect(getFocusTrackerSpy('getPathToCurrentFocusedElement')).toHaveBeenCalledTimes(1);
    });
  });
});
