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

export const IconEye = ({
  ariaLabel = 'eye',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M12 4.5C16.0501 4.5 19.7168 7 23 12C19.7168 17 16.0501 19.5 12 19.5C7.94991 19.5 4.28325 17 1 12C4.28325 7 7.94991 4.5 12 4.5ZM12 6.5C9.04854 6.5 6.2496 8.20372 3.57529 11.8024L3.43 12L3.57529 12.1976C6.19914 15.7284 8.94296 17.435 11.8331 17.4982L12 17.5C14.9515 17.5 17.7504 15.7963 20.4247 12.1976L20.5695 12L20.4247 11.8024C17.8009 8.27162 15.057 6.56497 12.1669 6.50182L12 6.5ZM12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8ZM12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10Z" fill="currentColor"></path>
  </svg>
);
