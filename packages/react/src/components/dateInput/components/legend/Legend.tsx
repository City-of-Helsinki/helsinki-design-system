import React from 'react';

import { LegendItem } from '../datePicker/types';
import styles from '../datePicker/DatePicker.module.scss';
import classNames from '../../../../utils/classNames';

export type LegendProps = {
  legend: LegendItem[];
};

export const Legend = ({ legend }: LegendProps) => {
  if (legend?.length === 0) return null;

  return (
    <div className={styles['hds-datepicker__legend']}>
      {legend.map((item) => (
        <div key={item.elementId} id={item.elementId} className={styles['hds-datepicker__legend-item']}>
          <span
            className={classNames(
              styles['hds-datepicker__legend-item--color'],
              item.selected && styles['hds-datepicker__legend-item--selected'],
              item.relatedClassName,
            )}
          />
          {item.label}
        </div>
      ))}
    </div>
  );
};
