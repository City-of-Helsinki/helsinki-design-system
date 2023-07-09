export type FocusableElement = HTMLElement;

export type NodeOrElement = FocusableElement | Node | EventTarget;

export type EventType =
  | 'next'
  | 'previous'
  | 'focusIn'
  | 'focusOut'
  | 'focusChange'
  | 'dataUpdated'
  | 'levelDown'
  | 'levelUp';

export type NodeSelector = (parent: HTMLElement, path: ElementPath) => NodeList;
export type Selector = (parent: HTMLElement, path: ElementPath) => HTMLElement[];

export type Selectors = {
  containerElements?: Selector;
  focusableElements: Selector;
};

export type KeyboardTrackerOptions = {
  /**
   * List of keys for navigation
   * Four directions (next, previous, levelDown, levelUp) with array of KeyboardEvent keys
   * which trigger each direction
   */
  keys: {
    next: string[];
    previous: string[];
    levelDown: string[];
    levelUp: string[];
  };
  /**
   * If true, the navigation will loop from end to start and vice versa
   */
  loop: boolean;
  /**
   * Callback for focus changes.
   * @param event
   * @param tracker
   * @param path
   * @returns
   */
  onChange?: (event: EventType, tracker: KeyboardTracker, path: ElementPath | null | undefined) => void;
  /**
   * Selectors for focusables and containers
   */
  selectors: Selectors;
  /**
   * If true, current focused element is re-focused after refresh() is called
   *
   */
  autoFocusAfterUpdate: boolean;
  /**
   * Navigator which will be used everytime keyboard navigation is triggered.
   */
  navigator?: ElementMapper['getNavigationOptions'];
};

export type KeyboardTrackerProps = Partial<Omit<KeyboardTrackerOptions, 'selectors'>> & {
  /**
   * Selector for elements that should be focusable
   */
  focusableSelector?: NodeSelector | string;
  /**
   *  Selector for elements that contain focusable elements
   */
  containerSelector?: NodeSelector | string;
};

export type KeyboardTracker = {
  /**
   * Remove all data and references
   */
  dispose: () => void;
  /**
   * Sets focused element by given index array or number. Negative numbers are accepted.
   * @param index
   * @returns
   */
  setFocusedElementByIndex: (index: number | number[]) => boolean;
  /**
   * Sets focus to given element
   * @param element
   * @returns
   */
  setFocusToElement: (element?: FocusableElement | null) => boolean;
  /**
   * Sets focus to element found with ElementData or ElementPath
   * @param dataOrPath
   * @returns
   */
  setFocusToElementDataOrPath: (dataOrPath?: Partial<ElementData> | ElementPath | null) => boolean;
  /**
   * Remaps focusable elements and containers. Use when dom changes.
   * @returns
   */
  refresh: () => void;
  /**
   * Returns navigation options from currently focused element
   * @returns
   */
  getNavigationOptions: () => NavigationOptions;
  /**
   * Returns currently focused element
   * @returns
   */
  getFocusedElement: () => Element | null;
  /**
   * Returns ElementPath to currently focused element
   * @returns
   */
  getFocusedElementPath: () => ElementPath | null;
  /**
   * Sets new keys to track
   * @param newKeys
   * @returns
   */
  setKeys: (newKeys: Partial<KeyboardTrackerOptions['keys']>) => KeyboardTrackerOptions['keys'];
};

export type ElementData = {
  type: 'untracked' | 'root' | 'container' | 'focusable';
  index: number;
  element?: HTMLElement;
  containerElements?: ElementData[];
  focusableElements?: ElementData[];
};

export type ElementPath = ElementData[];

export type NavigationOptions = {
  next?: FocusableElement;
  previous?: FocusableElement;
  levelUp?: FocusableElement;
  levelDown?: FocusableElement;
};

export type ElementMapper = {
  getPath: (element: HTMLElement) => ElementPath | null;
  getNavigationOptions: (elementOrPath: HTMLElement | ElementPath, loop: boolean) => NavigationOptions;
  getPathToFocusableByIndexes: (indexes: number[]) => ElementPath | null;
  getPathToContainerByIndexes: (indexes: number[]) => ElementPath;
  getRelatedFocusableElements: (container: ElementData) => FocusableElement[];
  dispose: () => void;
  refresh: () => void;
  getRootData: () => ElementData | null;
  isTrackedElement: (el: NodeOrElement | null) => boolean;
};

export function getArrayItemAtIndex<T = unknown>(array: T[] | null | undefined, index: number): T | undefined {
  if (!array || !array.length) {
    return undefined;
  }
  const targetIndex = index < 0 ? array.length + index : index;
  return array[targetIndex];
}

export function getElementDataFromPath(path: ElementPath | undefined | null, index: number) {
  return getArrayItemAtIndex(path, index);
}

export function getLastElementDataFromPath(path: ElementPath | undefined | null) {
  return getElementDataFromPath(path, -1);
}
