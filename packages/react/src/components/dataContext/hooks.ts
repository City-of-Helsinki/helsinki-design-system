import { useContext } from 'react';

import { DataContext, ChangeEvent, ChangeTrigger } from './DataContext';

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

export function useReRender() {
  return useDataContext().rerender();
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
