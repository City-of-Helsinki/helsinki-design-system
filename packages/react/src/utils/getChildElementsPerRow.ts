type Rect = { left: number; right: number; top: number; bottom: number };

/**
 * This function is for elements whose children flow from left to right and top to bottom.
 * Child elements should not overlap. Partial overlapping is supported.
 * @param container The element whose children are checked
 * @param maxRows How many rows are calculated before stopping.
 * @returns Array<Array<Element>>
 */
export const getChildElementsPerRow = (container: HTMLElement | Element, maxRows = -1): Array<Array<Element>> => {
  const rowCoordinates: Rect[] = [];
  const rows: Array<Array<Element>> = [];
  let currentRowIndex = -1;

  const addRow = (childRect: DOMRect, child: Element) => {
    currentRowIndex += 1;
    const { top, bottom, left, right } = childRect;
    rowCoordinates[currentRowIndex] = { top, bottom, left, right };
    rows[currentRowIndex] = [];
    rows[currentRowIndex].push(child);
  };

  const appendToRow = (childRect: DOMRect, child: Element) => {
    const currentRect = rowCoordinates[currentRowIndex];
    currentRect.top = Math.min(currentRect.top, childRect.top);
    currentRect.bottom = Math.max(currentRect.bottom, childRect.bottom);
    currentRect.left = Math.min(currentRect.left, childRect.left);
    currentRect.right = Math.max(currentRect.right, childRect.right);
    rows[currentRowIndex].push(child);
  };

  const didRowChange = (childRect: DOMRect) => {
    const rowBounds = rowCoordinates[currentRowIndex];
    if (!rowBounds) {
      return true;
    }
    if (childRect.right < rowBounds.right && childRect.top > rowBounds.bottom) {
      return true;
    }
    return false;
  };

  let currentChild = container.firstElementChild;
  while (currentChild) {
    const childRect = currentChild.getBoundingClientRect();
    if (didRowChange(childRect)) {
      addRow(childRect, currentChild);
    } else {
      appendToRow(childRect, currentChild);
    }
    if (maxRows > 0 && rows.length >= maxRows) {
      currentChild = null;
    } else {
      currentChild = currentChild.nextElementSibling;
    }
  }
  return rows;
};
