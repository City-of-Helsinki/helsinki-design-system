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

export const IconBellCrossed = ({
  ariaLabel = 'bell-crossed',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M17.9999 9.534L18 11L18.0019 11.2009C18.0186 12.0272 18.1492 12.3644 18.5515 12.8551L18.8931 13.2598C19.6251 14.1657 19.9597 15.0654 19.9966 16.6873L20 17V19H15C15 20.6569 13.6569 22 12 22C10.4023 22 9.09635 20.7511 9.00511 19.1763L9.00001 19H8.53391L10.5339 17H18L17.998 16.7558C17.9834 15.914 17.888 15.4219 17.6647 15.0002L12.5339 15L14.5339 13L16.3136 13.001C16.1432 12.5806 16.0475 12.112 16.0139 11.5219L17.9999 9.534ZM19.7929 2.79289L21.2071 4.20711L4.70712 20.7071L3.29291 19.2929L19.7929 2.79289ZM13 19H11C11 19.5523 11.4477 20 12 20C12.5128 20 12.9355 19.614 12.9933 19.1166L13 19ZM12 2C13.7756 2 15.3711 2.7713 16.4697 3.99713L15.0517 5.41396C14.318 4.54897 13.2231 4 12 4C9.85782 4 8.10894 5.68397 8.00491 7.80036L8.00001 8V11C8.00001 11.6765 7.93897 12.2055 7.80365 12.6646L4.01107 16.453C4.07419 14.9768 4.41098 14.1211 5.10696 13.2598L5.34226 12.9814C5.82829 12.4172 5.98004 12.0961 5.99811 11.2009L6.00001 8C6.00001 4.68629 8.68631 2 12 2Z" fill="currentColor"></path>
  </svg>
);
