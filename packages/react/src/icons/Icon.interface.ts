import { CSSProperties, SVGAttributes } from 'react';

export enum IconSize {
  ExtraSmall = 'extraSmall',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  ExtraLarge = 'extraLarge',
}

export type IconProps = SVGAttributes<SVGElement> & {
  /**
   * Icon size
   */
  size?: IconSize;
  style?: CSSProperties;
};
