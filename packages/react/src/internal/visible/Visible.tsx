import React from 'react';

import styles from './visible.module.scss';
import classNames from '../../utils/classNames';

type Breakpoint = 's' | 'm' | 'l' | 'xl';

type Props = {
  above?: Breakpoint;
  below?: Breakpoint;
  className?: string;
};

const capitalize = (str?: string) => str?.toUpperCase() || '';

export const Visible: React.FC<Props> = ({ above, below, children, className }) => {
  return (
    <div
      className={classNames(
        className,
        above && styles[`above${capitalize(above)}`],
        below && styles[`below${capitalize(below)}`],
      )}
    >
      {children}
    </div>
  );
};
