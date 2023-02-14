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

export const IconCalendarEvent = ({
  ariaLabel = 'calendar-event',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M15.4554 22.2312L15.5475 21.4986L15.8597 19.0199L14.1757 17.2064L13.6741 16.6712L14.3907 16.5309L16.8118 16.0736L17.989 13.8808L18.3371 13.2312L18.6851 13.8808L19.8624 16.0736L22.2834 16.5309L23 16.6712L22.4984 17.2064L20.8093 19.0251L21.1215 21.4986L21.2188 22.2312L20.5585 21.9143L18.3371 20.849L16.1156 21.9143L15.4554 22.2312ZM17 2C17.5523 2 18 2.44772 18 3V4H22V12H20V11H4V19H13V21H2V4H6V3C6 2.44772 6.44772 2 7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2ZM20 6H4V9H20V6Z" fill="currentColor"></path>
  </svg>
);
