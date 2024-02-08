export const getIndexOfFirstVisibleChild = (
  el: HTMLElement,
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
