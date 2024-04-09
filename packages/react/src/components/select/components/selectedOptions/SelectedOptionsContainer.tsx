import React from 'react';

import styles from '../../Select.module.scss';
import { DivElementProps } from '../../types';
import classNames from '../../../../utils/classNames';

function createContainerProps(props: Partial<DivElementProps>): DivElementProps {
  return {
    ...props,
    className: classNames(styles.selectedOptionsContainer),
  };
}

export function SelectedOptionsContainer(props: Partial<DivElementProps>) {
  const attr = createContainerProps(props);

  return <div {...attr}>{props.children}</div>;
}
