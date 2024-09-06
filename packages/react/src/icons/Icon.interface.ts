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
   * @deprecated Will be replaced in the next major release with "aria-label"
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ariaLabel?: string;
  /**
   * @deprecated Will be replaced in the next major release with "aria-labelledby"
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ariaLabelledby?: string;
  /**
   * @deprecated Will be replaced in the next major release with "aria-hidden"
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ariaHidden?: boolean;
  className?: string;
  color?: string;
  /**
   * Icon size
   */
  size?: IconSize;
  style?: CSSProperties;
};
