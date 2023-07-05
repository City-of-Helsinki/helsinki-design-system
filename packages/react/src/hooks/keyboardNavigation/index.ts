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

export type ElementMapper = {
  getPath: (element: HTMLElement) => ElementPath | null;
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
