import React, { createContext, PropsWithChildren, SyntheticEvent, useMemo } from 'react';

import useForceRender from '../../../hooks/useForceRender';
import { createStorage, Storage, StorageData } from '../../group/utils/storage';

export type ChangeEventPayload = { value?: unknown; originalEvent?: SyntheticEvent };
export type ChangeEvent = { id: string; type?: string; payload?: ChangeEventPayload };
export type ChangeHandler<D = StorageData, M = StorageData> = (event: ChangeEvent, tools: Tools<D, M>) => boolean;
export type ChangeTrigger = (event: ChangeEvent) => void;

type DataContextProps<D, M> = {
  dataStorage: Storage;
  metaDataStorage: Storage;
  // must be pure function, will be memoized!
  onChange: (changeEvent: ChangeEvent, tools: Tools<D, M>) => boolean;
  // onSearc
  rerender: () => void;
};

export type Tools<D = StorageData, M = StorageData> = {
  getData: () => D;
  updateData: (newData: Partial<D>) => D;
  getMetaData: () => M;
  updateMetaData: (newData: Partial<M>) => M;
};

type DataContextContent = DataContextProps<StorageData, StorageData> & {
  tools: Tools;
};

export type DataBase = Record<string, unknown>;

export type DataContainerProps<D extends DataBase, M extends DataBase> = {
  initialData: D;
  metaData: M;
  onChange: DataContextProps<D, M>['onChange'];
};

const defaultStorage = createStorage({});
const createTools = (dataStorage: Storage, metaDataStorage: Storage): Tools => {
  return {
    getData: () => dataStorage.get(),
    updateData: (newData: StorageData) => dataStorage.set(newData),
    getMetaData: () => metaDataStorage.get(),
    updateMetaData: (newData: StorageData) => metaDataStorage.set(newData),
  };
};

export const DataContext = createContext<DataContextContent>({
  dataStorage: defaultStorage,
  metaDataStorage: defaultStorage,
  rerender: () => ({}),
  onChange: () => true,
  tools: createTools(defaultStorage, defaultStorage),
});

export default function DataContainer<D extends StorageData, M extends StorageData>({
  children,
  ...rest
}: PropsWithChildren<DataContainerProps<D, M>>) {
  const { initialData, metaData, onChange } = rest;
  const dataStorage = useMemo(() => createStorage(initialData), [initialData]);
  const metaDataStorage = useMemo(() => createStorage(metaData), [metaData]);
  const tools = useMemo(() => createTools(dataStorage, metaDataStorage), [dataStorage, metaDataStorage]);
  const rerender = useForceRender();
  return (
    <DataContext.Provider
      value={{
        dataStorage,
        metaDataStorage,
        rerender,
        // @ts-ignore
        onChange,
        tools,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
