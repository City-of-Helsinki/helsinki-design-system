import { TextKey } from '../../../types';

export const typeIndicator = '{{type}}';

export const getTextKeyWithType = (key: string, isSearchInput: boolean): TextKey => {
  const inputType = isSearchInput ? 'search' : 'filter';
  return key.replace(typeIndicator, inputType) as TextKey;
};
