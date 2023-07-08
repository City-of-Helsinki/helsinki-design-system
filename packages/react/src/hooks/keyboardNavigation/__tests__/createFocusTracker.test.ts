import { ElementData, ElementMapper, NavigationOptions, getArrayItemAtIndex } from '..';
import { createElementMapper } from '../createElementMapper';
import { createFocusTracker } from '../createFocusTracker';
import { visibleElementBounds, multiLevelDom, multiLevelDomSelectors } from '../test.util';

describe('createFocusTracker', () => {
  function createDOM(childNodesAsString: string) {
    const div = document.createElement('div');
    div.innerHTML = childNodesAsString;
    document.body.appendChild(div);
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
  let rootElementData: ElementData;
  let mapper: ElementMapper;
  let tracker: ReturnType<typeof createFocusTracker>;
  const getLinkElement = () => mapper.getRelatedFocusableElements(rootElementData)[0];
  const getButtonElement = () => mapper.getRelatedFocusableElements(rootElementData)[1];

  beforeEach(() => {
    if (dom) {
      document.body.removeChild(dom);
    }
    dom = createDOM(multiLevelDom);
    mapper = createElementMapper(dom, multiLevelDomSelectors);
    tracker = createFocusTracker(mapper, false);
    mapper.refresh();
    rootElementData = mapper.getRootData() as ElementData;
  });
  describe('When created', () => {
    it('Currently focused element is null', () => {
      expect(tracker.getPathToCurrentFocusedElement()).toBeNull();
    });
  });
  describe('setFocusToElement()', () => {
    it('Sets focus to given element and stores path to it. The function returns true, if focus changed and was set successfully.', async () => {
      const target = getLinkElement();
      tracker.setFocusToElement(target);
      expect(dom.ownerDocument.activeElement).toEqual(target);

      const button = getButtonElement();
      tracker.setFocusToElement(button);
      expect(dom.ownerDocument.activeElement).toEqual(button);
    });
    it('Function returns true, if given element is focused.', async () => {
      const target = getLinkElement();
      expect(tracker.setFocusToElement(target)).toBeTruthy();
      expect(tracker.setFocusToElement(target)).toBeTruthy();
      const button = getButtonElement();
      expect(tracker.setFocusToElement(button)).toBeTruthy();
      expect(tracker.setFocusToElement(target)).toBeTruthy();
    });
    it('If target element is not natively focusable, tabindex-attribute is set to make it focusable', async () => {
      const link = getLinkElement();
      expect(link.getAttribute('tabindex')).toBeNull();
      tracker.setFocusToElement(link);
      expect(link.getAttribute('tabindex')).toBe('-1');

      const button = getButtonElement();
      expect(button.getAttribute('tabindex')).toBeNull();
      tracker.setFocusToElement(button);
      expect(button.getAttribute('tabindex')).toBeNull();
    });
  });
  describe('getPathToCurrentFocusedElement()', () => {
    it('Returns path to the the stored focused element or null. It does not check is the element actually focused. ', async () => {
      expect(tracker.getPathToCurrentFocusedElement()).toBeNull();
      const target = getLinkElement();
      tracker.setFocusToElement(target);
      const path = tracker.getPathToCurrentFocusedElement();
      expect(path).toHaveLength(3);
      expect(path).toEqual(mapper.getPath(target));

      const button = getButtonElement();
      tracker.setFocusToElement(button);
      expect(tracker.getPathToCurrentFocusedElement()).toEqual(mapper.getPath(button));
    });
  });
  describe('getStoredFocusedElement()', () => {
    it('Returns element stored as ', async () => {
      const target = getLinkElement();
      tracker.setFocusToElement(target);
      expect(tracker.getStoredFocusedElement()).toBe(target);

      const button = getButtonElement();
      tracker.setFocusToElement(button);
      expect(tracker.getStoredFocusedElement()).toBe(button);
    });
  });
  describe('storeFocusedElement()', () => {
    it('Stores path to the given element.  getStoredFocusedElement() returns the path. Focus is not moved.', async () => {
      const { activeElement } = dom.ownerDocument;
      const target = getLinkElement();
      expect(target).not.toBe(activeElement);
      expect(tracker.getStoredFocusedElement()).toBeNull();
      tracker.storeFocusedElement(target);
      expect(tracker.getStoredFocusedElement()).toBe(target);
      expect(dom.ownerDocument.activeElement).toEqual(activeElement);
    });
  });
  describe('resetFocusToCurrent()', () => {
    it('Moves actual focus to currently stored focused element and returns true, if element is focused.', async () => {
      expect(tracker.resetFocusToCurrent()).toBeFalsy();
      const target = getLinkElement();
      tracker.setFocusToElement(target);
      expect(tracker.resetFocusToCurrent()).toBeTruthy();
      expect(dom.ownerDocument.activeElement).toEqual(target);

      const button = getButtonElement();
      button.focus();
      expect(dom.ownerDocument.activeElement).toEqual(button);
      expect(tracker.resetFocusToCurrent()).toBeTruthy();
      expect(dom.ownerDocument.activeElement).toEqual(target);
    });
  });
  describe('reset()', () => {
    it('removes stored focused element data, but does not move focus', async () => {
      const target = getLinkElement();
      tracker.setFocusToElement(target);
      tracker.reset();

      expect(tracker.getPathToCurrentFocusedElement()).toBeNull();
      expect(dom.ownerDocument.activeElement).toEqual(target);
      expect(tracker.resetFocusToCurrent()).toBeFalsy();
    });
  });
  describe('navigation functions "next", "previous", "levelUp", "levelDown" move focus, but DO NOT store the focused element\'s path.', () => {
    const navigateTo = (direction: keyof NavigationOptions) => {
      const focusables = mapper.getRelatedFocusableElements(rootElementData);
      const firstElement = getArrayItemAtIndex(focusables, 0);
      const lastElement = getArrayItemAtIndex(focusables, -1);
      const assumedFocusedElement = direction === 'previous' ? lastElement : firstElement;
      expect(tracker[direction]()).toBeTruthy();
      expect(dom.ownerDocument.activeElement).toEqual(assumedFocusedElement);
      expect(tracker.getStoredFocusedElement()).toBeNull();
      // manually storing the focused element to make sure it is focused
      tracker.storeFocusedElement(assumedFocusedElement as HTMLElement);
      expect(tracker.getStoredFocusedElement()).toBe(assumedFocusedElement);
      return true;
    };
    it('If there is no stored focused element and "next" is called, focus is set to first possible focusable.', async () => {
      expect(navigateTo('next')).toBeTruthy();
    });
    it('If there is no stored focused element and "levelUp" is called, focus is set to first possible focusable.', async () => {
      expect(navigateTo('levelUp')).toBeTruthy();
    });
    it('If there is no stored focused element and "levelDown" is called, focus is set to first possible focusable.', async () => {
      expect(navigateTo('levelDown')).toBeTruthy();
    });
    it('If there is no stored focused element and "previous" is called, focus is set to last possible focusable in root\'s child containers', async () => {
      expect(navigateTo('previous')).toBeTruthy();
    });
    it(`"next" moves focus to the next focusable element from currently focused element data
        "previous" moves focus to the previous focusable element from currently focused element data
    `, async () => {
      const focusables = mapper.getRelatedFocusableElements(rootElementData);
      tracker.setFocusToElement(focusables[0]);
      expect(dom.ownerDocument.activeElement).toEqual(focusables[0]);

      tracker.next();
      expect(dom.ownerDocument.activeElement).toEqual(focusables[1]);
      // if pathToCurrentFocusedElement is not updated, next call to "next", would not move focus.
      tracker.storeFocusedElement(focusables[1]);

      tracker.next();
      expect(dom.ownerDocument.activeElement).toEqual(focusables[2]);
      tracker.storeFocusedElement(focusables[2]);

      tracker.previous();
      expect(dom.ownerDocument.activeElement).toEqual(focusables[1]);
      // if pathToCurrentFocusedElement is not updated, next call to "previous", would not move focus.
      tracker.storeFocusedElement(focusables[1]);

      tracker.previous();
      expect(dom.ownerDocument.activeElement).toEqual(focusables[0]);
    });
    it(`"levelDown" moves focus to child container's first focusable
        "levelUp" moves focus to the parent container's last focusable
    `, async () => {
      const rootContainer = mapper.getPathToContainerByIndexes([0]);
      const rootFocusables = mapper.getRelatedFocusableElements(getArrayItemAtIndex(rootContainer, -1) as ElementData);
      const level2Container = mapper.getPathToContainerByIndexes([0, 1]);
      const level2Focusables = mapper.getRelatedFocusableElements(
        getArrayItemAtIndex(level2Container, -1) as ElementData,
      );
      tracker.setFocusToElement(rootFocusables[2]);
      expect(dom.ownerDocument.activeElement).toEqual(rootFocusables[2]);

      tracker.levelDown();
      expect(dom.ownerDocument.activeElement).toEqual(level2Focusables[0]);
      // if pathToCurrentFocusedElement is not updated, next call to "levelUp", would not move focus.
      tracker.storeFocusedElement(level2Focusables[0]);

      tracker.levelUp();
      expect(dom.ownerDocument.activeElement).toEqual(rootFocusables[3]);
    });
  });
  describe('setFocusByIndexes(). Sets focus to given focusable by array of indexes. All indexes except last must point to containers', () => {
    it('Returns true, if focus was set', async () => {
      const target = getLinkElement();
      expect(tracker.setFocusByIndexes([0, 0, 0])).toBeTruthy();
      expect(dom.ownerDocument.activeElement).toEqual(target);
      expect(tracker.getStoredFocusedElement()).toBe(target);

      const button = getButtonElement();
      tracker.setFocusByIndexes([0, 0, 1]);
      expect(dom.ownerDocument.activeElement).toEqual(button);
      expect(tracker.getStoredFocusedElement()).toBe(button);

      const level2Indexes = [0, 1, 0, 0];
      const level2Path = mapper.getPathToFocusableByIndexes(level2Indexes);
      const level2Element = getArrayItemAtIndex(level2Path, -1)?.element;
      expect(tracker.setFocusByIndexes(level2Indexes)).toBeTruthy();
      expect(dom.ownerDocument.activeElement).toEqual(level2Element);
      expect(tracker.getStoredFocusedElement()).toBe(level2Element);
    });
    it('Returns false, if focus was not set', async () => {
      expect(tracker.setFocusByIndexes([])).toBeFalsy();
      expect(tracker.setFocusByIndexes([0, 0])).toBeFalsy();
      expect(tracker.setFocusByIndexes([0, 1, 0, 1])).toBeFalsy();
    });
  });
  describe('setFocusToElementDataOrPath(). Sets focus according to the given ElementPath or partial ElementData', () => {
    it('Returns true, if focus was set', async () => {
      const linkElement = getLinkElement();
      const linkPath = mapper.getPath(linkElement);
      const linkElementData = { element: linkElement };

      const level2Path = mapper.getPathToFocusableByIndexes([0, 1, 0, 0]);
      const level2Element = getArrayItemAtIndex(level2Path, -1)?.element;
      const level2ElementData = { element: level2Element };

      expect(tracker.setFocusToElementDataOrPath(linkPath)).toBeTruthy();
      expect(dom.ownerDocument.activeElement).toEqual(linkElement);
      expect(tracker.getStoredFocusedElement()).toBe(linkElement);

      expect(tracker.setFocusToElementDataOrPath(level2Path)).toBeTruthy();
      expect(dom.ownerDocument.activeElement).toEqual(level2Element);
      expect(tracker.getStoredFocusedElement()).toBe(level2Element);

      expect(tracker.setFocusToElementDataOrPath(linkElementData)).toBeTruthy();
      expect(dom.ownerDocument.activeElement).toEqual(linkElement);
      expect(tracker.getStoredFocusedElement()).toBe(linkElement);

      expect(tracker.setFocusToElementDataOrPath(level2ElementData)).toBeTruthy();
      expect(dom.ownerDocument.activeElement).toEqual(level2Element);
      expect(tracker.getStoredFocusedElement()).toBe(level2Element);
    });
    it('Returns false, if focus was not set', async () => {
      expect(tracker.setFocusToElementDataOrPath([])).toBeFalsy();
      expect(tracker.setFocusToElementDataOrPath({ element: dom as HTMLElement })).toBeFalsy();
      expect(tracker.setFocusToElementDataOrPath([rootElementData])).toBeFalsy();
    });
  });
  describe('externalNavigator can be passed as a prop', () => {
    const externalNavigatorListener = jest.fn();
    const navigationOptions: NavigationOptions = {};
    const externalNavigator: ElementMapper['getNavigationOptions'] = (elementOrPath, loop) => {
      externalNavigatorListener(elementOrPath, loop);
      return navigationOptions;
    };
    const loop = true;
    beforeEach(() => {
      tracker.reset();
      tracker = createFocusTracker(mapper, loop, externalNavigator);
    });
    it('Given navigator replaces elementMapper navigator', async () => {
      const linkElement = getLinkElement();
      const linkPath = mapper.getPath(linkElement);

      const level2Path = mapper.getPathToFocusableByIndexes([0, 1, 0, 0]);
      const level2Element = getArrayItemAtIndex(level2Path, -1)?.element;

      expect(tracker.setFocusToElement(linkElement)).toBeTruthy();
      navigationOptions.next = level2Element;
      tracker.next();
      expect(externalNavigatorListener).toHaveBeenCalledTimes(1);
      expect(externalNavigatorListener).toHaveBeenLastCalledWith(linkPath, loop);
      expect(document.activeElement).toBe(level2Element);
      // navigation functions do not change focused element data
      // so set it manually:
      tracker.setFocusToElement(level2Element);

      navigationOptions.levelDown = linkElement;
      tracker.levelDown();
      expect(externalNavigatorListener).toHaveBeenCalledTimes(2);
      expect(externalNavigatorListener).toHaveBeenLastCalledWith(level2Path, loop);
      expect(document.activeElement).toBe(linkElement);
    });
  });
});
