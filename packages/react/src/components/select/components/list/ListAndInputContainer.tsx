import React, { useCallback } from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { DivElementProps, SelectDataHandlers } from '../../types';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import useOutsideClick from '../../../../hooks/useOutsideClick';
import { eventIds, eventTypes } from '../../events';
import { countVisibleOptions, getVisibleGroupLabels } from '../../utils';
import { getTextKeyFromDataHandlers } from '../../texts';

const createListAndInputContainerProps = (props: DivElementProps, dataHandlers: SelectDataHandlers) => {
  const { getData, getMetaData, trigger } = dataHandlers;
  const { open, groups, multiSelect } = getData();
  const { refs, listInputType } = getMetaData();
  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
  const hasInput = !!listInputType;
  const label = getTextKeyFromDataHandlers('label', dataHandlers);
  const ariaLabel =
    multiSelect && hasVisibleGroupLabels && !hasInput ? `${label}. ${countVisibleOptions(groups)} choices.` : label;
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
    'aria-hidden': !open,
    ...((hasInput || hasVisibleGroupLabels) && { role: 'dialog', 'aria-label': ariaLabel }),
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
