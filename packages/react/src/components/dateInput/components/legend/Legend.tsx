import React from 'react';

import { LegendItem } from '../datePicker/types';
import styles from '../datePicker/DatePicker.module.scss';

export type LegendProps = {
  legend: LegendItem[];
};

export const Legend = ({ legend }: LegendProps) => {
  if (legend?.length === 0) return null;

  return (
    <div className={styles['hds-datepicker__legend']}>
      {legend.map((item) => (
        <div key={item.id} id={item.id} className={styles['hds-datepicker__legend-item']}>
          <span className={styles['hds-datepicker__legend-item--color']} style={{ backgroundColor: item.color }} />
          {item.label}
        </div>
      ))}
    </div>
  );
};
