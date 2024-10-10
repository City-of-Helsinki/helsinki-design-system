import {
  TextKey,
  SelectProps,
  TextProvider,
  Texts,
  SelectMetaData,
  SelectDataHandlers,
  TextInterpolationContent,
  SupportedLanguage,
} from './types';

export const defaultTexts: Record<SupportedLanguage, Texts> = {
  en: {
    assistive: '',
    clearButtonAriaLabel: `Remove all {{selectionCount}} selections`,
    error: '',
    label: '',
    noSelectedOptions: '0 selected options',
    placeholder: 'Choose one',
    selectedOptionsCount: '{{selectionCount}} selected options',
    selectedOptionsLabel: 'Selected options',
    dropdownButtonAriaLabel: '',
    multiSelectGroupAriaLabel: '{{optionLabel}} (choose all)',
    tagsClearAllButton: 'Clear all',
    tagsClearAllButtonAriaLabel: 'Clear all {{selectionCount}} selected options.',
    tagsShowAllButton: 'Show all ({{selectionCount}})',
    tagsShowLessButton: 'Show less',
    tagsShowAllButtonAriaLabel: 'Show all {{selectionCount}} selected options.',
    tagsShowLessButtonAriaLabel: 'Show less options.',
    tagRemoveSelectionAriaLabel: 'Remove selection "{{optionLabel}}".',
    tagRemoved: 'Selected option "{{value}}" removed. There are {{selectionCount}} selections remaining.',
    filterLabel: 'Filter',
    filterPlaceholder: 'Type text to filter results with',
    filterClearButtonAriaLabel: 'Clear filter',
    filteredWithoutResultsInfo: 'No options found for "{{value}}".',
    filterWithAnotherTerm: 'Try a different term.',
    filterResults: 'Filtered results for "{{value}}". Found {{numberIndicator}} options.',
    ariaLabelForListWhenRoleIsDialog: '{{label}}. {{numberIndicator}} choices.',
    searchLabel: 'Search',
    searchPlaceholder: 'Type text to search results with',
    searchClearButtonAriaLabel: 'Clear search',
    searchedWithoutResultsInfo: 'No options found for "{{value}}".',
    searchWithAnotherTerm: 'Try a different term.',
    searchingForOptions: 'Loading options',
    searchErrorTitle: "We couldn't load the options.",
    searchErrorText: 'Try again or if the problem persists contact support.',
    searching: 'Searching for "{{value}}.',
    searchResults: 'Found {{numberIndicator}} options for search term "{{value}}".',
  },
  fi: {
    assistive: '',
    clearButtonAriaLabel: `FI: Remove all {{selectionCount}} selections`,
    error: '',
    label: '',
    noSelectedOptions: 'FI: 0 selected options',
    placeholder: 'FI: Choose one',
    selectedOptionsCount: 'FI: {{selectionCount}} selected options',
    selectedOptionsLabel: 'FI: Selected options',
    dropdownButtonAriaLabel: '',
    multiSelectGroupAriaLabel: 'FI: {{optionLabel}} (choose all)',
    tagsClearAllButton: 'FI: Clear all',
    tagsClearAllButtonAriaLabel: 'FI: Clear all {{selectionCount}} selected options.',
    tagsShowAllButton: 'FI: Show all ({{selectionCount}})',
    tagsShowLessButton: 'FI: Show less',
    tagsShowAllButtonAriaLabel: 'FI: Show all {{selectionCount}} selected options.',
    tagsShowLessButtonAriaLabel: 'FI: Show less options.',
    tagRemoveSelectionAriaLabel: 'FI: Remove selection "{{optionLabel}}".',
    tagRemoved: 'FI: Selected option "{{value}}" removed. There are {{selectionCount}} selections remaining.',
    filterLabel: 'FI: Filter',
    filterPlaceholder: 'FI: Type text to filter results with',
    filterClearButtonAriaLabel: 'FI: Clear filter',
    filteredWithoutResultsInfo: 'FI: No options found for "{{value}}".',
    filterWithAnotherTerm: 'FI: Try a different term.',
    filterResults: 'FI: Filtered results for "{{value}}". Found {{numberIndicator}} options.',
    ariaLabelForListWhenRoleIsDialog: 'FI: {{label}}. {{numberIndicator}} choices.',
    searchLabel: 'FI: Search',
    searchPlaceholder: 'FI: Type text to search results with',
    searchClearButtonAriaLabel: 'FI: Clear search',
    searchedWithoutResultsInfo: 'FI: No options found for "{{value}}".',
    searchWithAnotherTerm: 'FI: Try a different term.',
    searchingForOptions: 'FI: Loading options',
    searchErrorTitle: "We couldn't load the options.",
    searchErrorText: 'FI: Try again or if the problem persists contact support.',
    searching: 'FI: Searching for "{{value}}.',
    searchResults: 'FI: Found {{numberIndicator}} options for search term "{{value}}".',
  },
  sv: {
    assistive: '',
    clearButtonAriaLabel: `SV: Remove all {{selectionCount}} selections`,
    error: '',
    label: '',
    noSelectedOptions: 'SV: 0 selected options',
    placeholder: 'SV: Choose one',
    selectedOptionsCount: 'SV: {{selectionCount}} selected options',
    selectedOptionsLabel: 'SV: Selected options',
    dropdownButtonAriaLabel: '',
    multiSelectGroupAriaLabel: 'SV: {{optionLabel}} (choose all)',
    tagsClearAllButton: 'SV: Clear all',
    tagsClearAllButtonAriaLabel: 'SV: Clear all {{selectionCount}} selected options.',
    tagsShowAllButton: 'SV: Show all ({{selectionCount}})',
    tagsShowLessButton: 'SV: Show less',
    tagsShowAllButtonAriaLabel: 'SV: Show all {{selectionCount}} selected options.',
    tagsShowLessButtonAriaLabel: 'SV: Show less options.',
    tagRemoveSelectionAriaLabel: 'SV: Remove selection "{{optionLabel}}".',
    tagRemoved: 'SV: Selected option "{{value}}" removed. There are {{selectionCount}} selections remaining.',
    filterLabel: 'SV: Filter',
    filterPlaceholder: 'SV: Type text to filter results with',
    filterClearButtonAriaLabel: 'SV: Clear filter',
    filteredWithoutResultsInfo: 'SV: No options found for "{{value}}".',
    filterWithAnotherTerm: 'SV: Try a different term.',
    filterResults: 'SV: Filtered results for "{{value}}". Found {{numberIndicator}} options.',
    ariaLabelForListWhenRoleIsDialog: 'SV: {{label}}. {{numberIndicator}} choices.',
    searchLabel: 'SV: Search',
    searchPlaceholder: 'SV: Type text to search results with',
    searchClearButtonAriaLabel: 'SV: Clear search',
    searchedWithoutResultsInfo: 'SV: No options found for "{{value}}".',
    searchWithAnotherTerm: 'SV: Try a different term.',
    searchingForOptions: 'SV: Loading options',
    searchErrorTitle: "We couldn't load the options.",
    searchErrorText: 'SV: Try again or if the problem persists contact support.',
    searching: 'SV: Searching for "{{value}}.',
    searchResults: 'SV: Found {{numberIndicator}} options for search term "{{value}}".',
  },
};

const interpolate = (template: string, contents: TextInterpolationContent) => {
  return template.replace(/\{{(.*?)}}/g, (match, p1) => {
    const key = p1 ? p1.trim() : '';
    return key ? contents[key] : '';
  });
};

const getValue = (text: string, contents: TextInterpolationContent) => {
  if (!text) {
    return '';
  }
  if (text.indexOf('{{') === -1) {
    return text;
  }
  return interpolate(text, contents);
};

const createTextInterpolationContent = (metaData: SelectMetaData): TextInterpolationContent => {
  const count = metaData.selectedOptions.length;
  return {
    selectionCount: count,
    optionLabel: '',
    numberIndicator: '',
    label: '',
    value: '',
  };
};

const textObjToTextProvider = (texts: Partial<Texts>): TextProvider => {
  const language: SupportedLanguage = texts.language || 'fi';
  const mergedTexts = {
    ...defaultTexts[language],
    ...texts,
  };
  return (id, contents) => {
    const text = mergedTexts[id];
    return getValue(text, contents);
  };
};

export const createTextProvider = (texts: SelectProps['texts']): TextProvider => {
  return typeof texts === 'function' ? texts : textObjToTextProvider(texts || {});
};

export const appendTexts = (texts: Partial<SelectProps['texts']>, metaData: SelectMetaData) => {
  const newTexts = { ...texts };
  const currentProvider = metaData.textProvider;
  // eslint-disable-next-line no-param-reassign
  metaData.textProvider = (key, contents) => {
    const text = newTexts[key];
    if (text !== undefined) {
      return getValue(text, contents);
    }
    return currentProvider(key, contents);
  };
};

export const getTextKey = (
  key: TextKey,
  metaData: SelectMetaData,
  customContent?: Partial<TextInterpolationContent>,
): string | undefined => {
  if (!metaData.textContent) {
    // eslint-disable-next-line no-param-reassign
    metaData.textContent = createTextInterpolationContent(metaData);
  }
  const { textProvider } = metaData;
  return textProvider(key, { ...metaData.textContent, ...customContent });
};

export const getTextFromMetaData = (key: TextKey, metaData: SelectMetaData): string | undefined => {
  return getTextKey(key, metaData);
};

export const getTextFromDataHandlers = (key: TextKey, dataHandlers: SelectDataHandlers): string | undefined => {
  return getTextFromMetaData(key, dataHandlers.getMetaData());
};
