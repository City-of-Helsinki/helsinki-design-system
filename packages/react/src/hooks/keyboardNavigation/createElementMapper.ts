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

export function createElementMapper(root: HTMLElement, selectors: Selectors): ElementMapper {
  let rootData: ElementData | null = null;

  return {
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
