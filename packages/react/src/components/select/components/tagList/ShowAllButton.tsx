import React from 'react';

import styles from '../../Select.module.scss';
import { Button, ButtonProps, ButtonVariant } from '../../../button/Button';
import { createOnClickListener } from '../../utils';
import { IconAngleDown } from '../../../../icons';
import { SelectDataHandlers, SelectMetaData } from '../../types';
import { eventIds } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { getTextFromMetaData } from '../../texts';

const showAllButtonPropSetter = (
  dataHandlers: SelectDataHandlers,
): ButtonProps & { buttonRef: SelectMetaData['refs']['showAllButton'] } => {
  const { getMetaData, getData, trigger } = dataHandlers;
  const { disabled } = getData();
  const metaData = getMetaData();
  const { showAllTags, refs, elementIds } = metaData;
  const showText = getTextFromMetaData(showAllTags ? 'tagsShowLessButton' : 'tagsShowAllButton', metaData) as string;
  const ariaLabel = getTextFromMetaData(
    showAllTags ? 'tagsShowLessButtonAriaLabel' : 'tagsShowAllButtonAriaLabel',
    metaData,
  ) as string;
  return {
    ...createOnClickListener({ id: eventIds.showAllButton, trigger }),
    children: showText,
    variant: ButtonVariant.Secondary,
    buttonRef: refs.showAllButton,
    disabled,
    id: elementIds.showAllButton,
    'aria-label': ariaLabel,
  };
};

export function ShowAllButton() {
  const dataHandlers = useSelectDataHandlers();
  const { children, buttonRef, ...attr } = showAllButtonPropSetter(dataHandlers);
  return (
    <Button {...attr} ref={buttonRef} iconEnd={<IconAngleDown className={styles.arrowIcon} />}>
      {children}
    </Button>
  );
}
