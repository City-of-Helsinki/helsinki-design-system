/**
 * Gets the previous and next siblings of a target element from an array of children.
 * Supports looping from last to first and vice versa.
 *
 * @param target - The current element to find siblings for
 * @param loop - Whether to loop around when reaching the first/last element (default: true)
 * @param children - Array of child elements to search through
 * @returns Object with prev and next sibling elements (or null if none found)
 */
export const getElementSiblings = <T = HTMLElement>(target?: T, loop = true, children?: T[]) => {
  if (!children || children.length === 0) {
    return { prev: null, next: null };
  }

  const index = target ? children.indexOf(target) : -1;

  const getNewIndex = (dir: -1 | 1) => {
    const newIndex = index + dir;
    if (newIndex < 0) {
      return loop ? children.length - 1 : 0;
    }
    if (newIndex >= children.length) {
      return loop ? 0 : children.length - 1;
    }
    return newIndex;
  };

  const prevIndex = getNewIndex(-1);
  const nextIndex = getNewIndex(1);

  return {
    prev: prevIndex !== index ? children[prevIndex] : null,
    next: nextIndex !== index ? children[nextIndex] : null,
  };
};
