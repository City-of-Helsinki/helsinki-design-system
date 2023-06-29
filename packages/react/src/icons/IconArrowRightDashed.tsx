import React from 'react';

import { IconProps } from './Icon.interface';
import styles from './Icon.module.css';

export const IconArrowRightDashed = ({
  ariaLabel = 'arrow-right-dashed',
  ariaLabelledby,
  ariaHidden = true,
  className = '',
  color,
  size = 's',
  style = {},
}: React.SVGProps<SVGSVGElement> & IconProps) => (
  <svg
    className={[styles.icon, styles[size], className].filter((e) => e).join(' ')}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
    aria-hidden={ariaHidden}
    color={color}
    style={style}
  >
    <path d="M14 5.5L12.5 7L17.5 12L12.5 17L14 18.5L20.5 12L14 5.5Z" fill="currentColor" />
    <path d="M15.5 13L16.5 12L15.5 11H14V13H15.5Z" fill="currentColor" />
    <path d="M10 11H12V13H10V11Z" fill="currentColor" />
    <path d="M8 13V11H6V13H8Z" fill="currentColor" />
  </svg>
);
