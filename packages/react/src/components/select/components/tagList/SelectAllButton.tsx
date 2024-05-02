import React, { useRef } from 'react';

import styles from '../../Select.module.scss';
import { Button, ButtonProps, ButtonVariant } from '../../../button/Button';
import {
  addOrUpdateScreenReaderNotificationByType,
  createOnClickListener,
  createScreenReaderNotification,
} from '../../utils';
import { IconAngleDown } from '../../../../icons';
import { SelectDataHandlers, SelectMetaData } from '../../types';
import { eventIds } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';

const showAllButtonPropSetter = (
  dataHandlers: SelectDataHandlers,
): ButtonProps & { buttonRef: SelectMetaData['refs']['showAllButton']; isOpen: boolean } => {
  const { getMetaData, getData, trigger } = dataHandlers;
  const { disabled } = getData();
  const { showAllTags, refs, elementIds, selectedOptions } = getMetaData();
  return {
    ...createOnClickListener({ id: eventIds.showAllButton, trigger }),
    children: showAllTags ? 'Show less' : `Show all (${selectedOptions.length})`,
    variant: ButtonVariant.Secondary,
    buttonRef: refs.showAllButton,
    disabled,
    id: elementIds.showAllButton,
    isOpen: showAllTags,
    'aria-label': showAllTags ? 'Show less options' : `Show all ${selectedOptions.length} selected options.`,
  };
};

export function ShowAllButton() {
  const dataHandlers = useSelectDataHandlers();
  const wasOpenRef = useRef(false);
  const { children, buttonRef, isOpen, ...attr } = showAllButtonPropSetter(dataHandlers);
  if (wasOpenRef.current && !isOpen) {
    addOrUpdateScreenReaderNotificationByType(
      createScreenReaderNotification('tagsHidden', 'List of selected options is now partially hidden.'),
      dataHandlers,
    );
  }
  wasOpenRef.current = isOpen;
  return (
    <Button {...attr} ref={buttonRef} iconEnd={<IconAngleDown className={styles.arrowIcon} />}>
      {children}
    </Button>
  );
}
