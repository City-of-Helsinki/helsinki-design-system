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

export const IconScrollGroup = ({
  ariaLabel = 'scroll-group',
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
      d="M2 11C2 13.2091 3.79086 15 6 15H22V5H10C10 2.79086 8.20914 1 6 1C3.79086 1 2 2.79086 2 5V11ZM20 7H10L7.41421 9.58579C7.05228 9.22386 6.55228 9 6 9C4.89543 9 4 9.89543 4 11C4 12.1046 4.89543 13 6 13H20V7ZM6 3C7.10457 3 8 3.89543 8 5V7.53513C7.41165 7.19479 6.72857 7 6 7C5.27143 7 4.58835 7.19479 4 7.53513V5C4 3.89543 4.89543 3 6 3Z"
      fill="currentColor"
    ></path>
    <path
      d="M2 14C2.00026 16.2089 3.79102 17.9995 6 17.9995H22V15.9995H6C4.3644 15.9995 2.91223 15.2142 2 14Z"
      fill="currentColor"
    ></path>
    <path
      d="M6 20.9995C3.79102 20.9995 2.00026 19.2089 2 17C2.91223 18.2142 4.3644 18.9995 6 18.9995H22V20.9995H6Z"
      fill="currentColor"
    ></path>
  </svg>
);
