import {
  ElementData,
  ElementMapper,
  ElementPath,
  Selectors,
  getArrayItemAtIndex,
  getLastElementDataFromPath,
} from '..';
import { createElementMapper } from '../createElementMapper';

describe('createElementMapper', () => {
  function createDOM(childNodesAsString: string) {
    const div = document.createElement('div');
    div.innerHTML = childNodesAsString;
    return div;
  }

  const visibleElementBounds = {
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
  const invisibleElementBounds = {
    ...visibleElementBounds,
    bottom: -1,
  };

  let currentElementIndex = -1;
  let invisibleElementIndexes: number[] = [];
  beforeAll(() => {
    // jsdom has no getBoundingClientRect support
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => {
      currentElementIndex += 1;
      return invisibleElementIndexes.includes(currentElementIndex) ? invisibleElementBounds : visibleElementBounds;
    });
  });

  afterEach(() => {
    currentElementIndex = -1;
    invisibleElementIndexes = [];
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const verifyElementData = (
    data: ElementData,
    parentElement: Element,
    {
      index,
      type,
      focusableCount = 0,
      containerCount = 0,
    }: {
      index: ElementData['index'];
      type: ElementData['type'];
      containerCount?: number;
      focusableCount?: number;
    },
  ) => {
    expect(data.type).toBe(type);
    expect(data.index).toBe(index);
    expect(data.element).toBe(parentElement.children[index]);
    if (!focusableCount) {
      expect(data.focusableElements).toBeUndefined();
    } else {
      expect(data.focusableElements).toHaveLength(focusableCount);
    }
    if (!containerCount) {
      expect(data.containerElements).toBeUndefined();
    } else {
      expect(data.containerElements).toHaveLength(containerCount);
    }
  };

  const singleLevelDom = `
    <ol>
      <li>list1 item 1</li>
      <li>list1 item 2</li>
      <span>Untracked element</span>
    </ol>
  `;
  const singleLevelDomSelectors: Selectors = {
    focusableElements: (el) => {
      return Array.from(el.querySelectorAll('ol li'));
    },
  };

  const createSingleItem = (index: number) => `<div>Item ${index}</div>`;
  const createMultipleSingleItems = (count: number) => {
    // new Array(count).map does not work because empty items are not mapped
    return String('a')
      .repeat(count)
      .split('')
      .map((letter, index) => createSingleItem(index))
      .join('');
  };
  const singleItemsSelectors: Selectors = {
    focusableElements: (el) => {
      return Array.from(el.querySelectorAll('div'));
    },
  };

  // Note ":scope" does not work with jsdom as expected
  // https://github.com/jsdom/jsdom/issues/3067
  // That's why "levelX" is used to limit selectors to parent's scope

  // Each element has path as element text, so correct mapping can be programatically validated per element.
  // For example "c0.c1.f2" equals "container#0.childContainer#1.focusable#2"
  const multiLevelDom = `
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
  const multiLevelDomPathData: Record<
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
      positionInParentElement: [0],
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

  const multiLevelDomSelectors: Selectors = {
    containerElements: (el, path) => {
      const parent = getArrayItemAtIndex(path, -1)?.element || el;
      return Array.from(parent.querySelectorAll(`:scope > ul > li.level${path.length}`));
    },
    focusableElements: (el, path) => {
      return Array.from(el.querySelectorAll(`:scope > *.level${path.length - 1}`));
    },
  };

  const getPathFromElementContent = (element?: HTMLElement) =>
    element ? element.innerHTML.split('<')[0].replace(/[^.\w]/gi, '') : '';

  const removeNonDigitsAndConvertToNumber = (str: string) => {
    return parseInt(str.replace(/[^\d]/gi, ''), 10);
  };

  const getElementDataByPathId = (mapper: ElementMapper, elementPathId: string): ElementPath => {
    if (elementPathId === 'root') {
      const root = mapper.getRootData();
      return root ? [root] : [];
    }
    const targetIsFocusable = elementPathId.includes('.f');
    const indexes = elementPathId.split('.').map((d) => removeNonDigitsAndConvertToNumber(d));
    const getter = targetIsFocusable ? mapper.getPathToFocusableByIndexes : mapper.getPathToContainerByIndexes;
    return getter([0, ...indexes]) as ElementPath;
  };

  describe('When mapper is created', () => {
    it('Nothing is mapped automatically', () => {
      const dom = createDOM(singleLevelDom);
      const mapper = createElementMapper(dom, singleLevelDomSelectors);
      expect(mapper.getRootData()).toBeNull();
    });
    it('Mapping is initiated with refresh() - which can be called multiple times', () => {
      const dom = createDOM(singleLevelDom);
      const mapper = createElementMapper(dom, singleLevelDomSelectors);

      mapper.refresh();
      const root = mapper.getRootData() as ElementData;
      expect(root.type).toBe('root');
      expect(root.element).toBe(dom);
      expect(root.index).toBe(0);

      mapper.refresh();
      const root2 = mapper.getRootData() as ElementData;
      expect(root2.type).toBe('root');
      expect(root2.element).toBe(dom);
      expect(root2.index).toBe(0);
      expect(root2 === root).toBeFalsy();
    });
  });

  describe('All visible elements returned by the selectors are mapped', () => {
    it('Focusable elements are mapped to parent container, which is root in this test', () => {
      const dom = createDOM(singleLevelDom);
      const mapper = createElementMapper(dom, singleLevelDomSelectors);
      expect(mapper.getRootData()).toBeNull();
      mapper.refresh();
      const root = mapper.getRootData() as ElementData;
      expect(root.focusableElements).toHaveLength(2);
      expect(root.containerElements).toBeUndefined();
      const focusables = root.focusableElements as ElementData[];
      const parent = dom.children[0];
      focusables.forEach((data, index) => {
        verifyElementData(data, parent, { index, type: 'focusable' });
      });
    });
    it('All containers and their focusables and child containers are mapped.', () => {
      const dom = createDOM(multiLevelDom);
      const mapper = createElementMapper(dom, multiLevelDomSelectors);
      mapper.refresh();
      const root = mapper.getRootData() as ElementData;
      expect(root.containerElements).toHaveLength(4);
      expect(root.focusableElements).toBeUndefined();

      const checkData = (ancestors: ElementData[], elementData: ElementData) => {
        const ancestor = getArrayItemAtIndex(ancestors, -1);
        const element = elementData.element as HTMLElement;
        // get the c0.c1.f1... from element's text content
        const elementPath = getPathFromElementContent(element);
        // get index from the elementId
        const index = removeNonDigitsAndConvertToNumber(String(getArrayItemAtIndex(elementPath.split('.'), -1)));

        // get the c0.c1.f1... from element data
        const elementPathFromAncestors = [...ancestors, elementData]
          .map((e) => `c${e.index}`)
          // remove root element from paths
          .slice(1)
          .join('.');
        expect(elementPath).toBe(elementPathFromAncestors);
        // get the expected data for the container
        const elementDataForPath = multiLevelDomPathData[elementPath];
        expect(elementDataForPath).not.toBeUndefined();

        const getParentElement = () => {
          if (ancestor?.type === 'root') {
            return dom.children[0];
          }
          if (elementDataForPath.positionInParentElement) {
            return elementDataForPath.positionInParentElement.reduce((el, positionIndex) => {
              if (!el) {
                return undefined;
              }
              return el.children[positionIndex];
            }, ancestor?.element as Element | undefined);
          }
          return ancestor?.element;
        };

        const parentElement = getParentElement() as HTMLElement;
        expect(parentElement).not.toBeUndefined();

        verifyElementData(elementData, parentElement, {
          index,
          type: 'container',
          focusableCount: elementDataForPath.focusableCount,
          containerCount: elementDataForPath.containerCount,
        });

        const { focusableElements, containerElements } = elementData;

        if (focusableElements) {
          focusableElements.forEach((data, focusableIndex) => {
            verifyElementData(data, elementData.element as HTMLElement, {
              index: focusableIndex,
              type: 'focusable',
            });
          });
        }
        if (containerElements) {
          containerElements.forEach((data) => {
            checkData([...ancestors, elementData], data);
          });
        }
      };

      const containers = root.containerElements as ElementData[];
      containers.forEach((data) => {
        checkData([root], data);
      });
    });
    it('Elements not visible on the screen are not mapped.', () => {
      invisibleElementIndexes = [0, 2];
      const dom = createDOM(createMultipleSingleItems(4));
      const mapper = createElementMapper(dom, singleItemsSelectors);
      mapper.refresh();
      const root = mapper.getRootData() as ElementData;
      const focusables = root.focusableElements as ElementData[];
      expect(focusables.length).toBe(2);
      expect(focusables[0].element === dom.children[1]).toBeTruthy();
      expect(focusables[1].element === dom.children[3]).toBeTruthy();
    });
  });
  describe('refresh() remaps elements', () => {
    const getFocusablesCount = (mapper: ElementMapper) => {
      mapper.refresh();
      const root = mapper.getRootData() as ElementData;
      const focusables = root.focusableElements as ElementData[];
      return focusables.length;
    };
    it('Used when visibility changes', () => {
      invisibleElementIndexes = [0, 2];
      const dom = createDOM(createMultipleSingleItems(4));
      const mapper = createElementMapper(dom, singleItemsSelectors);
      expect(getFocusablesCount(mapper)).toBe(2);
      invisibleElementIndexes = [];
      expect(getFocusablesCount(mapper)).toBe(4);
    });
    it('Used when dom changes', () => {
      const dom = createDOM(createMultipleSingleItems(1));
      const mapper = createElementMapper(dom, singleItemsSelectors);
      expect(getFocusablesCount(mapper)).toBe(1);
      dom.innerHTML = createMultipleSingleItems(3);
      expect(getFocusablesCount(mapper)).toBe(3);
    });
  });
  describe('dispose()', () => {
    it('Removes object references and arrays', () => {
      const dom = createDOM(`
          <div><a>0</a><a>1</a></div>
          <div><a>2</a><a>3</a></div>
      `);
      const mapper = createElementMapper(dom, {
        containerElements: (el) => {
          return Array.from(el.querySelectorAll('div'));
        },
        focusableElements: (el) => {
          return Array.from(el.querySelectorAll(':scope > a'));
        },
      });
      mapper.refresh();
      const root = mapper.getRootData() as ElementData;
      const containers = root.containerElements as ElementData[];
      expect(containers).toHaveLength(2);
      expect(containers[0].focusableElements).toHaveLength(2);
      expect(containers[1].focusableElements).toHaveLength(2);
      const allData = [
        root,
        ...containers,
        ...(containers[0].focusableElements as ElementData[]),
        ...(containers[1].focusableElements as ElementData[]),
      ];
      mapper.dispose();
      allData.forEach((data) => {
        expect(data.element).toBeUndefined();
        expect(data.index).not.toBeUndefined();
        expect(data.type).not.toBeUndefined();
        expect(data.focusableElements).toBeUndefined();
        expect(data.containerElements).toBeUndefined();
      });
    });
  });
  describe('getPath() returns an array of elementData objects', () => {
    it('Returned array has elementData from root to the element', () => {
      const dom = createDOM(multiLevelDom);
      const mapper = createElementMapper(dom, multiLevelDomSelectors);
      mapper.refresh();
      const root = mapper.getRootData() as ElementData;

      const checkPaths = (parentPath: ElementPath, elementData: ElementData) => {
        const currentPath = [...parentPath, elementData];
        const element = elementData.element as HTMLElement;
        const path = mapper.getPath(element);
        expect(path).toMatchObject(currentPath);
        expect(getArrayItemAtIndex(path, -1)?.element).toMatchObject(element);
        const { focusableElements, containerElements } = elementData;
        if (focusableElements) {
          focusableElements.forEach((focusableData) => {
            const focusablePath = mapper.getPath(focusableData.element as HTMLElement) as ElementPath;
            expect(focusablePath.length).toBe(currentPath.length + 1);
            expect(focusablePath).toMatchObject([...currentPath, focusableData]);
          });
        }
        if (containerElements) {
          containerElements.forEach((containerData) => {
            checkPaths(currentPath, containerData);
          });
        }
      };
      const containers = root.containerElements as ElementData[];
      containers.forEach((data) => {
        checkPaths([root], data);
      });
    });
  });
  describe('getRelatedFocusableElements() returns focusable html elements', () => {
    let dom: HTMLDivElement;
    let mapper: ElementMapper;
    beforeEach(() => {
      dom = createDOM(multiLevelDom);
      mapper = createElementMapper(dom, multiLevelDomSelectors);
      mapper.refresh();
    });
    const getContainerData = (elementPathId: string) =>
      getLastElementDataFromPath(getElementDataByPathId(mapper, elementPathId)) as ElementData;

    it('Returned focusables are first picked from its immediate child containers or and then its own focusableElements ', () => {
      const c0Focusables = mapper.getRelatedFocusableElements(getContainerData('c0'));
      expect(c0Focusables).toHaveLength(multiLevelDomPathData.c0.focusableCount as number);

      // c1 has own focusables and childContainers, but their lengths match
      const c1 = getContainerData('c1');
      const c1Focusables = mapper.getRelatedFocusableElements(c1);
      expect(c1.focusableElements).toHaveLength(multiLevelDomPathData.c1.focusableCount as number);
      expect(c1Focusables).toHaveLength(2);
      expect(c1.focusableElements?.map((d) => d.element)).not.toEqual(c1Focusables);

      // c2 has only own focusables
      const c2 = getContainerData('c2');
      const c2Focusables = mapper.getRelatedFocusableElements(c2);
      expect(c2Focusables).toHaveLength(multiLevelDomPathData.c2.focusableCount as number);
      expect(c2.focusableElements).toHaveLength(multiLevelDomPathData.c2.focusableCount as number);
      expect(c2.focusableElements?.map((d) => d.element)).toEqual(c2Focusables);

      // c3 has own focusables and childContainers
      const c3 = getContainerData('c3');
      const c3Focusables = mapper.getRelatedFocusableElements(c3);
      expect(c3.focusableElements).toHaveLength(1);
      expect(c1Focusables).toHaveLength(2);
      expect(c3.focusableElements?.map((d) => d.element)).not.toEqual(c3Focusables);

      const rootFocusables = mapper.getRelatedFocusableElements(getContainerData('root'));
      // focusables are picked from root's containerElements
      expect(rootFocusables).toHaveLength(
        Number(multiLevelDomPathData.c0.focusableCount) +
          Number(multiLevelDomPathData.c1.focusableCount) +
          Number(multiLevelDomPathData.c2.focusableCount) +
          Number(multiLevelDomPathData.c3.focusableCount),
      );
    });
    it('Returns an empty array is element has no focusables', () => {
      expect(mapper.getRelatedFocusableElements(getContainerData('c3.c2.c1'))).toHaveLength(0);
      expect(mapper.getRelatedFocusableElements(getContainerData('c0.f1'))).toHaveLength(0);
      expect(mapper.getRelatedFocusableElements({} as ElementData)).toHaveLength(0);
    });
  });
  describe('getPathToContainerByIndexes() and getPathToFocusableByIndexes() return ElementPath defined by array of indexes', () => {
    const verifyElementByIndexes = (mapper: ElementMapper, elementPathId: string) => {
      if (elementPathId === 'root') {
        const root = mapper.getRootData();
        const indexPath = mapper.getPathToContainerByIndexes([0]);
        expect(indexPath).toEqual([root]);
        return root;
      }
      const indexPath = getElementDataByPathId(mapper, elementPathId);
      const data = getLastElementDataFromPath(indexPath) as ElementData;
      const elementPath = mapper.getPath(data.element as HTMLElement);
      expect(indexPath).toHaveLength(elementPathId.split('.').length + 1);
      expect(indexPath).toEqual(elementPath);
      expect(getPathFromElementContent(data.element)).toBe(elementPathId);
      return data;
    };

    it('The getPathToContainerByIndexes argument is an array of indexes which picks child containers by index.', () => {
      const dom = createDOM(multiLevelDom);
      const mapper = createElementMapper(dom, multiLevelDomSelectors);
      mapper.refresh();
      Object.keys(multiLevelDomPathData).forEach((key) => {
        expect(verifyElementByIndexes(mapper, key)).not.toBeNull();
      });
    });
    it('The getPathToFocusableByIndexes argument is an array of indexes which picks focusables by index.', () => {
      const dom = createDOM(multiLevelDom);
      const mapper = createElementMapper(dom, multiLevelDomSelectors);
      mapper.refresh();

      Object.keys(multiLevelDomPathData).forEach((key) => {
        const container = verifyElementByIndexes(mapper, key);
        if (container && container.focusableElements) {
          container.focusableElements.forEach((data) => {
            const focusable = verifyElementByIndexes(mapper, `${key}.f${data.index}`);
            expect(focusable).not.toBeNull();
          });
        }
      });
    });
  });
});
