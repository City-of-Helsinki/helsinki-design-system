import React from 'react';

import styles from '../../Select.module.scss';
import { DivElementProps } from '../../../modularOptionList/types';
import classNames from '../../../../../utils/classNames';
import { ButtonWithSelectedOptions } from './ButtonWithSelectedOptions';
import { ClearButton } from './ClearButton';

function createContainerProps(props: Partial<DivElementProps>): DivElementProps {
  return {
    ...props,
    className: classNames(styles.selectedOptionsContainer),
  };
}

export function SelectedOptionsContainer(props: Partial<DivElementProps>) {
  const attr = createContainerProps(props);

  return (
    <div {...attr}>
      <ButtonWithSelectedOptions />
      <ClearButton />
    </div>
  );
}
