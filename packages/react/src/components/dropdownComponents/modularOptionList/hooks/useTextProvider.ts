import { getTextFromDataHandlers } from '../texts';
import { TextKey } from '../types';
import { useModularOptionListDataHandlers } from './useModularOptionListDataHandlers';

export function useTextProvider(key: TextKey) {
  return getTextFromDataHandlers(key, useModularOptionListDataHandlers()) || '';
}
