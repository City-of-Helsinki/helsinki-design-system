import { createElementIds, ElementIdsConfig } from '../utils/elementIds';

/**
 * Generic element IDs factory function that can be configured for different dropdown components
 * @template TElementIds - The element IDs type for the component (e.g., SearchMetaData['elementIds'])
 */
export function createGenericElementIds<TElementIds extends Record<string, string>>(config: ElementIdsConfig) {
  return function getElementIds(containerId: string): TElementIds {
    return createElementIds<TElementIds>(containerId, config);
  };
}
