import React, { useCallback } from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { SelectDataHandlers } from '../types';
import { DivElementProps } from '../../modularOptionList/types';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { eventIds, eventTypes } from '../events';
import { countVisibleOptions } from '../utils';
import { getVisibleGroupLabels } from '../../modularOptionList/utils';
import { getNumberedVariationsTextKey, getTextFromDataHandlers } from '../texts';

const createListAndInputContainerProps = (props: DivElementProps, dataHandlers: SelectDataHandlers) => {
  const { getData, getMetaData, trigger } = dataHandlers;
  const { open, groups, multiSelect } = getData();
  const metaData = getMetaData();
  const { refs, elementIds, listInputType } = metaData;
  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
  const hasInput = !!listInputType;
  const label = getTextFromDataHandlers('label', dataHandlers);
  const ariaLabel =
    multiSelect && hasVisibleGroupLabels && !hasInput
      ? `${label}. ${getNumberedVariationsTextKey('choiceCount', metaData, 'numberIndicator', {
          numberIndicator: countVisibleOptions(groups),
        })}`
      : label;
  const outsideClickTrigger = useCallback(() => {
    if (!open) {
      return;
    }
    trigger({ id: eventIds.generic, type: eventTypes.outSideClick });
  }, [open, trigger]);
  return {
    ...props,
    className: classNames(
      styles.listAndInputContainer,
      open && styles.listAndInputContainerVisible,
      hasInput && styles.withSearchOrFilter,
    ),
    ref: refs.listContainer,
    outsideClickTrigger,
    id: elementIds.selectionsAndListsContainer,
    'aria-hidden': !open,
    ...((hasInput || (multiSelect && hasVisibleGroupLabels)) && { role: 'dialog', 'aria-label': ariaLabel }),
    open,
  };
};

export const ListAndInputContainer = (props: DivElementProps) => {
  const { children, outsideClickTrigger, ...attr } = createListAndInputContainerProps(props, useSelectDataHandlers());
  const callback = () => {
    outsideClickTrigger();
  };

  useOutsideClick({ ref: attr.ref, callback });

  return <div {...attr}>{attr.open && children}</div>;
};
