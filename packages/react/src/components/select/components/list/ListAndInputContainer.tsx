import React from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { DivElementProps, SelectDataHandlers } from '../../types';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import useOutsideClick from '../../../../hooks/useOutsideClick';
import { eventIds, eventTypes } from '../../events';
import { countVisibleOptions, getVisibleGroupLabels } from '../../utils';
import { getTextKey } from '../../texts';

const createListAndInputContainerProps = (props: DivElementProps, dataHandlers: SelectDataHandlers) => {
  const { getData, getMetaData, trigger } = dataHandlers;
  const { open, groups, multiSelect } = getData();
  const metaData = getMetaData();
  const { refs, elementIds, listInputType } = metaData;
  const hasInput = !!listInputType;
  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
  const getAriaLabel = () => {
    const label = getTextKey('label', metaData);
    if (multiSelect && hasVisibleGroupLabels && !hasInput) {
      return getTextKey('ariaLabelForListWhenRoleIsDialog', metaData, {
        numberOfVisibleOptions: countVisibleOptions(groups),
        label,
      });
    }
    return label;
  };
  const ariaLabel = getAriaLabel();
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
    id: elementIds.selectionsAndListsContainer,
    ...((hasInput || (multiSelect && hasVisibleGroupLabels)) && { role: 'dialog', 'aria-label': ariaLabel }),
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
