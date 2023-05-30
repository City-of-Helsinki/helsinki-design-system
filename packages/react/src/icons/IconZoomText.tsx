import React from 'react';

import styles from './Icon.module.css';

interface IconProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaHidden?: boolean;
  className?: string;
  color?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  style?: React.CSSProperties;
}

export const IconZoomText = ({
  ariaLabel = 'zoom-text',
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
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 2C19.4183 2 23 5.58172 23 10C23 14.4183 19.4183 18 15 18C13.1298 18 11.4095 17.3583 10.0473 16.283L4.41421 21.9142L3 20.5L8.64217 14.8564C7.61203 13.5098 7 11.8264 7 10C7 5.58172 10.5817 2 15 2ZM15 4C11.6863 4 9 6.68629 9 10C9 13.3137 11.6863 16 15 16C18.3137 16 21 13.3137 21 10C21 6.68629 18.3137 4 15 4ZM16.0646 6.5L18.25 13H16.4491L16.0552 11.7601H13.8604L13.4758 13H11.75L13.9354 6.5H16.0646ZM4.65079 7.5L6.5 13H4.97619L4.64286 11.9509H2.78571L2.46032 13H1L2.84921 7.5H4.65079ZM3.7381 8.91474H3.70635L3.65164 9.15923C3.6376 9.2168 3.62107 9.2813 3.60233 9.34907L3.53968 9.55853L3.16667 10.7428H4.26984L3.89683 9.55853C3.79365 9.24061 3.7381 8.91474 3.7381 8.91474ZM14.9859 8.17197H14.9484L14.8735 8.50268C14.8575 8.5667 14.8392 8.63666 14.8188 8.7094L14.7514 8.9328L14.3106 10.3324H15.6144L15.1735 8.9328C15.0516 8.55708 14.9859 8.17197 14.9859 8.17197Z"
      fill="currentColor"
    />
  </svg>
);
