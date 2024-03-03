import React from 'react';

import { Button, ButtonProps } from '../../../button/Button';
import { getSelectedOptions, createOnClickListener } from '../../utils';
import { IconAngleDown } from '../../../../icons';
import { SelectMetaData } from '../../types';
import { eventIds } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';

const showAllButtonPropSetter = (): ButtonProps & { buttonRef: SelectMetaData['refs']['showAllButton'] } => {
  const { getMetaData, getData, trigger } = useSelectDataHandlers();
  const { groups, disabled } = getData();
  const { showAllTags, refs, elementIds } = getMetaData();
  const selectedOptions = getSelectedOptions(groups);
  return {
    ...createOnClickListener({ id: eventIds.showAllButton, trigger }),
    children: showAllTags ? (
      'Show less'
    ) : (
      <>
        Show all (<span className="count">{selectedOptions.length}</span>)
      </>
    ),
    variant: 'secondary',
    buttonRef: refs.showAllButton,
    disabled,
    id: elementIds.showAllButton,
  };
};

export function ShowAllButton() {
  const { children, buttonRef, ...attr } = showAllButtonPropSetter();
  return (
    <Button {...attr} ref={buttonRef} iconRight={<IconAngleDown />}>
      {children}
    </Button>
  );
}
