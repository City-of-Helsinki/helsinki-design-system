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
