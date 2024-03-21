import { getTextKeyFromMetaData } from '../texts';
import { TextKey, TextProvider } from '../types';
import { useSelectDataHandlers } from './useSelectDataHandlers';

export function useTextProvider(): TextProvider {
  const { getMetaData } = useSelectDataHandlers();
  const metaData = getMetaData();
  return (key: TextKey) => {
    return getTextKeyFromMetaData(key, metaData.textProvider, metaData);
  };
}
