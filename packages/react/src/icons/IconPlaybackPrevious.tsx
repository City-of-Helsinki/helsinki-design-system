import React from 'react';

import styles from './Icon.module.css';
import { IconProps } from './Icon.interface';

export const IconPlaybackPrevious = ({
  ariaLabel = 'playback-previous',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M5 4V20H7V4H5ZM19 5L7 12L19 19V5Z" fill="currentColor" />
  </svg>
);
