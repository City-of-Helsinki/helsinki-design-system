/**
 * Returns unique id
 */

let uniqueIdCounter = 0;
export default (prefix = ''): string => {
  uniqueIdCounter += 1;
  return `${prefix}${uniqueIdCounter}`;
};
