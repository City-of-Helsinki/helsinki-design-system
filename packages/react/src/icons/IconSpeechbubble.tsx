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

export const IconSpeechbubble = ({
  ariaLabel = 'speechbubble',
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
      d="M19 4H5C2.79086 4 1 5.79086 1 8V16C1 18.2091 2.79086 20 5 20H11C12.0636 20 12.9774 20.3916 13.7929 21.2071L14.5 21.9142L15.2071 21.2071C16.0226 20.3916 16.9364 20 18 20H19C21.2091 20 23 18.2091 23 16V8C23 5.79086 21.2091 4 19 4ZM5 6H19C20.1046 6 21 6.89543 21 8V16C21 17.1046 20.1046 18 19 18H18L17.8158 18.0027C16.5936 18.0387 15.4812 18.4339 14.4995 19.175C13.4698 18.3969 12.2948 18 11 18H5C3.89543 18 3 17.1046 3 16V8C3 6.89543 3.89543 6 5 6Z"
      fill="currentColor"
    ></path>
  </svg>
);
