import { useContextDataHandlers } from '../../../dataProvider/hooks';
import { SearchData, SearchMetaData } from '../types';

export function useSearchDataHandlers() {
  return useContextDataHandlers<SearchData, SearchMetaData>();
}
