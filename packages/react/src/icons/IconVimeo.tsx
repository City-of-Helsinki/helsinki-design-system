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

export const IconVimeo = ({
  ariaLabel = 'vimeo',
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
      d="M19.0714 3H4.92857C3.86384 3 3 3.86384 3 4.92857V19.0714C3 20.1362 3.86384 21 4.92857 21H19.0714C20.1362 21 21 20.1362 21 19.0714V4.92857C21 3.86384 20.1362 3 19.0714 3ZM18.4205 9.01071C18.3643 10.2603 17.4884 11.9759 15.7969 14.1496C14.0491 16.4196 12.5705 17.5567 11.3612 17.5567C10.6098 17.5567 9.97902 16.8656 9.46071 15.4835C8.44821 11.775 8.0183 9.60134 7.18259 9.60134C7.08616 9.60134 6.74866 9.80223 6.17411 10.208L5.57143 9.42857C7.05402 8.12679 8.4683 6.68036 9.35223 6.6C10.3527 6.50357 10.9674 7.18661 11.2004 8.65312C12.0241 13.8603 12.3897 14.6478 13.8844 12.2893C14.4228 11.4375 14.7121 10.7946 14.7482 10.3487C14.8848 9.0308 13.7196 9.1192 12.9321 9.4567C13.5629 7.3875 14.7723 6.38304 16.5522 6.43929C17.8741 6.47946 18.4969 7.33929 18.4205 9.01071Z"
      fill="currentColor"
    />
  </svg>
);
