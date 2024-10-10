import React from 'react';

import styles from '../Select.module.scss';
import { DivElementProps, SelectDataHandlers } from '../types';
import { useFocusHandling } from '../hooks/useFocusHandling';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';
import classNames from '../../../utils/classNames';
import { useKeyboard } from '../hooks/useKeyboard';

function createContainerProps(props: DivElementProps, { getMetaData }: SelectDataHandlers): DivElementProps {
  const { elementIds } = getMetaData();
  return {
    ...props,
    id: elementIds.container,
    className: classNames(styles.wrapper, styles.root),
  };
}

export const Container = (props: Partial<DivElementProps>) => {
  const dataHandlers = useSelectDataHandlers();
  const trackingProps = useFocusHandling();
  const keyTrackingProps = useKeyboard();
  const { children, ...rest } = createContainerProps(props, dataHandlers);
  return (
    <div {...rest} {...trackingProps} {...keyTrackingProps}>
      {children}
    </div>
  );
};
