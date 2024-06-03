import { CSSProperties, SVGAttributes } from 'react';

export enum IconSize {
  ExtraSmall = 'extraSmall',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  ExtraLarge = 'extraLarge',
}

export type IconProps = SVGAttributes<SVGElement> & {
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaHidden?: boolean;
  className?: string;
  color?: string;
  /**
   * Icon size
   */
  size?: IconSize;
  style?: CSSProperties;
};
