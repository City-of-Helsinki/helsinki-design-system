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

export const IconCalendarCross = ({
  ariaLabel = 'calendar-cross',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M17 2C17.5523 2 18 2.44772 18 3V4H22V13H20V11H4V19H13.5V21H2V4H6V3C6 2.44772 6.44772 2 7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2ZM20 6H4V9H20V6ZM22.5355 16.4142L20.5 18.5L22.5 20.5L21 22L19 20L17 22L15.4645 20.6569L17.5 18.5L15.5 16.5L17 15L19 17L21 15L22.5355 16.4142Z" fill="currentColor"></path>
  </svg>
);
