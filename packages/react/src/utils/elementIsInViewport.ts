export const elementIsInViewport = (element: Element) => {
  const { top, left, bottom, right } = element.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;

  return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
