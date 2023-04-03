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

export const IconCamera = ({
  ariaLabel = 'camera',
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
      d="M14 3C15.0933 3 15.7067 3.32703 16.5378 4.12663L16.8346 4.41869C17.2766 4.84807 17.4963 4.97718 17.8797 4.99711L18 5H19C21.1422 5 22.8911 6.68397 22.9951 8.80036L23 9V16C23 18.1422 21.316 19.8911 19.1996 19.9951L19 20H5C2.8578 20 1.10892 18.316 1.0049 16.1996L1 16V9C1 6.8578 2.68397 5.10892 4.80036 5.0049L5 5H6C6.46201 5 6.6792 4.89101 7.16543 4.41869L7.46223 4.12663C8.23794 3.38034 8.82398 3.0457 9.78754 3.0044L10 3H14ZM14 5H10C9.53799 5 9.3208 5.10899 8.83457 5.58131L8.53777 5.87337C7.76206 6.61966 7.17602 6.9543 6.21246 6.9956L6 7H5C3.94564 7 3.08183 7.81588 3.00549 8.85074L3 9V16C3 17.0544 3.81588 17.9182 4.85074 17.9945L5 18H19C20.0544 18 20.9182 17.1841 20.9945 16.1493L21 16V9C21 7.94564 20.1841 7.08183 19.1493 7.00549L19 7H18C16.9067 7 16.2933 6.67297 15.4622 5.87337L15.1654 5.58131C14.7234 5.15193 14.5037 5.02282 14.1203 5.00289L14 5ZM12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM19 8C19.5523 8 20 8.44772 20 9C20 9.55228 19.5523 10 19 10C18.4477 10 18 9.55228 18 9C18 8.44772 18.4477 8 19 8Z"
      fill="currentColor"
    ></path>
  </svg>
);
