import { useContextDataHandlers } from '../../../dataProvider/hooks';

/**
 * Generic data handlers hook that can be configured for different dropdown components
 * @template TData - The data type for the component (e.g., SearchData, SelectData)
 * @template TMetaData - The metadata type for the component (e.g., SearchMetaData, SelectMetaData)
 */
export function useGenericDataHandlers<TData, TMetaData>() {
  return useContextDataHandlers<TData, TMetaData>();
}
