import React from 'react';
import styles from '../../templates/Icon.module.css';

interface IconProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaHidden?: boolean;
  className?: string;
  color?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  style?: React.CSSProperties;
}

export const IconShoppingCart = ({
  ariaLabel = 'shopping-cart',
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
      d="M16.6 13C17.3 13 18 12.6 18.3 12L21.9 5.5C22.2 4.8 21.8 4 21 4H6.2L5.3 2H2V4H4L7.6 11.6L6.2 14C5.5 15.3 6.4 17 8 17H20V15H8L9.1 13H16.6ZM7.2 6H19.3L16.5 11H9.5L7.2 6ZM8 18C6.9 18 6 18.9 6 20C6 21.1 6.9 22 8 22C9.1 22 10 21.1 10 20C10 18.9 9.1 18 8 18ZM18 18C16.9 18 16 18.9 16 20C16 21.1 16.9 22 18 22C19.1 22 20 21.1 20 20C20 18.9 19.1 18 18 18Z"
      fill="currentColor"
    ></path>
  </svg>
);
