import { SearchData, SearchMetaData } from '../types';
import { useGenericDataHandlers } from '../../shared';

export function useSearchDataHandlers() {
  return useGenericDataHandlers<SearchData, SearchMetaData>();
}
