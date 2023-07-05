export type FocusableElement = HTMLElement;

export type NodeOrElement = FocusableElement | Node | EventTarget;

export type NodeSelector = (parent: HTMLElement, path: ElementPath) => NodeList;
export type Selector = (parent: HTMLElement, path: ElementPath) => HTMLElement[];

export type Selectors = {
  containerElements?: Selector;
  focusableElements: Selector;
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
  getPathToFocusableByIndexes: (indexes: number[]) => ElementPath | null;
  getPathToContainerByIndexes: (indexes: number[]) => ElementPath;
  getRelatedFocusableElements: (container: ElementData) => FocusableElement[];
  getNavigationOptions: (elementOrPath: HTMLElement | ElementPath, loop: boolean) => NavigationOptions;
  dispose: () => void;
  refresh: () => void;
  getRootData: () => ElementData | null;
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
