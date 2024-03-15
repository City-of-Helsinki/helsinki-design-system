import React from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { DivElementProps } from '../../types';
import { ClearAllButton } from './ClearAllButton';
import { ShowAllButton } from './SelectAllButton';

function createButtonContainerProps(): DivElementProps {
  return {
    className: classNames(styles.tagListButtons),
  };
}

export function TagListButtons() {
  return (
    <div {...createButtonContainerProps()}>
      <ShowAllButton />
      <ClearAllButton />
    </div>
  );
}
