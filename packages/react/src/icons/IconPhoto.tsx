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

export const IconPhoto = ({
  ariaLabel = 'photo',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M20 2V22H4V2H20ZM16 15C15.1401 15 14.7159 15.2223 13.88 16.0363L13.7071 16.2071C12.4113 17.5029 11.5828 18 10 18C8.50049 18 7.67799 17.5539 6.49379 16.4051L6 15.92V20H18V15.922L17.958 15.8813C17.2256 15.1936 16.8025 15 16 15ZM18 4H6L6.00114 13.4397C6.50287 13.6831 6.92886 14.0298 7.51078 14.5986L7.70711 14.7929C8.6613 15.7471 9.08282 16 10 16C10.8599 16 11.2841 15.7777 12.12 14.9637L12.2929 14.7929C13.5887 13.4971 14.4172 13 16 13C16.8098 13 17.4222 13.1301 18.0007 13.4308L18 4ZM10 6C11.6569 6 13 7.34315 13 9C13 10.6569 11.6569 12 10 12C8.34315 12 7 10.6569 7 9C7 7.34315 8.34315 6 10 6ZM10 8C9.44772 8 9 8.44772 9 9C9 9.55228 9.44772 10 10 10C10.5523 10 11 9.55228 11 9C11 8.44772 10.5523 8 10 8Z" fill="currentColor"></path>
  </svg>
);
