import { CSSProperties } from 'react';

export type IconProps = {
  /**
   * Icon size
   */
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  /**
   * Additional class names to apply to the icon
   */
  className?: string;
  /**
   * Override or extend the styles applied to the icon
   */
  style?: CSSProperties;
};
