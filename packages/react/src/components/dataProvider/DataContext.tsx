import { createContext, SyntheticEvent } from 'react';

import { createStorage, Storage, StorageData } from './storage';

export type ChangeEventPayload = { value?: unknown; originalEvent?: SyntheticEvent };
export type ChangeEvent<I = string, T = string> = { id: I; type?: T; payload?: ChangeEventPayload };
export type ChangeHandler<D = StorageData, M = StorageData> = (
  event: ChangeEvent,
  dataHandlers: DataHandlers<D, M>,
) => boolean;
export type ChangeTrigger = (event: ChangeEvent) => void;

export type DataContextProps<D = StorageData, M = StorageData> = {
  dataStorage: Storage<D>;
  metaDataStorage: Storage<M>;
};

export type DataHandlers<D = StorageData, M = StorageData> = {
  getData: () => D;
  updateData: (newData: Partial<D>) => D;
  getMetaData: () => M;
  updateMetaData: (newData: Partial<M>) => M;
  asyncRequestWithTrigger: (promise: Promise<ChangeEvent>) => void;
  trigger: ChangeTrigger;
};

export type DataContextContent<D = StorageData, M = StorageData> = DataContextProps<D, M> & {
  dataHandlers: DataHandlers<D, M>;
};

const defaultStorage = createStorage({});

export const createDataHandlers = (dataStorage: Storage, metaDataStorage: Storage): DataHandlers => {
  return {
    getData: () => dataStorage.get(),
    updateData: (newData: StorageData) => dataStorage.set(newData),
    getMetaData: () => metaDataStorage.get(),
    updateMetaData: (newData: StorageData) => metaDataStorage.set(newData),
    asyncRequestWithTrigger: () => ({}),
    trigger: () => ({}),
  };
};

export const DataContext = createContext<DataContextContent>({
  dataStorage: defaultStorage,
  metaDataStorage: defaultStorage,
  dataHandlers: createDataHandlers(defaultStorage, defaultStorage),
});
