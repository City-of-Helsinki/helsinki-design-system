import React from 'react';

import styles from '../../Table.module.scss';
import classNames from '../../../../utils/classNames';

export type TableBodyProps = {
  children: React.ReactNode;
  textAlignContentRight?: boolean;
};

export const TableBody = ({ children, textAlignContentRight }: TableBodyProps) => {
  return (
    <tbody className={classNames(styles.content, textAlignContentRight && styles.textAlignContentRight)}>
      {children}
    </tbody>
  );
};
