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

export const IconMicrophoneCrossed = ({
  ariaLabel = 'microphone-crossed',
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
      d="M19 11.5C19 15.0261 16.3928 17.9433 13.001 18.429L12.9999 21H16V23H8.00001V21H10.9999L11 18.4291C10.478 18.3544 9.97454 18.2222 9.49633 18.039L11.1141 16.4218C11.4016 16.4732 11.6977 16.5 12 16.5C14.6888 16.5 16.8818 14.3777 16.9954 11.7169L17 11.5H19ZM19.7929 2.79289L21.2071 4.20711L4.70712 20.7071L3.29291 19.2929L19.7929 2.79289ZM7.00001 11.5C7.00001 12.0885 7.10169 12.6533 7.28843 13.1777L5.76994 14.6948C5.31222 13.804 5.03994 12.8023 5.00407 11.7407L5.00001 11.5H7.00001ZM12 1C13.6569 1 15 2.34315 15 4V5.463L8.99997 11.464V4C8.99997 2.34315 10.3432 1 12 1Z"
      fill="currentColor"
    ></path>
  </svg>
);
