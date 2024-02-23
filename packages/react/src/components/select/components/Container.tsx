import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { DivElementProps, SelectMetaData } from '../types';
import { useContextDataHandlers } from '../../dataProvider/hooks';
import { useFocusHandling } from '../useFocusHandling';

export const Container = (props: Partial<DivElementProps>) => {
  const tools = useContextDataHandlers();
  const trackingProps = useFocusHandling(tools);
  const { children, ...rest } = props;
  const id = (tools.getMetaData() as SelectMetaData).elementIds.container;
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div {...rest} {...trackingProps} className={classNames(styles.wrapper)} id={id}>
      {children}
    </div>
  );
};
