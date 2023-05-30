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

export const IconArrowRedo = ({
  ariaLabel = 'arrow-redo',
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
      d="M10 10C7.79086 10 6 11.7909 6 14C6 16.2091 7.79086 18 10 18H14V20H9.96364L9.812 19.9981C6.5869 19.9171 4 17.2611 4 14C4 10.7389 6.5869 8.08285 9.812 8.0019L15.5 8L12 4.5L13.5 3L19.5 9L13.5 15L12 13.5L15.5 10H10Z"
      fill="currentColor"
    />
  </svg>
);
