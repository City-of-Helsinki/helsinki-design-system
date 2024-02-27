import { useRef } from 'react';

import { Group, SelectProps, Option } from './types';
import { iterateAndCopyGroup, OptionIterator, propsToGroups } from './utils';

type SelectionHistory = Array<{ options: Required<Option>[]; clickedOption: Required<Option> | undefined }>;

export function useExternalGroupStorage(props: Pick<SelectProps, 'groups' | 'options'>) {
  const storage = useRef<Group[] | null>(null);
  // https://react.dev/reference/react/useRef#avoiding-recreating-the-ref-contents
  if (storage.current === null) {
    storage.current = propsToGroups(props) || [];
  }

  const getStorage = () => {
    return storage.current as Group[];
  };

  return {
    get: () => {
      return getStorage();
    },
    getAsProp: () => {
      const current = getStorage();
      return current.map((group) => {
        const { label } = group.options[0];
        const options = group.options.slice(1);
        return {
          label,
          options,
        };
      });
    },
    update: (newGroups: Group[], iterator: OptionIterator) => {
      storage.current = iterateAndCopyGroup(newGroups, iterator);
    },
  };
}

export function useSelectionHistory() {
  const history = useRef<SelectionHistory | null>(null);

  const getHistory = () => {
    // https://react.dev/reference/react/useRef#avoiding-recreating-the-ref-contents
    if (history.current === null) {
      history.current = [];
    }
    return history.current as SelectionHistory;
  };
  const getLatest = () => {
    const current = getHistory();
    return current[current.length - 1] || {};
  };

  return {
    add: (selections: Required<Option>[], clickedOption?: Required<Option>) => {
      getHistory().push({
        options: selections.map((opt) => ({ ...opt })),
        clickedOption: clickedOption ? { ...clickedOption } : undefined,
      });
    },
    getAll: () => getHistory(),
    getLatest,
    getLatestValues: () => {
      const latest = getLatest().options;
      return latest && latest.length ? latest.map((opt) => opt.value) : [];
    },
    filterNewSelections: (list: string[]): string[] => {
      const latest = getLatest().options;
      if (!latest || !latest.length) {
        return list;
      }
      return list.filter((selectedValue) => latest.findIndex((opt) => opt.value === selectedValue) === -1);
    },
  };
}
