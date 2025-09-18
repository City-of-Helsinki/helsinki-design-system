/**
 * Configuration object for defining which element IDs should be generated
 */
export interface ElementIdsConfig {
  /** Container element ID */
  container?: boolean;
  /** Main button element ID */
  button?: boolean;
  /** List element ID */
  list?: boolean;
  /** Clear button element ID */
  clearButton?: boolean;
  /** Label element ID */
  label?: boolean;
  /** Selections and lists container ID */
  selectionsAndListsContainer?: boolean;
  /** Tag list element ID */
  tagList?: boolean;
  /** Search or filter input element ID */
  searchOrFilterInput?: boolean;
  /** Search or filter input label ID */
  searchOrFilterInputLabel?: boolean;
  /** Clear all button element ID */
  clearAllButton?: boolean;
  /** Show all button element ID */
  showAllButton?: boolean;
  /** Search container element ID */
  searchContainer?: boolean;
  /** Search input element ID */
  searchInput?: boolean;
  /** Search input label element ID */
  searchInputLabel?: boolean;
}

/**
 * Generic function to generate element IDs based on a configuration object
 * @param containerId - The base container ID
 * @param config - Configuration object specifying which IDs to generate
 * @returns Object with the requested element IDs
 */
export function createElementIds<T extends Record<string, string>>(
  containerId: string,
  config: ElementIdsConfig
): T {
  const elementIds: Record<string, string> = {};

  if (config.container) {
    elementIds.container = containerId;
  }
  if (config.button) {
    elementIds.button = `${containerId}-main-button`;
  }
  if (config.list) {
    elementIds.list = `${containerId}-list`;
  }
  if (config.clearButton) {
    elementIds.clearButton = `${containerId}-clear-button`;
  }
  if (config.label) {
    elementIds.label = `${containerId}-label`;
  }
  if (config.selectionsAndListsContainer) {
    elementIds.selectionsAndListsContainer = `${containerId}-sl-container`;
  }
  if (config.tagList) {
    elementIds.tagList = `${containerId}-tag-list`;
  }
  if (config.searchOrFilterInput) {
    elementIds.searchOrFilterInput = `${containerId}-input-element`;
  }
  if (config.searchOrFilterInputLabel) {
    elementIds.searchOrFilterInputLabel = `${containerId}-input-element-label`;
  }
  if (config.clearAllButton) {
    elementIds.clearAllButton = `${containerId}-clear-all-button`;
  }
  if (config.showAllButton) {
    elementIds.showAllButton = `${containerId}-show-all-button`;
  }
  if (config.searchContainer) {
    elementIds.searchContainer = `${containerId}-search-container`;
  }
  if (config.searchInput) {
    elementIds.searchInput = `${containerId}-search-input`;
  }
  if (config.searchInputLabel) {
    elementIds.searchInputLabel = `${containerId}-search-input-label`;
  }

  return elementIds as T;
}
