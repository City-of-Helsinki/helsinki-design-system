import {
  TextKey,
  SelectProps,
  TextProvider,
  Texts,
  SelectMetaData,
  SelectDataHandlers,
  TextsWithNumberedVariations,
} from './types';
import { TextInterpolationContent, SupportedLanguage } from '../modularOptionList/types';

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
    clearButtonAriaLabel_one: 'Poista nykyinen valinta "{{label}}".',
    clearButtonAriaLabel_multiple: 'Poista kaikki {{selectionCount}} valintaa.',
    error: '',
    label: '',
    noSelectedOptions: '0 valittua vaihtoehtoa',
    placeholder: 'Valitse yksi',
    required: 'Pakollinen.',
    selectedOptionsCount_zero: 'Ei yhtään valittua valittua',
    selectedOptionsCount_one: '{{selectionCount}} valittu vaihtoehto',
    selectedOptionsCount_multiple: '{{selectionCount}} valittua vaihtoehtoa',
    dropdownButtonAriaLabel: '',
    multiSelectGroupAriaLabel: '{{label}} (valitse kaikki)',
    tagsClearAllButton: 'Tyhjennä kaikki',
    tagsClearAllButtonAriaLabel_one: 'Tyhjennä valittu vaihtoehto "{{label}}".',
    tagsClearAllButtonAriaLabel_multiple: 'Tyhjennä kaikki {{selectionCount}} valitut vaihtoehdot.',
    tagsRemaining_one: 'Yksi valinta jäljellä.',
    tagsRemaining_multiple: 'Jäljellä on {{selectionCount}} valintoja.',
    tagRemoved: 'Valittu vaihtoehto "{{value}}" poistettu.',
    tagRemoveSelectionAriaLabel: 'Poista valinta "{{label}}".',
    tagsPartiallyHidden: 'Jotkin valitut vaihtoehdot on nyt piilotettu.',
    tagsShowAllButton: 'Näytä kaikki ({{selectionCount}})',
    tagsShowLessButton: 'Näytä vähemmän',
    // no _one _multiple needed for this. There must be 2+ options if some tags are hidden.
    tagsShowAllButtonAriaLabel: 'Näytä kaikki {{selectionCount}} valitut vaihtoehdot.',
    tagsShowLessButtonAriaLabel: 'Näytä vähemmän vaihtoehtoja.',
    filterLabel: 'Suodata',
    filterPlaceholder: 'Anna teksti suodatusta varten',
    filterClearButtonAriaLabel: 'Tyhjennä suodatukset',
    filteredWithoutResultsInfo: 'Vaihtoehtoja ei löytynyt suodatukselle "{{value}}".',
    filterWithAnotherTerm: 'Kokeile toisia sanoja.',
    filterResults: 'Suodatetut tulokset termille "{{value}}".',
    filterResultsCount_one: 'Löytyi 1 vaihtoehto.',
    filterResultsCount_multiple: 'Löytyi {{numberIndicator}} vaihtoehtoa.',
    choiceCount_one: 'Yksi vaihtoehto.',
    choiceCount_multiple: '{{numberIndicator}} vaihtoehtoa.',
    searchLabel: 'Hae',
    searchPlaceholder: 'Anna teksti hakua varten',
    searchClearButtonAriaLabel: 'Tyhjennä haku',
    searchedWithoutResultsInfo: 'Vaihtoehtoja ei löytynyt haulla "{{value}}".',
    searchWithAnotherTerm: 'Kokeile toisia hakusanoja.',
    searchErrorTitle: 'Emme voineet ladata hakutuloksia.',
    searchErrorText: 'Yritä uudelleen tai, jos ongelma jatkuu, ota yhteyttä asiakaspalveluun.',
    searching: 'Etsitään haulla "{{value}}".',
    searchResults_one: 'Löytyi yksi vaihtoehto hakusanalle "{{value}}".',
    searchResults_multiple: 'Löytyi {{numberIndicator}} vaihtoehtoa hakusanalle "{{value}}".',
  },
  sv: {
    assistive: '',
    clearButtonAriaLabel_one: "Ta bort aktuellt val '{{label}}'.",
    clearButtonAriaLabel_multiple: 'Ta bort alla {{selectionCount}} val.',
    error: '',
    label: '',
    noSelectedOptions: '0 valda alternativ',
    placeholder: 'Välj ett',
    required: 'Obligatoriskt.',
    selectedOptionsCount_zero: '{{selectionCount}} valda alternativ',
    selectedOptionsCount_one: '{{selectionCount}} valt alternativ',
    selectedOptionsCount_multiple: '{{selectionCount}} valda alternativ',
    dropdownButtonAriaLabel: '',
    multiSelectGroupAriaLabel: '{{etikett}} (välj alla)',
    tagsClearAllButton: 'Rensa alla',
    tagsClearAllButtonAriaLabel_one: 'Rensa det valda alternativet "{{label}}".',
    tagsClearAllButtonAriaLabel_multiple: 'Rensa alla {{selectionCount}} valda alternativ.',
    tagsRemaining_one: 'Det finns ett val kvar.',
    tagsRemaining_multiple: 'Det finns {{selectionCount}} val kvar.',
    tagRemoved: "Det valda alternativet '{{value}}' har tagits bort.",
    tagRemoveSelectionAriaLabel: "Ta bort valet '{{label}}'.",
    tagsPartiallyHidden: 'Vissa valda alternativ är nu dolda.',
    tagsShowAllButton: 'Visa alla ({{selectionCount}})',
    tagsShowLessButton: 'Visa mindre',
    // no _one _multiple needed for this. There must be 2+ options if some tags are hidden.
    tagsShowAllButtonAriaLabel: 'Visa alla {{selectionCount}} valda alternativ.',
    tagsShowLessButtonAriaLabel: 'Visa färre alternativ.',
    filterLabel: 'Filtrera',
    filterPlaceholder: 'Skriv text för att filtrera resultat med',
    filterClearButtonAriaLabel: 'Rensa filter',
    filteredWithoutResultsInfo: "Inga alternativ hittades för '{{value}}'.",
    filterWithAnotherTerm: 'Försök med en annan term.',
    filterResults: 'Filtrerade resultat för "{{value}}".',
    filterResultsCount_one: 'Hittade 1 alternativ.',
    filterResultsCount_multiple: 'Hittade {{numberIndicator}} alternativ.',
    choiceCount_one: 'Ett val.',
    choiceCount_multiple: '{{antalIndikator}} val.',
    searchLabel: 'Sök',
    searchPlaceholder: 'Skriv text för att söka resultat med',
    searchClearButtonAriaLabel: 'Rensa sökning',
    searchedWithoutResultsInfo: "Inga alternativ hittades för '{{value}}'.",
    searchWithAnotherTerm: 'Försök med en annan term.',
    searchErrorTitle: 'Vi kunde inte ladda alternativen.',
    searchErrorText: 'Försök igen eller kontakta support om problemet kvarstår.',
    searching: "Söker efter '{{value}}'.",
    searchResults_one: 'Hittade ett alternativ för söktermen "{{value}}".',
    searchResults_multiple: 'Hittade {{numberIndicator}} alternativ för söktermen "{{value}}".',
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
