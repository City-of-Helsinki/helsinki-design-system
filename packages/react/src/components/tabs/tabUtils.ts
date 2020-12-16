/**
 * Get the child element based on it's index
 * @param index The index of the child
 * @param parent The parent element
 */
export const getChildByIndex = (index: number, parent: HTMLElement): HTMLElement => {
  if (index !== null) {
    const element = parent.children[index];
    if (element !== null && element instanceof HTMLElement) {
      return element;
    }
  }
  return null;
};

/**
 * Check if the tab element is outside the right edge of the container
 * @param tab The tab element
 * @param container The container element
 * @param offset The scroll offset
 */
export const isElementOutsideRightEdge = (tab: Element, container: Element, offset: number) => {
  const tabElement = tab as HTMLElement;
  const containerElement = container as HTMLElement;
  const tabDistance = tabElement.offsetLeft + tabElement.offsetWidth;
  return tabDistance > containerElement.offsetWidth + offset;
};

/**
 * Check if the tab element is outside the left edge of the container
 * @param tab The tab element
 * @param offset The scroll offset
 */
export const isElementOutsideLeftEdge = (tab: Element, offset: number) => {
  const tabElement = tab as HTMLElement;
  const tabDistance = tabElement.offsetLeft;
  return tabDistance < offset;
};
