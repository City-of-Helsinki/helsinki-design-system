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

export const IconMap = ({
  ariaLabel = 'map',
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
      d="M22 4.11255V17.7207L15 20.0541L9 18.054L2 20.3874V6.77922L9 4.44588L15 6.44547L22 4.11255ZM8 6.88655L4 8.22047V17.612L8 16.2785V6.88655ZM10 6.88655V16.2785L14 17.6115V8.22055L10 6.88655ZM20 6.88697L16 8.22055V17.6115L20 16.279V6.88697Z"
      fill="currentColor"
    />
  </svg>
);
