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

export const IconRestaurant = ({
  ariaLabel = 'restaurant',
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
      d="M10.9911 4.085C11.3531 4.085 11.6523 4.35399 11.6996 4.70298L11.7061 4.8V7.8C11.7061 9.04864 10.8632 10.1004 9.71538 10.4173L9.71467 13.3005C9.86178 13.4508 9.96187 13.6473 9.99115 13.8662L10 14V19C10 19.5523 9.55232 20 9.00003 20C8.44775 20 8.00003 19.5523 8.00003 19V14C8.00003 13.7277 8.10886 13.4808 8.2854 13.3005L8.2854 10.4224C7.17931 10.1254 6.3521 9.14735 6.28108 7.96539L6.27612 7.8V4.8C6.27612 4.40512 6.59624 4.085 6.99112 4.085C7.3531 4.085 7.65225 4.35399 7.6996 4.70298L7.70612 4.8V7.8H8.28412L8.28503 4.8C8.28503 4.40512 8.60515 4.085 9.00003 4.085C9.36201 4.085 9.66116 4.35399 9.70851 4.70298L9.71503 4.8L9.71412 7.8H10.2761V4.8C10.2761 4.40512 10.5962 4.085 10.9911 4.085ZM18 19C18 19.5523 17.5523 20 17 20C16.4477 20 16 19.5523 16 19L15.999 12.5L14.9653 12.2423C14.4676 12.1185 14.151 11.6416 14.2154 11.1451L14.2371 11.0304L15.7544 4.97128C15.8973 4.40042 16.4103 4 16.9988 4C17.5523 4 18 4.44772 18 5V19Z"
      fill="currentColor"
    />
  </svg>
);
