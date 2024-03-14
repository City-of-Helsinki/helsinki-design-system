import { useContextDataHandlers } from '../../dataProvider/hooks';
import { SelectData, SelectMetaData } from '../types';

export function useSelectDataHandlers() {
  return useContextDataHandlers<SelectData, SelectMetaData>();
}
