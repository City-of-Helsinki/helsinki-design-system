import React from 'react';

import { IconProps } from './Icon.interface';
import styles from './Icon.module.css';

export const IconPlaybackRewind = ({
  ariaLabel = 'playback-rewind',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M19 5L11 12L19 19V5ZM11 5L3 12L11 19V5Z" fill="currentColor" />
  </svg>
);
