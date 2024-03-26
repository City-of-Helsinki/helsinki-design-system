import { useCallback, useMemo, useRef } from 'react';

import { Group, SelectProps, Texts } from '../types';
import { iterateAndCopyGroup, OptionIterator, propsToGroups } from '../utils';

type StorageProps = SelectProps & { updateKey?: string };

export function useSelectStorage(props: StorageProps) {
  const propsStorage = useRef<StorageProps>({ onChange: () => ({}) });
  const groupsStorage = useRef<Group[]>([]);

  useMemo(() => {
    propsStorage.current = {
      ...propsStorage.current,
      ...props,
    };
    groupsStorage.current = propsToGroups({ options: props.options, groups: props.groups }) || [];
    return propsStorage;
  }, [props.updateKey]);

  const onChange: SelectProps['onChange'] = useCallback(
    (selectedOptions, clickedOption, data) => {
      const newProps =
        propsStorage.current.onChange && propsStorage.current.onChange(selectedOptions, clickedOption, data);
      if (newProps) {
        const { groups, options, ...rest } = newProps;
        propsStorage.current = {
          ...propsStorage.current,
          ...rest,
        };
        if (groups || options) {
          groupsStorage.current = propsToGroups({ options, groups }) || [];
        }
      }
      return newProps;
    },
    [propsStorage.current.onChange],
  );

  return {
    getProps: (): SelectProps => {
      return { ...propsStorage.current, groups: groupsStorage.current, onChange };
    },
    updateAllOptions: (iterator: OptionIterator) => {
      groupsStorage.current = iterateAndCopyGroup(groupsStorage.current, iterator);
    },
    updateGroups: (groups: Group[]) => {
      groupsStorage.current = groups;
    },
    getGroups: () => {
      return groupsStorage.current;
    },
    updateTexts: (texts: Partial<Texts>) => {
      if (!texts) {
        //
      }
    },
    updateProps: (newProps: Partial<SelectProps>) => {
      propsStorage.current = {
        ...propsStorage.current,
        ...newProps,
      };
    },
    getUpdateKey: () => {
      return props.updateKey;
    },
  };
}
