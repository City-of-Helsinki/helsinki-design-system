import { CSSProperties, SVGAttributes } from 'react';

export type IconProps = SVGAttributes<SVGElement> & {
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaHidden?: boolean;
  className?: string;
  color?: string;
  /**
   * Icon size
   */
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  style?: CSSProperties;
};
