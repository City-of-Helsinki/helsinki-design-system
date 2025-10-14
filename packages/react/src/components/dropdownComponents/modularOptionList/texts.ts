import {
  TextKey,
  ModularOptionListProps,
  TextProvider,
  Texts,
  ModularOptionListMetaData,
  ModularOptionListDataHandlers,
  TextInterpolationContent,
  SupportedLanguage,
  TextsWithNumberedVariations,
} from './types';

export const defaultTexts: Record<SupportedLanguage, Texts> = {
  en: {
    assistive: '',
    error: '',
    label: '',
    noSelectedOptions: '0 selected options',
    required: 'Required.',
    selectedOptionsCount_zero: '{{selectionCount}} selected options',
    selectedOptionsCount_one: '{{selectionCount}} selected option',
    selectedOptionsCount_multiple: '{{selectionCount}} selected options',
    selectedOptionsCount_and: 'and',
    selectedOptionsCount_otherOptions: 'other options',
    multiSelectGroupAriaLabel: '{{label}} (choose all)',
    choiceCount_one: 'One choice.',
    choiceCount_multiple: '{{numberIndicator}} choices.',
  },
  fi: {
    assistive: '',
    error: '',
    label: '',
    noSelectedOptions: '0 valittua vaihtoehtoa',
    required: 'Pakollinen.',
    selectedOptionsCount_zero: 'Ei yhtään valittua valittua',
    selectedOptionsCount_one: '{{selectionCount}} valittu vaihtoehto',
    selectedOptionsCount_multiple: '{{selectionCount}} valittua vaihtoehtoa',
    selectedOptionsCount_and: 'ja',
    selectedOptionsCount_otherOptions: 'muuta vaihtoehtoa',
    multiSelectGroupAriaLabel: '{{label}} (valitse kaikki)',
    choiceCount_one: 'Yksi vaihtoehto.',
    choiceCount_multiple: '{{numberIndicator}} vaihtoehtoa.',
  },
  sv: {
    assistive: '',
    error: '',
    label: '',
    noSelectedOptions: '0 valda alternativ',
    required: 'Obligatoriskt.',
    selectedOptionsCount_zero: '{{selectionCount}} valda alternativ',
    selectedOptionsCount_one: '{{selectionCount}} valt alternativ',
    selectedOptionsCount_multiple: '{{selectionCount}} valda alternativ',
    selectedOptionsCount_and: 'och',
    selectedOptionsCount_otherOptions: 'andra alternativ',
    multiSelectGroupAriaLabel: '{{etikett}} (välj alla)',
    choiceCount_one: 'Ett val.',
    choiceCount_multiple: '{{antalIndikator}} val.',
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

const createTextInterpolationContent = (metaData: ModularOptionListMetaData): TextInterpolationContent => {
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

export const createTextProvider = (texts: ModularOptionListProps['texts']): TextProvider => {
  return typeof texts === 'function' ? texts : textObjToTextProvider(texts || {});
};

export const appendTexts = (texts: Partial<ModularOptionListProps['texts']>, metaData: ModularOptionListMetaData) => {
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
  metaData: ModularOptionListMetaData,
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
  metaData: ModularOptionListMetaData,
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

export const getTextFromMetaData = (key: TextKey, metaData: ModularOptionListMetaData): string | undefined => {
  return getTextKey(key, metaData);
};

export const getTextFromDataHandlers = (
  key: TextKey,
  dataHandlers: ModularOptionListDataHandlers,
): string | undefined => {
  return getTextFromMetaData(key, dataHandlers.getMetaData());
};
