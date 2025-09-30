import { useContextDataHandlers } from '../../../dataProvider/hooks';
import { ModularOptionListData, ModularOptionListMetaData } from '../types';

export function useModularOptionListDataHandlers() {
  return useContextDataHandlers<ModularOptionListData, ModularOptionListMetaData>();
}
