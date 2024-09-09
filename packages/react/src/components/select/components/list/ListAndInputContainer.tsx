import React from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { DivElementProps, SelectDataHandlers } from '../../types';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import useOutsideClick from '../../../../hooks/useOutsideClick';
import { eventIds, eventTypes } from '../../events';

const createListAndInputContainerProps = (
  props: DivElementProps,
  { getData, getMetaData, trigger }: SelectDataHandlers,
) => {
  const { open } = getData();
  const { refs, elementIds } = getMetaData();
  const outsideClickTrigger = () => {
    trigger({ id: eventIds.generic, type: eventTypes.outSideClick });
  };
  return {
    ...props,
    className: classNames(styles.listAndInputContainer, open && styles.listAndInputContainerVisible),
    ref: refs.listContainer,
    outsideClickTrigger,
    id: elementIds.selectionsAndListsContainer,
  };
};

export const ListAndInputContainer = (props: DivElementProps) => {
  const { children, outsideClickTrigger, ...attr } = createListAndInputContainerProps(props, useSelectDataHandlers());
  const callback = () => {
    outsideClickTrigger();
  };

  useOutsideClick({ ref: attr.ref, callback });
  return <div {...attr}>{children}</div>;
};
