import {
  TextKey,
  SelectProps,
  TextProvider,
  Texts,
  SelectMetaData,
  SelectDataHandlers,
  TextInterpolationContent,
  SupportedLanguage,
  TextsWithNumberedVariations,
} from './types';

export const defaultTexts: Record<SupportedLanguage, Texts> = {
  en: {
    assistive: '',
    clearButtonAriaLabel_one: 'Remove current selection "{{label}}".',
    clearButtonAriaLabel_multiple: 'Remove all {{selectionCount}} selections.',
    error: '',
    label: '',
    noSelectedOptions: '0 selected options',
    placeholder: 'Choose one',
    required: 'Required.',
    selectedOptionsCount_zero: '{{selectionCount}} selected options',
    selectedOptionsCount_one: '{{selectionCount}} selected option',
    selectedOptionsCount_multiple: '{{selectionCount}} selected options',
    dropdownButtonAriaLabel: '',
    multiSelectGroupAriaLabel: '{{label}} (choose all)',
    tagsClearAllButton: 'Clear all',
    tagsClearAllButtonAriaLabel_one: 'Clear the selected option "{{label}}".',
    tagsClearAllButtonAriaLabel_multiple: 'Clear all {{selectionCount}} selected options.',
    tagsRemaining_one: 'There is one selection remaining.',
    tagsRemaining_multiple: 'There are {{selectionCount}} selections remaining.',
    tagRemoved: 'Selected option "{{value}}" removed.',
    tagRemoveSelectionAriaLabel: 'Remove selection "{{label}}".',
    tagsPartiallyHidden: 'Some selected options are now hidden.',
    tagsShowAllButton: 'Show all ({{selectionCount}})',
    tagsShowLessButton: 'Show less',
    // no _one _multiple needed for this. There must be 2+ options if some tags are hidden.
    tagsShowAllButtonAriaLabel: 'Show all {{selectionCount}} selected options.',
    tagsShowLessButtonAriaLabel: 'Show less options.',
    filterLabel: 'Filter',
    filterPlaceholder: 'Type text to filter results with',
    filterClearButtonAriaLabel: 'Clear filter',
    filteredWithoutResultsInfo: 'No options found for "{{value}}".',
    filterWithAnotherTerm: 'Try a different term.',
    filterResults: 'Filtered results for "{{value}}".',
    filterResultsCount_one: 'Found 1 option.',
    filterResultsCount_multiple: 'Found {{numberIndicator}} options.',
    choiceCount_one: 'One choice.',
    choiceCount_multiple: '{{numberIndicator}} choices.',
    searchLabel: 'Search',
    searchPlaceholder: 'Type text to search results with',
    searchClearButtonAriaLabel: 'Clear search',
    searchedWithoutResultsInfo: 'No options found for "{{value}}".',
    searchWithAnotherTerm: 'Try a different term.',
    searchErrorTitle: "We couldn't load the options.",
    searchErrorText: 'Try again or if the problem persists contact support.',
    searching: 'Searching for "{{value}}".',
    searchResults_one: 'Found one option for search term "{{value}}".',
    searchResults_multiple: 'Found {{numberIndicator}} options for search term "{{value}}".',
  },
  fi: {
    assistive: '',
    clearButtonAriaLabel_one: 'FI: Remove current selection of "{{label}}".',
    clearButtonAriaLabel_multiple: 'FI: Remove all {{selectionCount}} selections.',
    error: '',
    label: '',
    noSelectedOptions: 'FI: 0 selected options',
    placeholder: 'FI: Choose one',
    required: 'FI: Required.',
    selectedOptionsCount_zero: 'FI: {{selectionCount}} selected options',
    selectedOptionsCount_one: 'FI: {{selectionCount}} selected option',
    selectedOptionsCount_multiple: 'FI: {{selectionCount}} selected options',
    dropdownButtonAriaLabel: 'FI: ',
    multiSelectGroupAriaLabel: 'FI: {{label}} (choose all)',
    tagsClearAllButton: 'FI: Clear all',
    tagsClearAllButtonAriaLabel_one: 'FI: Clear the selected option "{{label}}".',
    tagsClearAllButtonAriaLabel_multiple: 'FI: Clear all {{selectionCount}} selected options.',
    tagsRemaining_one: 'FI: There is one selection remaining.',
    tagsRemaining_multiple: 'FI: There are {{selectionCount}} selections remaining.',
    tagRemoved: 'FI: Selected option "{{value}}" removed.',
    tagRemoveSelectionAriaLabel: 'FI: Remove selection "{{label}}".',
    tagsPartiallyHidden: 'FI: Some selected options are now hidden.',
    tagsShowAllButton: 'FI: Show all ({{selectionCount}})',
    tagsShowLessButton: 'FI: Show less',
    // no _one _multiple needed for this. There must be 2+ options if some tags are hidden.
    tagsShowAllButtonAriaLabel: 'FI: Show all {{selectionCount}} selected options.',
    tagsShowLessButtonAriaLabel: 'FI: Show less options.',
    filterLabel: 'FI: Filter',
    filterPlaceholder: 'FI: Type text to filter results with',
    filterClearButtonAriaLabel: 'FI: Clear filter',
    filteredWithoutResultsInfo: 'FI: No options found for "{{value}}".',
    filterWithAnotherTerm: 'FI: Try a different term.',
    filterResults: 'FI: Filtered results for "{{value}}".',
    filterResultsCount_one: 'FI: Found 1 option.',
    filterResultsCount_multiple: 'FI: Found {{numberIndicator}} options.',
    choiceCount_one: 'FI: One choice.',
    choiceCount_multiple: 'FI: {{numberIndicator}} choices.',
    searchLabel: 'FI: Search',
    searchPlaceholder: 'FI: Type text to search results with',
    searchClearButtonAriaLabel: 'FI: Clear search',
    searchedWithoutResultsInfo: 'FI: No options found for "{{value}}".',
    searchWithAnotherTerm: 'FI: Try a different term.',
    searchErrorTitle: "FI: We couldn't load the options.",
    searchErrorText: 'FI: Try again or if the problem persists contact support.',
    searching: 'FI: Searching for "{{value}}".',
    searchResults_one: 'FI: Found one option for search term "{{value}}".',
    searchResults_multiple: 'FI: Found {{numberIndicator}} options for search term "{{value}}".',
  },
  sv: {
    assistive: '',
    clearButtonAriaLabel_one: 'SV: Remove current selection of "{{label}}".',
    clearButtonAriaLabel_multiple: 'SV: Remove all {{selectionCount}} selections.',
    error: '',
    label: '',
    noSelectedOptions: 'SV: 0 selected options',
    placeholder: 'SV: Choose one',
    required: 'SV: Required.',
    selectedOptionsCount_zero: 'SV: {{selectionCount}} selected options',
    selectedOptionsCount_one: 'SV: {{selectionCount}} selected option',
    selectedOptionsCount_multiple: 'SV: {{selectionCount}} selected options',
    dropdownButtonAriaLabel: 'SV: ',
    multiSelectGroupAriaLabel: 'SV: {{label}} (choose all)',
    tagsClearAllButton: 'SV: Clear all',
    tagsClearAllButtonAriaLabel_one: 'SV: Clear the selected option "{{label}}".',
    tagsClearAllButtonAriaLabel_multiple: 'SV: Clear all {{selectionCount}} selected options.',
    tagsRemaining_one: 'SV: There is one selection remaining.',
    tagsRemaining_multiple: 'SV: There are {{selectionCount}} selections remaining.',
    tagRemoved: 'SV: Selected option "{{value}}" removed.',
    tagRemoveSelectionAriaLabel: 'SV: Remove selection "{{label}}".',
    tagsPartiallyHidden: 'SV: Some selected options are now hidden.',
    tagsShowAllButton: 'SV: Show all ({{selectionCount}})',
    tagsShowLessButton: 'SV: Show less',
    // no _one _multiple needed for this. There must be 2+ options if some tags are hidden.
    tagsShowAllButtonAriaLabel: 'SV: Show all {{selectionCount}} selected options.',
    tagsShowLessButtonAriaLabel: 'SV: Show less options.',
    filterLabel: 'SV: Filter',
    filterPlaceholder: 'SV: Type text to filter results with',
    filterClearButtonAriaLabel: 'SV: Clear filter',
    filteredWithoutResultsInfo: 'SV: No options found for "{{value}}".',
    filterWithAnotherTerm: 'SV: Try a different term.',
    filterResults: 'SV: Filtered results for "{{value}}".',
    filterResultsCount_one: 'SV: Found 1 option.',
    filterResultsCount_multiple: 'SV: Found {{numberIndicator}} options.',
    choiceCount_one: 'SV: One choice.',
    choiceCount_multiple: 'SV: {{numberIndicator}} choices.',
    searchLabel: 'SV: Search',
    searchPlaceholder: 'SV: Type text to search results with',
    searchClearButtonAriaLabel: 'SV: Clear search',
    searchedWithoutResultsInfo: 'SV: No options found for "{{value}}".',
    searchWithAnotherTerm: 'SV: Try a different term.',
    searchErrorTitle: "SV: We couldn't load the options.",
    searchErrorText: 'SV: Try again or if the problem persists contact support.',
    searching: 'SV: Searching for "{{value}}".',
    searchResults_one: 'SV: Found one option for search term "{{value}}".',
    searchResults_multiple: 'SV: Found {{numberIndicator}} options for search term "{{value}}".',
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

export const getNumberedVariationsTextKey = (
  key: TextsWithNumberedVariations,
  metaData: SelectMetaData,
  usedNumberKey: keyof Pick<TextInterpolationContent, 'numberIndicator' | 'selectionCount'>,
  customContent?: Partial<TextInterpolationContent>,
): string | undefined => {
  if (!metaData.textContent) {
    // eslint-disable-next-line no-param-reassign
    metaData.textContent = createTextInterpolationContent(metaData);
  }
  const content = { ...metaData.textContent, ...customContent };
  const number = content[usedNumberKey] || 0;
  const suffixes = ['_zero', '_one', '_multiple'];
  const suffix = suffixes[number] || suffixes[2];
  const { textProvider } = metaData;
  return textProvider(`${key}${suffix}` as TextKey, content);
};

export const getTextFromMetaData = (key: TextKey, metaData: SelectMetaData): string | undefined => {
  return getTextKey(key, metaData);
};

export const getTextFromDataHandlers = (key: TextKey, dataHandlers: SelectDataHandlers): string | undefined => {
  return getTextFromMetaData(key, dataHandlers.getMetaData());
};
