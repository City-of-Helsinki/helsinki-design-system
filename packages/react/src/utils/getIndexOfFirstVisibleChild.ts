/**
 *
 * Traverses element's children to find child element whose bounding client rect is fully inside the parent's bounding client rect
 * Children are traversed in reverse order, starting from last. Traversion stops immediately when a fitting element is found.
 * Does not check all bounding client rects to find the element nearest to parent's borders.
 *
 * @param el
 * @param verticalOrHorizontal Should child be visible horizontally, vertically or both.
 * @returns
 */
export const getIndexOfFirstVisibleChild = (
  el: HTMLElement | Element,
  verticalOrHorizontal: 'vertical' | 'horizontal' | 'both' = 'both',
): number => {
  const rect = el.getBoundingClientRect();
  const isWithInVerticalBounds = (childRect: DOMRect) => {
    return childRect.top >= rect.top && childRect.bottom <= rect.bottom;
  };
  const isWithInHorizontalBounds = (childRect: DOMRect) => {
    return childRect.left >= rect.left && childRect.right <= rect.right;
  };
  const isWithInParent = (childRect: DOMRect) => {
    if (verticalOrHorizontal === 'vertical') {
      return isWithInVerticalBounds(childRect);
    }
    if (verticalOrHorizontal === 'horizontal') {
      return isWithInHorizontalBounds(childRect);
    }
    return isWithInVerticalBounds(childRect) && isWithInHorizontalBounds(childRect);
  };
  let currentChild = el.lastElementChild;
  let currentIndex = el.children.length - 1;
  while (currentChild && currentIndex >= 0) {
    const childRect = currentChild.getBoundingClientRect();
    if (isWithInParent(childRect)) {
      break;
    }
    currentChild = currentChild.previousElementSibling;
    currentIndex -= 1;
  }
  return currentIndex;
};
