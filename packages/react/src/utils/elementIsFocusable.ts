/**
 * @internal
 */
export const elementIsFocusable = (element: HTMLElement) => {
  if (!window) {
    return false;
  }

  const { innerHeight, innerWidth } = window;
  const { top, left, bottom, right, width, height } = element.getBoundingClientRect();

  const isInViewport = top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
  const hasTabIndex = element.tabIndex >= 0;
  const isEnabled = Boolean(element.getAttribute('disabled')) === false;
  const isVisible = width > 0 && height > 0;

  return isInViewport && hasTabIndex && isEnabled && isVisible;
};
