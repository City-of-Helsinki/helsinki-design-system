import { useContext } from 'react';

import { DataContext, ChangeTrigger, DataContextContent, DataHandlers } from './DataContext';
import { StorageData } from './storage';

export function useDataContext<D = StorageData, M = StorageData>() {
  return (useContext(DataContext) as unknown) as DataContextContent<D, M>;
}

export function useContextDataHandlers<D = StorageData, M = StorageData>() {
  return useDataContext<D, M>().dataHandlers;
}

export function useDataStorage<D = StorageData>() {
  return useDataContext<D>().dataStorage;
}

export function useMetaDataStorage<M = StorageData>() {
  return useDataContext<M, M>().metaDataStorage;
}

export function useChangeTrigger(): ChangeTrigger {
  const { dataHandlers } = useDataContext();
  return dataHandlers.trigger;
}

export function useAsyncChangeTrigger(): DataHandlers['asyncRequestWithTrigger'] {
  const { dataHandlers } = useDataContext();
  return (promise) => dataHandlers.asyncRequestWithTrigger(promise);
}
