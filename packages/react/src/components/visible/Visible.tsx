import classNames from 'classnames';
import React from 'react';

import styles from './visible.module.scss';

type Breakpoint = 's' | 'm' | 'l' | 'xl';

type Props = {
  above?: Breakpoint;
  below?: Breakpoint;
  className?: string;
};

const capitalize = (str?: string) => str?.toUpperCase() || '';

const Visible: React.FC<Props> = ({ above, below, children, className }) => {
  return (
    <div
      className={classNames(className, {
        [styles[`above${capitalize(above)}`]]: above,
        [styles[`below${capitalize(below)}`]]: below,
      })}
    >
      {children}
    </div>
  );
};

export default Visible;
