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

export const IconCoffeeCupSaucer = ({
  ariaLabel = 'coffee-cup-saucer',
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
      d="M16 5C16.5523 5 17 5.44772 17 6H19C20.6569 6 22 7.79086 22 10C22 12.1302 20.7511 13.8715 19.1763 13.9932L19 14L16.8738 14.0008C16.4295 15.7256 14.8636 17 13 17H8C5.79086 17 4 15.2091 4 13V6C4 5.44772 4.44772 5 5 5H16ZM17 12H19L19.0588 11.9966C19.5837 11.9358 20 11.0651 20 10C20 8.89543 19.5523 8 19 8H17V12ZM2 18H19C19 19.1046 18.1046 20 17 20H4C2.89543 20 2 19.1046 2 18Z"
      fill="currentColor"
    />
  </svg>
);
