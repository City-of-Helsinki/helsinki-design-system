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

export const IconPodcast = ({
  ariaLabel = 'podcast',
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
      d="M9.00001 24V22H10.999L10.9992 19.9169C8.23377 19.4526 6.10998 17.0965 6.00415 14.2249L6.00001 14H8.00001C8.00001 16.2091 9.79087 18 12 18C14.1422 18 15.8911 16.316 15.9951 14.1996L16 14H18C18 16.9731 15.8376 19.4411 12.9998 19.9171L12.999 22H15V24H9.00001ZM16.0596 4.58174L16.2427 4.75736L14.8284 6.17157C13.3184 4.66155 10.9014 4.61121 9.33095 6.02057L9.17158 6.17157L7.75737 4.75736C10.0404 2.47429 13.7056 2.41575 16.0596 4.58174ZM12 7C13.1046 7 14 7.89543 14 9V14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14V9C10 7.89543 10.8954 7 12 7ZM18.1547 2.43334L18.364 2.63604L16.9498 4.05025C14.2782 1.37871 9.98452 1.31799 7.23924 3.8681L7.05026 4.05025L5.63605 2.63604C9.08185 -0.809764 14.6266 -0.877328 18.1547 2.43334Z"
      fill="currentColor"
    />
  </svg>
);
