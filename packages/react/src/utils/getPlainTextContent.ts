import type { ReactNode } from 'react';
import { isValidElement } from 'react';

/**
 * Extracts plain text content from React nodes by recursively traversing through the elements
 * @param element - The React node to extract text from. Can be a string, ReactElement, or an array of React nodes
 * @returns A string containing all text content concatenated together
 *
 * @example
 * // Returns "Hello World"
 * getPlainTextContent(<div>Hello <span>World</span></div>)
 *
 * @example
 * // Returns "Multiple Children"
 * getPlainTextContent(['Multiple ', <span>Children</span>])
 */
export const getPlainTextContent = (element: ReactNode): string => {
  if (typeof element === 'string') {
    return element;
  }
  if (isValidElement(element)) {
    return getPlainTextContent(element.props.children);
  }
  if (Array.isArray(element)) {
    return element.map(getPlainTextContent).join('');
  }
  return '';
};
