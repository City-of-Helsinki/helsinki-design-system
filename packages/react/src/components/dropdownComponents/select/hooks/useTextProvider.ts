import { getTextFromDataHandlers } from '../texts';
import { TextKey } from '../types';
import { useSelectDataHandlers } from './useSelectDataHandlers';

export function useTextProvider(key: TextKey) {
  return getTextFromDataHandlers(key, useSelectDataHandlers()) || '';
}
