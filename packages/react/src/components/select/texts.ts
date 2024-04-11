import { TextKey, Option, SelectProps, TextProvider, Texts, SelectMetaData, SelectDataHandlers } from './types';

export const defaultTextProvider: TextProvider = (id: TextKey, selectedOptions?: Option[]) => {
  switch (id) {
    case 'assistive':
      return '';
    case 'dropdownButtonAriaLabel':
      return selectedOptions && selectedOptions.length ? 'has selected options' : '0 options';
    default:
      return '';
  }
};

// Template style {label}.{options}.{count} {textX}.

export const textObjToTextProvider = (texts: Partial<Texts>): TextProvider => {
  return (id) => {
    return texts[id] || '';
  };
};

export const createTextProvider = (texts: SelectProps['texts']): TextProvider => {
  const provider = typeof texts === 'function' ? texts : textObjToTextProvider(texts || {});
  return (key, selectedOptions) => {
    return provider(key, selectedOptions) || defaultTextProvider(key, selectedOptions);
  };
};

export const getTextKeyFromMetaData = (
  key: TextKey,
  textProvider: TextProvider,
  metaData: SelectMetaData,
): string | undefined => {
  return textProvider(key, metaData.selectedOptions);
};

export const getTextKeyFromDataHandlers = (key: TextKey, dataHandlers: SelectDataHandlers): string | undefined => {
  const metaData = dataHandlers.getMetaData();
  return getTextKeyFromMetaData(key, metaData.textProvider, metaData);
};
