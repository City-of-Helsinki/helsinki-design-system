import React, { useEffect, useRef } from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { DivElementProps, SelectDataHandlers } from '../../types';
import { useSelectDataHandlers } from '../../typedHooks';
import useOutsideClick from '../../../../hooks/useOutsideClick';
import { eventIds, eventTypes } from '../../events';

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
  const isOpenRef = useRef(isOpen);
  const callback = (isUpEvent: boolean) => {
    if (!isOpenRef.current) {
      return false;
    }
    if (!isUpEvent) {
      return true;
    }
    outsideClickTrigger();
    return true;
  };

  // in case of a lot of options
  // the list may be rendered slowly
  // and for example select button click may open the menu
  // then outside click immediately opens it.
  // Instead of checking the data.open (which is updated in sync)
  // check the open value after render, which is relevant to the click.
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useOutsideClick({ ref: attr.ref, callback, usePointerDownEvent: true });
  return <div {...attr}>{children}</div>;
};
