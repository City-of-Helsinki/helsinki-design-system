import { SVGAttributes } from 'react';

export type IconProps = SVGAttributes<SVGElement> & {
  /**
   * Icon size
   */
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
};
