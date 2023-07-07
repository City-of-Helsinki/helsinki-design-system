import { KeyboardTrackerProps, NodeSelector, Selectors, getArrayItemAtIndex } from '.';

export const visibleElementBounds = {
  top: 1,
  height: 1,
  left: 1,
  width: 1,
  right: 1,
  bottom: 1,
  x: 0,
  y: 0,
  toJSON: () => {
    return {};
  },
};

export const invisibleElementBounds = {
  ...visibleElementBounds,
  bottom: -1,
};

// Note ":scope" does not work with jsdom as expected
// https://github.com/jsdom/jsdom/issues/3067
// That's why "levelX" is used to limit selectors to parent's scope

// Each element has path as element text, so correct mapping can be programatically validated per element.
// For example "c0.c1.f2" equals "container#0.childContainer#1.focusable#2"
export const multiLevelDom = `
    <ul>
      <li class="level1">
        c0
        <a class="level1">c0.f0</a>
        <button class="level1">c0.f1</button>
      </li>
      <li class="level1">
        c1
        <a class="level1">c1.f0</a>
        <button class="level1">c1.f1</button>
        <ul>
          <li class="level2">
            c1.c0
            <a class="level2">c1.c0.f0</a>
          </li>
          <li class="level2">
            c1.c1
            <a class="level2">c1.c1.f0</a>
          </li>
          <li class="level2">
            c1.c2
            <span>Note: this container has no focusables. Child container is inaccessible</span>
            <ul>
              <li class="level3">
                c1.c2.c0
                <a class="level3">c1.c2.c0.f0</a>
                <a class="level3">c1.c2.c0.f1</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li class="level1">
        c2
        <a class="level1">c2.f0</a>
        <a class="level1">c2.f1</a>
        <a class="level1">c2.f2</a>
      </li>
      <li class="level1">
        c3
        <a class="level1">c3.f0</a>
        <ul>
          <li class="level2">
            c3.c0
            <a class="level2">c3.c0.f0</a>
          </li>
          <li class="level2">
            c3.c1
            <a class="level2">c3.c1.f0</a>
          </li>
          <li class="level2">
            c3.c2
            <ul>
              <li class="level3">
                c3.c2.c0
                <a class="level3">c3.c2.c0.f0</a>
                <button class="level3">c3.c2.c0.f1</button>
              </li>
              <li class="level3">
                c3.c2.c1
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  `;

// Details about each path point. How many focusables and containers it should have.
// "positionInParentElement" marks how to find the element from dom tree
// Selected elements are not always direct child elements of the container element
export const multiLevelDomPathData: Record<
  string,
  {
    focusableCount?: number;
    containerCount?: number;
    positionInParentElement?: number[];
  }
> = {
  root: {
    containerCount: 4,
  },
  c0: {
    focusableCount: 2,
  },
  c1: {
    focusableCount: 2,
    containerCount: 3,
  },
  'c1.c0': {
    focusableCount: 1,
    positionInParentElement: [2],
  },
  'c1.c1': {
    focusableCount: 1,
    positionInParentElement: [2],
  },
  'c1.c2': {
    containerCount: 1,
    positionInParentElement: [2],
  },
  'c1.c2.c0': {
    focusableCount: 2,
    positionInParentElement: [1],
  },
  c2: {
    focusableCount: 3,
  },
  c3: {
    focusableCount: 1,
    containerCount: 3,
  },
  'c3.c0': {
    focusableCount: 1,
    positionInParentElement: [1],
  },
  'c3.c1': {
    focusableCount: 1,
    positionInParentElement: [1],
  },
  'c3.c2': {
    containerCount: 2,
    positionInParentElement: [1],
  },
  'c3.c2.c0': {
    focusableCount: 2,
    positionInParentElement: [0],
  },
  'c3.c2.c1': {
    positionInParentElement: [0],
  },
};

const multiLevelDomContainerSelector: NodeSelector = (el, path) => {
  const parent = getArrayItemAtIndex(path, -1)?.element || el;
  return parent.querySelectorAll(`:scope > ul > li.level${path.length}`);
};
const multiLevelDomFocusableSelector: NodeSelector = (el, path) => {
  const className = `level${path.length - 1}`;
  return el.querySelectorAll(`:scope > a.${className}, :scope > button.${className}`);
};

export const multiLevelDomSelectors: Selectors = {
  containerElements: (el, path) => {
    return Array.from(multiLevelDomContainerSelector(el, path)) as HTMLElement[];
  },
  focusableElements: (el, path) => {
    return Array.from(multiLevelDomFocusableSelector(el, path)) as HTMLElement[];
  },
};

export const multiLevelDomSelectorsForKeyboardTracker: Partial<KeyboardTrackerProps> = {
  focusableSelector: multiLevelDomFocusableSelector,
  containerSelector: multiLevelDomContainerSelector,
};
