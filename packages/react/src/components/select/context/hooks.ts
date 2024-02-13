import { useContext } from 'react';

import { DataBase, DataContext, ChangeEvent, ChangeTrigger } from './DataContext';

export function useDataContext() {
  return useContext(DataContext);
}

export function useDataStorage() {
  return useDataContext().dataStorage;
}

export function useContextTools() {
  return useDataContext().tools;
}

export function useMetaDataStorage() {
  return useDataContext().metaDataStorage;
}

export function updateData(props: DataBase) {
  const context = useDataContext();
  const newData = context.dataStorage.set(props);
  context.rerender();
  return newData;
}

export function updateMetaData(props: DataBase) {
  return useDataContext().metaDataStorage.set(props);
}

export function useChangeTrigger(): ChangeTrigger {
  const { onChange, tools, rerender } = useDataContext();
  // create update functions to check did data storage change.
  // if update functions is called with groups -> notify
  // if search var changed -> onSearch
  // if filter var changed -> Filter + update groups
  return (event: ChangeEvent) => {
    const shouldRerender = onChange(event, tools);
    if (shouldRerender) {
      rerender();
    }
  };
}
