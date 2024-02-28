import to from 'await-to-js';
import React, { PropsWithChildren, useEffect, useMemo, useRef } from 'react';

import useForceRender from '../../hooks/useForceRender';
import { DataHandlers, DataContext, createDataHandlers, ChangeEvent } from './DataContext';
import { StorageData, createStorage } from './storage';

export type DataProviderProps<D extends StorageData, M extends StorageData> = {
  initialData: D;
  metaData: M;
  onChange: (changeEvent: ChangeEvent, dataHandlers: DataHandlers<D, M>) => boolean;
};

export function DataProvider<D extends StorageData, M extends StorageData>({
  children,
  ...rest
}: PropsWithChildren<DataProviderProps<D, M>>) {
  const { initialData, metaData, onChange } = rest;
  const memoizedOnChange: DataProviderProps<D, M>['onChange'] = useMemo(() => onChange, []);
  const dataStorage = useMemo(() => createStorage(initialData), [initialData]);
  const metaDataStorage = useMemo(() => createStorage(metaData), [metaData]);
  const rerender = useForceRender();
  const isComponentUnmounted = useRef(false);
  const dataHandlers = useMemo(() => {
    const handlers = createDataHandlers(dataStorage, metaDataStorage);
    const asyncRequestWithTrigger: DataHandlers['asyncRequestWithTrigger'] = async (promise) => {
      const [err, result] = await to(promise);
      if (err) {
        return;
      }
      if (isComponentUnmounted.current) {
        return;
      }
      handlers.trigger(result);
    };
    handlers.trigger = (e) => {
      if (memoizedOnChange(e, handlers as DataHandlers<D, M>)) {
        rerender();
      }
    };
    handlers.asyncRequestWithTrigger = asyncRequestWithTrigger;
    return handlers;
  }, [dataStorage, metaDataStorage, rerender, memoizedOnChange]);

  useEffect(() => {
    return () => {
      isComponentUnmounted.current = true;
    };
  }, []);

  return (
    <DataContext.Provider
      value={{
        dataStorage,
        metaDataStorage,
        dataHandlers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
