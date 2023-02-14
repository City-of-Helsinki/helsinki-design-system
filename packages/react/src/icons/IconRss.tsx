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

export const IconRss = ({
  ariaLabel = 'rss',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M19.0714 3C20.0855 3 20.9173 3.78353 20.9942 4.7779L21 4.92857V19.0714C21 20.0855 20.2165 20.9173 19.2221 20.9942L19.0714 21H4.92857C3.91454 21 3.08273 20.2165 3.0058 19.2221L3 19.0714V4.92857C3 3.91454 3.78353 3.08273 4.7779 3.0058L4.92857 3H19.0714ZM7 15C5.89543 15 5 15.8954 5 17C5 18.1046 5.89543 19 7 19C8.10457 19 9 18.1046 9 17C9 15.8954 8.10457 15 7 15ZM5 9.5V12L5.24065 12.0041C8.91533 12.1282 11.8718 15.0847 11.9959 18.7593L12 19H14.5L14.4962 18.7295C14.3556 13.6977 10.3023 9.64445 5.27048 9.50378L5 9.5ZM5 5V7.5L5.29227 7.50364C11.4098 7.65625 16.3412 12.5862 16.4962 18.7031L16.5 19H19L18.9966 18.6874C18.8326 11.2051 12.7986 5.16972 5.31698 5.00352L5 5Z" fill="currentColor"></path>
  </svg>
);
