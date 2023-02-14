import React from 'react';
import styles from '../../templates/Icon.module.css';

interface IconProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaHidden?: boolean;
  className?: string,
  color?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  style?: React.CSSProperties;
}

export const IconHeadphones = ({
  ariaLabel = 'headphones',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M16 14.5L16.0069 14.3555C16.0796 13.5949 16.7203 13 17.5 13H20C20 8.58172 16.4183 5 12 5C7.58172 5 4 8.58172 4 13H6.5C7.32843 13 8 13.6716 8 14.5V18C8 19.6569 6.65685 21 5 21C3.34315 21 2 19.6569 2 18V13C2 7.47715 6.47715 3 12 3C17.5228 3 22 7.47715 22 13V18C22 19.6569 20.6569 21 19 21C17.3431 21 16 19.6569 16 18V14.5Z" fill="currentColor"></path>
  </svg>
);
