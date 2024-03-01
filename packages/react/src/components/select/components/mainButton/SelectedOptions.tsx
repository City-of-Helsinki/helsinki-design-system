import React from 'react';

import styles from '../../Select.module.scss';
import { DivElementProps } from '../../types';
import classNames from '../../../../utils/classNames';
import { ButtonWithSelectedOptions } from './ButtonWithSelectedOptions';
import { ArrowButton } from './ArrowButton';
import { ClearButton } from './ClearButton';

function createContainerProps(): DivElementProps {
  return {
    className: classNames(styles.selectedOptionsContainer),
  };
}

export function SelectedOptions() {
  const attr = createContainerProps();

  return (
    <div {...attr}>
      <ButtonWithSelectedOptions />
      <ClearButton />
      <ArrowButton />
    </div>
  );
}
