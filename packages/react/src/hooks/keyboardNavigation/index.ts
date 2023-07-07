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
  keys: {
    next: string[];
    previous: string[];
    levelDown: string[];
    levelUp: string[];
  };
  loop: boolean;
  onChange?: (event: EventType, tracker: KeyboardTracker, path: ElementPath | null | undefined) => void;
  selectors: Selectors;
  autoFocusAfterUpdate: boolean;
  navigator?: ElementMapper['getNavigationOptions'];
};

export type KeyboardTrackerProps = Partial<Omit<KeyboardTrackerOptions, 'selectors'>> & {
  focusableSelector?: NodeSelector | string;
  containerSelector?: NodeSelector | string;
};

export type KeyboardTracker = {
  dispose: () => void;
  setFocusedElementByIndex: (index: number | number[]) => boolean;
  setFocusToElement: (element?: FocusableElement | null) => boolean;
  setFocusToElementDataOrPath: (dataOrPath?: Partial<ElementData> | ElementPath | null) => boolean;
  refresh: () => void;
  getNavigationOptions: () => NavigationOptions;
  getFocusedElement: () => Element | null;
  getFocusedElementPath: () => ElementPath | null;
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
