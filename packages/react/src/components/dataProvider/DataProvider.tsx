import to from 'await-to-js';
import React, { PropsWithChildren, useCallback, useEffect, useMemo, useRef } from 'react';

import useForceRender from '../../hooks/useForceRender';
import { DataHandlers, DataContext, createDataHandlers, ChangeEvent } from './DataContext';
import { StorageData, createStorage } from './storage';

export type DataProviderProps<D extends StorageData, M extends StorageData> = {
  initialData: D;
  metaData: M;
  onChange: (changeEvent: ChangeEvent, dataHandlers: DataHandlers<D, M>) => boolean;
  onReset?: (props: { previousData?: D; currentData?: D; previousMetaData?: M; currentMetaData?: M }) => Partial<D & M>;
};

export function DataProvider<D extends StorageData, M extends StorageData>({
  children,
  ...rest
}: PropsWithChildren<DataProviderProps<D, M>>) {
  const { initialData, metaData, onChange, onReset } = rest;
  const memoizedOnChange: DataProviderProps<D, M>['onChange'] = useMemo(() => onChange, []);
  // store refs to the stores, so onReset can get previous versions
  const storageRefs = useRef({ dataStorage: undefined, metaDataStorage: undefined });
  const getPreviousVersion = useCallback((shouldUseData: boolean) => {
    const source = shouldUseData
      ? storageRefs.current && storageRefs.current.dataStorage
      : storageRefs.current && storageRefs.current.metaDataStorage;
    return source ? source.get() : undefined;
  }, []);

  const dataStorage = useMemo(() => {
    const previousData = getPreviousVersion(true);
    const resettedData = onReset && previousData ? onReset({ previousData, currentData: initialData }) : initialData;
    return createStorage(resettedData);
  }, [initialData]);

  const metaDataStorage = useMemo(() => {
    const previousMetaData = getPreviousVersion(false);
    const resettedData =
      onReset && previousMetaData ? onReset({ previousMetaData, currentMetaData: metaData }) : metaData;
    return createStorage(resettedData);
  }, [metaData]);
  // if onReset is not provided, no need to store anything extra
  storageRefs.current = onReset ? { dataStorage, metaDataStorage } : undefined;
  const rerender = useForceRender();
  const isMountedRef = useRef(true);

  const dataHandlers = useMemo(() => {
    const handlers = createDataHandlers(dataStorage, metaDataStorage);
    const asyncRequestWithTrigger: DataHandlers['asyncRequestWithTrigger'] = async (promise) => {
      const [err, result] = await to(promise);
      if (err) {
        return;
      }
      // Check if component is still mounted when async operation completes
      if (!isMountedRef.current) {
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
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
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
