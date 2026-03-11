import { ElementHandle, Locator, Page } from '@playwright/test';
import { getLocatorOrHandlePage, waitFor, waitForStable } from './playwright.util';

type BoundingBox = {
  x: number;
  y: number;
  height: number;
  width: number;
};

export async function isElementVisible(element: ElementHandle | Locator | null) {
  if (!element || !element.isVisible) {
    return false;
  }
  return element.isVisible();
}

// Evaluate runs the given function outside of window context
// and returning the element, returns a Node, even if "el" is HTMLELement in function's scope.
// https://playwright.dev/docs/evaluating
// PS: console.log inside evaluateLocator does not output!
// *** IMPORTANT ***
// https://playwright.dev/docs/evaluating#different-environments
// passing a function that calls another function will throw an error of function not found.
export async function evaluateLocator<T = unknown>(
  locator: Locator,
  func: (element: HTMLElement | SVGElement) => T,
): Promise<T> {
  return locator.evaluate(func);
}

// checking element, so function and each getAttribute() does not need to be async
export function isHTMLElementSelectedOrChecked(element: HTMLElement | SVGElement): boolean {
  const isValueTruthy = (value: string | null) => {
    if (!value || value === 'false') {
      return false;
    }
    return true;
  };

  return (
    isValueTruthy((element as any).checked) ||
    isValueTruthy((element as any).selected) ||
    isValueTruthy(element.getAttribute('checked')) ||
    isValueTruthy(element.getAttribute('selected')) ||
    isValueTruthy(element.getAttribute('aria-checked')) ||
    isValueTruthy(element.getAttribute('aria-selected'))
  );
}

export async function isLocatorSelectedOrChecked(locator: Locator): Promise<boolean> {
  return evaluateLocator<boolean>(locator, isHTMLElementSelectedOrChecked);
}

// this seems wrong way to test simple things, but a function cannot be passed inside another function to locator.evaluate.
// the function is out of scope and will be undefined, because the evaluate is ran in Node's context.
export function doesLocatorHaveAttributeOrPropValue(
  locator: Locator,
  attributeName: string,
  value: string,
  checkAlsoProps = false,
): Promise<boolean> {
  return locator.evaluate(
    (element, { attributeName, value, checkAlsoProps }) => {
      if (!element || typeof element.getAttribute !== 'function') {
        return false;
      }
      const attributeMatch = element.getAttribute(attributeName) === value;
      const propsMatch = checkAlsoProps ? Reflect.get(element, attributeName) : false;

      return attributeMatch || propsMatch;
    },
    { attributeName, value, checkAlsoProps },
  );
}

export async function waitForElementToBeVisible(element: Locator | null) {
  if (!element || !element.waitFor) {
    return Promise.reject(new Error('No element for waitForElementVisible'));
  }

  return element.waitFor({ state: 'visible' });
}

export async function waitForElementToBeHidden(element: Locator | null) {
  if (!element || !element.waitFor) {
    return Promise.reject(new Error('No element for waitForElementToBeHidden'));
  }

  return element.waitFor({ state: 'hidden' });
}

export async function isLocatorFocused(element: Locator) {
  return element.evaluate((el) => {
    const active = document.activeElement;
    return el === active;
  });
}

export async function getFocusedElement(anyLocator: Locator) {
  return anyLocator.evaluate(() => {
    return document.activeElement;
  });
}

export async function focusLocator(element: Locator) {
  await element.focus();
  return element;
}

// console.log() do not work inside any evaluate(), so this is for debugging an element
export async function getLocatorOuterHTML(anyLocator: Locator) {
  return anyLocator.evaluate((el) => {
    return el.outerHTML;
  });
}

export async function getDiffYBetweenElementCenters(element: Locator | BoundingBox, container: Locator | BoundingBox) {
  const getBox = async (boxOrLocator: Locator | BoundingBox): Promise<BoundingBox | null> => {
    if ((boxOrLocator as Locator).boundingBox) {
      return (boxOrLocator as Locator).boundingBox();
    }
    return Promise.resolve(boxOrLocator as BoundingBox);
  };
  const containerBox = await getBox(container);
  const elementBox = await getBox(element);
  if (!containerBox || !elementBox) {
    return 0;
  }
  const viewportMaxY = containerBox.y + containerBox.height;
  const elementMaxY = elementBox.y + elementBox.height;
  if (elementMaxY < viewportMaxY && elementBox.y > containerBox.y) {
    // already visible
    //return 0;
  }
  if (elementBox.y < containerBox.y) {
    return elementBox.y - containerBox.y;
  }
  const vpCenter = containerBox.y + containerBox.height / 2;
  return elementBox.y + elementBox.height / 2 - vpCenter;
}

// calculate unified bounding Box
export async function combineBoundingBoxes(elements: Locator[]): Promise<BoundingBox> {
  const boxes = (
    await Promise.all(
      elements.map(async (elem) => {
        return await elem.boundingBox();
      }),
    )
  ).filter((box) => !!box);
  const currentBox = boxes.shift() as BoundingBox;
  boxes.forEach((box) => {
    if (!box) {
      return;
    }
    currentBox.x = Math.min(currentBox.x, box.x);
    currentBox.y = Math.min(currentBox.y, box.y);
    const maxX = Math.max(currentBox.x + currentBox.width, box.x + box.width);
    const maxY = Math.max(currentBox.y + currentBox.height, box.y + box.height);
    currentBox.width = maxX - currentBox.x;
    currentBox.height = maxY - currentBox.y;
  });
  return currentBox;
}

// moves mouse to the middle of the element and uses mouse wheel to scroll.
// useful when scrolled element is inside an element which is inside a container, like a dropdown list.
// does not check if scrolling is possible the given amount
export async function scrollWithMouse(element: Locator, scrollAmount: number, targetToMove: Locator) {
  if (scrollAmount == 0) {
    return Promise.resolve(false);
  }
  const page = await getLocatorOrHandlePage(element);
  const elementBox = await element.boundingBox();
  if (!elementBox) {
    return Promise.resolve(false);
  }
  const getTargetY = async () => {
    const bb = await targetToMove.boundingBox();
    return bb ? bb.y : null;
  };
  const targetStartY = await getTargetY();
  if (targetStartY === null) {
    return Promise.resolve(false);
  }
  //await page.mouse.move(elementBox.x + elementBox.width / 2, elementBox.y + elementBox.height / 2);
  await element.hover();
  // from docs: this method does not wait for the scrolling to finish before returning.
  // so must wait for scroll to change and end
  await page.mouse.wheel(0, scrollAmount);
  const values = [targetStartY];
  await waitFor(async () => {
    const currentY = (await getTargetY()) as number;
    values.push(currentY);
    // "dirty" comparison. Just check scroll has happend (current !== first) and haven't changed for 2 checks.
    return Promise.resolve(
      currentY !== values[0] && currentY === values[values.length - 1] && currentY === values[values.length - 2],
    );
  });

  return Promise.resolve(true);
}

export async function getScrollTop(element: Locator) {
  return element.evaluate((el) => {
    return el.scrollTop;
  });
}

export async function getMaxScrollTop(element: Locator) {
  return element.evaluate((el) => {
    return el.scrollHeight - el.clientHeight;
  });
}

export async function scrollTo(element: Locator, scrollTarget: number) {
  return element.evaluate((el, y) => {
    el.scrollTo(0, y);
  }, scrollTarget);
}

// sets element's scrollTo to given amount.
// Also checks that the element can actually scroll that far
export async function scrollLocatorTo(element: Locator, scrollTarget: number) {
  const maxScrollTop = await getMaxScrollTop(element);
  const verifiedScrollAmount = Math.min(Math.max(0, scrollTarget), maxScrollTop);
  let currentValue = await getScrollTop(element);
  if (currentValue === verifiedScrollAmount) {
    return Promise.resolve(currentValue);
  }

  await scrollTo(element, verifiedScrollAmount);
  const fn = async () => {
    const scrollTop = await getScrollTop(element);
    return scrollTop === verifiedScrollAmount;
  };

  await waitForStable(fn);

  return getScrollTop(element);
}

export async function waitForStablePosition(locator: Locator, requiredCount = 5, delayMs = 100) {
  let previousBox: BoundingBox = { x: 0, y: 0, width: -1, height: -1 };
  const isStable = (box: BoundingBox): boolean => {
    if (
      box &&
      previousBox.x === box.x &&
      previousBox.y === box.y &&
      previousBox.width === box.width &&
      previousBox.height === box.height
    ) {
      previousBox = box;
      return true;
    }
    previousBox = box;
    return false;
  };
  const fn = async () => {
    // Add explicit delay to allow for rendering/font loading
    await new Promise(resolve => setTimeout(resolve, delayMs));
    const box = await locator.boundingBox();
    if (!box) {
      return Promise.resolve(false);
    }
    return Promise.resolve(isStable(box));
  };

  return waitForStable(fn, requiredCount);
}

export function getAllElementAttributes(locator: Locator): Promise<Record<string, string>> {
  return locator.evaluate((element) => {
    const attributes = {};
    if (!element || typeof element.getAttribute !== 'function') {
      return attributes;
    }
    for (const attr of element.attributes) {
      attributes[attr.name] = attr.value; //element.getAttribute(attr.name);
    }

    return attributes;
  });
}
