import { useCallback, useMemo, useRef } from 'react';

import useForceRender from '../../../../hooks/useForceRender';
import { Group, ModularOptionListProps, Texts, SupportedLanguage } from '../types';
import { iterateAndCopyGroup, OptionIterator, propsToGroups } from '../utils';

export type ModularOptionListStorageProps = Omit<ModularOptionListProps, 'value'> & {
  updateKey?: string;
};

/**
 * useModularOptionListStorage helps users to memoize data and selections. Also to selectively update data.
 * ModularOptionList itself should not have more props like "updatedData" etc, so better to make this component storage.
 * This hook outputs props whose refs do not change, so it reduces re-renders and data loss.
 * The storage can be updated by (re)setting the "updateKey" prop.
 * @param props
 * @returns
 */

export function useModularOptionListStorage(props: ModularOptionListStorageProps) {
  const { updateKey, ...restProps } = props;
  const reRender = useForceRender();
  const propsStorage = useRef<ModularOptionListStorageProps>({ onChange: () => ({}) });
  const groupsStorage = useRef<Group[]>([]);
  const onChangeInProps = useRef<ModularOptionListStorageProps['onChange']>();
  onChangeInProps.current = restProps.onChange;

  useMemo(() => {
    propsStorage.current = {
      ...propsStorage.current,
      ...restProps,
    };
    groupsStorage.current = propsToGroups({ options: restProps.options, groups: restProps.groups }) || [];
    return propsStorage;
  }, [updateKey]);

  // The memoization in the ModularOptionList will lose object ref and recreate all memoized props if groupsStorage.current changes
  // This will for example close menu when selecting multiselect items and parent component is re-rendered.
  // This function keeps the ref and only updates it.
  const updateGropsStorageWhileKeepingSameObjectRef = useCallback(
    (newGroups: Group[]) => {
      groupsStorage.current.length = 0;
      newGroups.forEach((g) => {
        groupsStorage.current.push(g);
      });
    },
    [groupsStorage.current],
  );

  // groups / options cannot be set via this?? Document it!
  // or add it here if found
  const updateProps = (newProps: Partial<ModularOptionListProps>) => {
    // this loses ref? Might be necessary for re-render... keep
    propsStorage.current = {
      ...propsStorage.current,
      ...newProps,
    };
  };

  const updateTexts = (texts: Partial<Texts>, language?: SupportedLanguage) => {
    const currentTexts = propsStorage.current.texts || {};
    // do not override if a function has been assigned.
    // Texts should come from there and users know it if docs have been read.
    if (typeof propsStorage.current.texts !== 'function') {
      const newTexts = language ? { ...texts, language } : texts;
      updateProps({ texts: { ...currentTexts, ...newTexts } });
    }
  };

  const onChange: ModularOptionListProps['onChange'] = useCallback(
    (selectedOptions, clickedOption, data) => {
      const newProps = onChangeInProps.current(selectedOptions, clickedOption, data);
      updateGropsStorageWhileKeepingSameObjectRef(iterateAndCopyGroup(data.groups, (o) => o));
      if (newProps) {
        const { groups, options, ...rest } = newProps;
        propsStorage.current = {
          ...propsStorage.current,
          ...rest,
        };
        if (groups || options) {
          updateGropsStorageWhileKeepingSameObjectRef(propsToGroups({ options, groups }) || []);
        }
      }
      return newProps;
    },
    [updateGropsStorageWhileKeepingSameObjectRef],
  );

  return {
    // get props for the component
    getProps: (): ModularOptionListProps => {
      return { ...propsStorage.current, groups: groupsStorage.current, onChange };
    },
    // the given iterator is called once for each options and returned option overwrites the old one
    updateAllOptions: (iterator: OptionIterator) => {
      // this loses ref? Might be necessary for re-render
      // or use updateGropsStorageWhileKeepingSameObjectRef(iterateAndCopyGroup(data.groups, (o) => o));
      groupsStorage.current = iterateAndCopyGroup(groupsStorage.current, iterator);
    },
    setError: (textOrInvalid: string | boolean) => {
      const invalid = !!textOrInvalid;
      if (typeof textOrInvalid !== 'boolean') {
        updateTexts({ error: textOrInvalid });
      }
      updateProps({ invalid });
    },
    setDisabled: (disabled: boolean) => {
      updateProps({ disabled });
    },
    setInvalid: (invalid: boolean) => {
      updateProps({ invalid });
    },
    updateTexts,
    render: () => {
      reRender();
    },
  };
}
