/**
 * @@internal
 */
export const elementAttributeExists = (element: HTMLElement | SVGElement, attributeName: string): boolean => {
  const value = element.getAttribute(attributeName);
  return !!value || value === '';
};
