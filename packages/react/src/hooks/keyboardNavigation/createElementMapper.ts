import { NodeOrElement, ElementData, ElementPath, Selectors, ElementMapper, getArrayItemAtIndex } from './index';

function isElementVisibleOnScreen(element?: NodeOrElement) {
  if (!element || !(element as HTMLElement).getBoundingClientRect) {
    return false;
  }
  const rect = (element as HTMLElement).getBoundingClientRect();
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.right > 0 &&
    rect.bottom > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight)
  );
}

const untrackedElementData: ElementData = {
  type: 'untracked',
  index: -1,
  element: undefined,
};

function addMappedElements(path: ElementPath, selectors: Selectors) {
  const targetData = getArrayItemAtIndex(path, -1);
  const element = targetData && targetData.element;
  if (!element) {
    return;
  }
  const containers =
    selectors.containerElements && selectors.containerElements(element, path).filter(isElementVisibleOnScreen);
  if (containers && containers.length) {
    const childContainers: ElementData[] = containers.map((container, elementIndex) => {
      return {
        element: container,
        type: 'container',
        index: elementIndex,
      };
    });
    if (childContainers.length) {
      targetData.containerElements = childContainers;
      childContainers.forEach((data) => {
        addMappedElements([...path, data], selectors);
      });
    }
  }

  const focusableElements = selectors.focusableElements(element, path).filter(isElementVisibleOnScreen);
  const focusable: ElementData[] = focusableElements.map((focusableElement, elementIndex) => {
    return {
      element: focusableElement,
      index: elementIndex,
      type: 'focusable',
    };
  });
  if (focusable.length) {
    targetData.focusableElements = focusable;
  }
}

function mapAllElements(root: HTMLElement, selectors: Selectors) {
  const rootData: ElementData = {
    type: 'root',
    element: root,
    index: 0,
  };
  addMappedElements([rootData], selectors);
  return rootData;
}

function disposeData(elementData: ElementData | null) {
  /* eslint-disable no-param-reassign */
  if (!elementData) {
    return;
  }
  elementData.element = undefined;
  if (elementData.containerElements) {
    elementData.containerElements.forEach(disposeData);
    elementData.containerElements = undefined;
  }
  if (elementData.focusableElements) {
    elementData.focusableElements.forEach(disposeData);
    elementData.focusableElements = undefined;
  }
  /* eslint-enable no-param-reassign */
}

export function returnValidElementData(data?: ElementData | null) {
  return data && data.index > -1 && !!data.element ? data : null;
}

export function isValidPath(elementPath: ElementPath): boolean {
  return !!returnValidElementData(getArrayItemAtIndex(elementPath, -1));
}

function isChild(parent: HTMLElement, assumedChildren: Array<NodeOrElement | null | undefined>) {
  return assumedChildren.some((child) => {
    return child && parent.contains(child as Node);
  });
}

function findElementPath(searchPath: ElementPath, target: HTMLElement): ElementPath {
  const startPoint = getArrayItemAtIndex(searchPath, -1);
  if (!startPoint || !startPoint.element || !isChild(startPoint.element, [target])) {
    return [{ ...untrackedElementData }];
  }
  const predicate = (data: ElementData) => data.element === target;
  if (startPoint.focusableElements) {
    const hit = startPoint.focusableElements.find(predicate);
    if (hit) {
      return [...searchPath, hit];
    }
  }
  if (startPoint.containerElements) {
    const hit = startPoint.containerElements.find(predicate);
    if (hit) {
      return [...searchPath, hit];
    }
    let foundPath: ElementPath | null = null;
    startPoint.containerElements.some((data) => {
      const results = findElementPath([...searchPath, data], target);
      const endResult = getArrayItemAtIndex(results, -1);
      if (endResult && endResult.element === target) {
        foundPath = results;
        return true;
      }
      return false;
    });
    return foundPath || [{ ...untrackedElementData }];
  }
  return [{ ...untrackedElementData }];
}

export function createElementMapper(root: HTMLElement, selectors: Selectors): ElementMapper {
  let rootData: ElementData | null = null;

  const getPath = (element: HTMLElement) => {
    if (!rootData) {
      return null;
    }
    const path = findElementPath([rootData], element);
    const data = getArrayItemAtIndex(path, -1);
    if (!data || data.index === -1) {
      return null;
    }
    return path;
  };

  return {
    getPath,
    dispose: () => {
      disposeData(rootData);
    },
    refresh: () => {
      disposeData(rootData);
      rootData = mapAllElements(root, selectors);
    },
    getRootData: () => rootData,
  };
}
