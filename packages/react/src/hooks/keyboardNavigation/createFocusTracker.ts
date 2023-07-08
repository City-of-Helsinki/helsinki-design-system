import { returnValidElementData } from './createElementMapper';
import {
  FocusableElement,
  NodeOrElement,
  NavigationOptions,
  ElementData,
  ElementMapper,
  ElementPath,
  getArrayItemAtIndex,
  KeyboardTrackerOptions,
} from '.';

function forceFocusToElement(element?: NodeOrElement) {
  if (!element || !(element as FocusableElement).focus) {
    return false;
  }
  if (document.activeElement === element) {
    return true;
  }
  const focusableElement = element as FocusableElement;
  focusableElement.focus();
  if (document.activeElement !== element) {
    focusableElement.setAttribute('tabindex', '-1');
    focusableElement.focus();
  }
  return document.activeElement === element;
}

export function createFocusTracker(
  elementMapper: ElementMapper,
  loop: boolean,
  externalNavigator?: KeyboardTrackerOptions['navigator'],
) {
  let pathToCurrentFocusedElement: ElementPath | null = null;
  const navigator = externalNavigator || elementMapper.getNavigationOptions;
  const storeValidPathToFocusedElement = (path?: ElementPath | null) => {
    if (!path) {
      pathToCurrentFocusedElement = null;
    } else {
      const lastItemOnPath = getArrayItemAtIndex(path, -1);
      if (!lastItemOnPath || !returnValidElementData(lastItemOnPath) || lastItemOnPath.type !== 'focusable') {
        pathToCurrentFocusedElement = null;
      } else {
        pathToCurrentFocusedElement = path;
      }
    }
    return path ? pathToCurrentFocusedElement === path : true;
  };

  const getStoredFocusedElement = (): FocusableElement | null => {
    if (!pathToCurrentFocusedElement) {
      return null;
    }
    const data = returnValidElementData(getArrayItemAtIndex(pathToCurrentFocusedElement, -1));
    return (data && data.element) || null;
  };

  const setCurrentPathToFocusedElement = (dataOrPath?: Partial<ElementData> | ElementPath | null): boolean => {
    if (!dataOrPath) {
      return storeValidPathToFocusedElement(null);
    }
    if (Array.isArray(dataOrPath)) {
      return storeValidPathToFocusedElement(dataOrPath);
    }
    return storeValidPathToFocusedElement(dataOrPath.element ? elementMapper.getPath(dataOrPath.element) : null);
  };

  const setFocusToCurrentElement = () => {
    if (!pathToCurrentFocusedElement) {
      return false;
    }
    const data = getArrayItemAtIndex(pathToCurrentFocusedElement, -1) as ElementData;
    return forceFocusToElement(data.element);
  };

  const navigateTo = (direction: keyof NavigationOptions) => {
    // Note: pathToCurrentFocusedElement is NOT updated when navigation functions are called.
    // Element focus can be set with mouse, keyboard etc, so this tracker is not the only source of truth.
    // This does not track events, so focus listeners must be added anyway, which should trigger update for the pathToCurrentFocusedElement.
    // When forceFocusToElement is called, dom listeners are triggered and pathToCurrentFocusedElement is updated.
    if (!pathToCurrentFocusedElement) {
      const root = elementMapper.getRootData();
      if (!root) {
        return false;
      }
      const element = getArrayItemAtIndex(
        elementMapper.getRelatedFocusableElements(root),
        direction === 'previous' ? -1 : 0,
      );
      return element ? forceFocusToElement(element) : false;
    }
    const directions = navigator(pathToCurrentFocusedElement, loop);
    return forceFocusToElement(directions[direction]);
  };

  return {
    reset: () => {
      pathToCurrentFocusedElement = null;
    },
    next: () => {
      return navigateTo('next');
    },
    previous: () => {
      return navigateTo('previous');
    },
    levelDown: () => {
      return navigateTo('levelDown');
    },
    levelUp: () => {
      return navigateTo('levelUp');
    },
    resetFocusToCurrent: () => {
      return setFocusToCurrentElement();
    },
    getStoredFocusedElement,
    getPathToCurrentFocusedElement: () => pathToCurrentFocusedElement,
    setFocusToElement: (element?: FocusableElement | null) => {
      setCurrentPathToFocusedElement(element ? { element } : null);
      return setFocusToCurrentElement();
    },
    storeFocusedElement: (element: FocusableElement | null) => {
      if (getStoredFocusedElement() === element) {
        return false;
      }
      return element ? setCurrentPathToFocusedElement({ element } as Partial<ElementData>) : false;
    },
    setFocusByIndexes: (indexes: number[]) => {
      const path = elementMapper.getPathToFocusableByIndexes(indexes);
      setCurrentPathToFocusedElement(path);
      return setFocusToCurrentElement();
    },
    setFocusToElementDataOrPath: (dataOrPath?: Partial<ElementData> | ElementPath | null) => {
      setCurrentPathToFocusedElement(dataOrPath);
      return setFocusToCurrentElement();
    },
    storeValidPathToFocusedElement,
    getCurrentFocusedElementData: () => {
      return getArrayItemAtIndex(pathToCurrentFocusedElement, -1);
    },
  };
}
