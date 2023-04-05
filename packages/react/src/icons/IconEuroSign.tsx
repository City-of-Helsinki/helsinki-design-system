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

export const IconEuroSign = ({
  ariaLabel = 'euro-sign',
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
      d="M12.6201 20C15.5698 20 17.2235 17.8771 17.7821 15.7318L15.4358 14.257C15.324 16.067 14.676 17.8771 12.6201 17.8771C10.676 17.8771 9.78212 16.514 9.42458 14.6592H12.5084L13.1564 12.8268H9.24581C9.23091 12.648 9.22595 12.4593 9.22429 12.2673L9.22346 11.3966H13.581L14.2067 9.5419H9.44693C9.82682 7.62011 10.7877 6.14525 12.6201 6.14525C14.6536 6.14525 15.324 7.75419 15.4358 9.58659L17.7821 8.11173C17.2235 5.96648 15.5251 4 12.6201 4C9.84916 4 7.63687 5.94413 6.94413 9.5419H5V11.3966H6.74302V11.9777C6.74302 12.2682 6.74302 12.5587 6.76536 12.8268H5V14.6592H6.96648C7.61452 18.1899 9.67039 20 12.6201 20Z"
      fill="currentColor"
    ></path>
  </svg>
);
