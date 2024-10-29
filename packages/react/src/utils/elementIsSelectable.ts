import { elementAttributeExists } from './elementAttributeExists';

export const elementIsSelectable = (element: HTMLElement | SVGElement): boolean => {
  return (
    elementAttributeExists(element, 'checked') ||
    elementAttributeExists(element, 'selected') ||
    elementAttributeExists(element, 'aria-checked') ||
    elementAttributeExists(element, 'aria-selected')
  );
};
