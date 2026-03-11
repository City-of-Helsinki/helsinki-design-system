import { SelectData, SelectMetaData } from '../types';
import { useGenericDataHandlers } from '../../shared';

export function useSelectDataHandlers() {
  return useGenericDataHandlers<SelectData, SelectMetaData>();
}
