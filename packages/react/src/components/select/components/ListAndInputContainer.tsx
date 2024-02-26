import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { DivElementProps, SelectDataHandlers } from '../types';
import { useSelectDataHandlers } from '../typedHooks';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { eventIds, eventTypes } from '../events';

const createListAndInputContainerProps = (
  props: DivElementProps,
  { getData, getMetaData, trigger }: SelectDataHandlers,
) => {
  const { open, showFiltering, showSearch } = getData();
  const { refs } = getMetaData();
  const hasInput = showFiltering || showSearch;
  const outsideClickTrigger = () => {
    trigger({ id: eventIds.generic, type: eventTypes.outSideClick });
  };
  return {
    ...props,
    className: classNames(
      styles.listAndInputContainer,
      open && styles.listAndInputContainerVisible,
      hasInput && styles.withSearchOrFilter,
    ),
    ref: refs.listContainer,
    outsideClickTrigger,
    isOpen: open,
  };
};

export const ListAndInputContainer = (props: DivElementProps) => {
  const { children, outsideClickTrigger, isOpen, ...attr } = createListAndInputContainerProps(
    props,
    useSelectDataHandlers(),
  );
  const callback = () => {
    if (!isOpen) {
      return;
    }
    outsideClickTrigger();
  };

  useOutsideClick({ ref: attr.ref, callback });
  return <div {...attr}>{children}</div>;
};
