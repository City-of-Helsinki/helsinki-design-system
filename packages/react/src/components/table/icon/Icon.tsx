import React from 'react';
import classNames from 'classnames';

import AngleLeft from '../../../icons/IconArrowLeft';
import AngleDown from '../../../icons/IconArrowRight';
import styles from './icon.module.scss';

const icons = {
  AngleDown,
  AngleLeft,
};

export type IconNames = keyof typeof icons;
export interface IconProps {
  outlined?: boolean;
  name: IconNames;
  width?: string;
  height?: string;
  size?: 'small' | 'standard' | 'large';
  color?: 'standard' | 'brand' | 'critical' | 'secondary' | 'info';
}

const Icon: React.SFC<IconProps> = ({ outlined, name, color = 'standard', size = 'standard' }) => {
  const SvgIcon = icons[name];

  return (
    <div
      className={classNames(styles.icon, styles[size], styles[color], {
        [styles.outlined]: outlined,
      })}
    >
      <SvgIcon />
    </div>
  );
};

export default Icon;
