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

export const IconLinkedin = ({
  ariaLabel = 'linkedin',
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
      d="M19.0714 3H4.92857C3.86384 3 3 3.86384 3 4.92857V19.0714C3 20.1362 3.86384 21 4.92857 21H19.0714C20.1362 21 21 20.1362 21 19.0714V4.92857C21 3.86384 20.1362 3 19.0714 3ZM5.77232 18.4286V9.83839H8.4442V18.4286H5.77232ZM5.55937 7.1183C5.55937 6.26652 6.25045 5.57143 7.10625 5.57143C7.95804 5.57143 8.65312 6.26652 8.65312 7.1183C8.65312 7.97411 7.96205 8.66518 7.10625 8.66518C6.25045 8.66518 5.55937 7.97009 5.55937 7.1183ZM15.7728 18.4286V14.25C15.7728 13.2536 15.7527 11.9719 14.3866 11.9719C12.9964 11.9719 12.7835 13.0567 12.7835 14.1777V18.4286H10.1156V9.83839H12.675V11.0116H12.7112C13.0688 10.3366 13.9406 9.62545 15.2384 9.62545C17.9384 9.62545 18.4406 11.4054 18.4406 13.7196V18.4286H15.7728Z"
      fill="currentColor"
    ></path>
  </svg>
);
