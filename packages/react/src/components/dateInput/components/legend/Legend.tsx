import React from 'react';

import { LegendItem } from '../datePicker/types';
import classNames from '../../../../utils/classNames';
import styles from '../datePicker/DatePicker.module.scss';

export type LegendProps = {
  legend: LegendItem[];
};

export const Legend = ({ legend }: LegendProps) => {
  if (legend?.length === 0) return null;

  return (
    <div className={styles['hds-datepicker__legend']}>
      {legend.map((item) => (
        <div key={item.label} className={classNames(styles['hds-datepicker__legend-item'], item.key)}>
          <div className={classNames(styles['hds-datepicker__legend-item--color'], `${item.key}--color`)} />
          <div className={classNames(styles['hds-datepicker__legend-item--title'], `${item.key}--title`)}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};
