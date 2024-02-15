import React, { createContext, PropsWithChildren, SyntheticEvent, useMemo } from 'react';
import to from 'await-to-js';

import useForceRender from '../../hooks/useForceRender';
import { createStorage, Storage, StorageData } from './storage';

export type ChangeEventPayload = { value?: unknown; originalEvent?: SyntheticEvent };
export type ChangeEvent = { id: string; type?: string; payload?: ChangeEventPayload };
export type ChangeHandler<D = StorageData, M = StorageData> = (event: ChangeEvent, tools: Tools<D, M>) => boolean;
export type ChangeTrigger = (event: ChangeEvent) => void;
export type AsyncUpdateResult<D, M> = { data?: Partial<D>; metaData?: Partial<M>; render: boolean };

type DataContextProps<D = StorageData, M = StorageData> = {
  dataStorage: Storage;
  metaDataStorage: Storage;
  // must be pure function, will be memoized!
  onChange: (changeEvent: ChangeEvent, tools: Tools<D, M>) => boolean;
  rerender: () => void;
};

// or DataChandlers
export type Tools<D = StorageData, M = StorageData> = {
  getData: () => D;
  updateData: (newData: Partial<D>) => D;
  getMetaData: () => M;
  updateMetaData: (newData: Partial<M>) => M;
  asyncUpdateWithRender: (promise: Promise<AsyncUpdateResult<D, M>>) => void;
  asyncRequestWithTrigger: (promise: Promise<ChangeEvent>) => void;
};

type DataContextContent = DataContextProps<StorageData, StorageData> & {
  tools: Tools;
};

export type DataContainerProps<D extends StorageData, M extends StorageData> = {
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
    asyncUpdateWithRender: () => ({}),
    asyncRequestWithTrigger: () => ({}),
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
  // what if this is called after unmount?
  const rerender = useForceRender();
  const tools = useMemo(() => {
    const toolSet = createTools(dataStorage, metaDataStorage);
    // what if this is called after unmount?
    const asyncUpdateWithRender: Tools['asyncUpdateWithRender'] = async (promise) => {
      const [err, result] = await to(promise);
      if (err) {
        return;
      }
      const { data, metaData: newMetaData, render } = result;
      if (data) {
        toolSet.updateData(data);
      }
      if (newMetaData) {
        toolSet.updateMetaData(newMetaData);
      }
      if (render) {
        rerender();
      }
    };
    toolSet.asyncUpdateWithRender = asyncUpdateWithRender;

    const asyncRequestWithTrigger: Tools['asyncRequestWithTrigger'] = async (promise) => {
      const [err, result] = await to(promise);
      if (err) {
        return;
      }
      if (onChange(result, toolSet as Tools<D, M>)) {
        rerender();
      }
    };
    toolSet.asyncRequestWithTrigger = asyncRequestWithTrigger;
    return toolSet;
  }, [dataStorage, metaDataStorage, rerender]);
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
