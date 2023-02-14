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

export const IconCalendarClock = ({
  ariaLabel = 'calendar-clock',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M17 12C20.3137 12 23 14.6863 23 18C23 21.3137 20.3137 24 17 24C13.6863 24 11 21.3137 11 18C11 14.6863 13.6863 12 17 12ZM17 14C14.7909 14 13 15.7909 13 18C13 20.2091 14.7909 22 17 22C19.2091 22 21 20.2091 21 18C21 15.7909 19.2091 14 17 14ZM17 2C17.5523 2 18 2.44772 18 3V4H22L22.0016 13.1026C21.4273 12.5162 20.7507 12.0304 20.0007 11.674L20 11H4V19L10.071 19.001C10.1721 19.7071 10.3786 20.3791 10.674 21.0007L2 21V4H6V3C6 2.44772 6.44772 2 7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2ZM17.5 15V17.9395L19.0303 19.4697L17.9697 20.5303L16 18.5607V15H17.5ZM20 6H4V9H20V6Z" fill="currentColor"></path>
  </svg>
);
