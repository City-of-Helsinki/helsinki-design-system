import isEqual from 'lodash.isequal';

/**
 * Helper that checks if an item is in the selected options
 * @param selectedOptions Currently selected options
 * @param item            Item we want to check
 */
export function getIsInSelectedOptions<T>(selectedOptions: T[], item: T): boolean {
  return selectedOptions.some((selectedOption: T) => isEqual(selectedOption, item));
}
