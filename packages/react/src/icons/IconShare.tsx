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

export const IconShare = ({
  ariaLabel = 'share',
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
      d="M18.5 2.25C20.433 2.25 22 3.817 22 5.75C22 7.683 20.433 9.25 18.5 9.25C17.4601 9.25 16.5262 8.79651 15.8851 8.07652L8.96926 11.5341C8.98954 11.6865 9 11.842 9 12C9 12.158 8.98954 12.3135 8.96926 12.4659L15.8851 15.9235C16.5262 15.2035 17.4601 14.75 18.5 14.75C20.433 14.75 22 16.317 22 18.25C22 20.183 20.433 21.75 18.5 21.75C16.567 21.75 15 20.183 15 18.25C15 18.1135 15.0078 17.9788 15.023 17.8464L8.07394 14.3717C7.43439 15.0654 6.51794 15.5 5.5 15.5C3.567 15.5 2 13.933 2 12C2 10.067 3.567 8.5 5.5 8.5C6.51794 8.5 7.43439 8.93457 8.07394 9.6283L15.023 6.15357C15.0078 6.02115 15 5.88649 15 5.75C15 3.817 16.567 2.25 18.5 2.25ZM18.5 16.75C17.6716 16.75 17 17.4216 17 18.25C17 19.0784 17.6716 19.75 18.5 19.75C19.3284 19.75 20 19.0784 20 18.25C20 17.4216 19.3284 16.75 18.5 16.75ZM5.5 10.5C4.67157 10.5 4 11.1716 4 12C4 12.8284 4.67157 13.5 5.5 13.5C6.32843 13.5 7 12.8284 7 12C7 11.1716 6.32843 10.5 5.5 10.5ZM18.5 4.25C17.6716 4.25 17 4.92157 17 5.75C17 6.57843 17.6716 7.25 18.5 7.25C19.3284 7.25 20 6.57843 20 5.75C20 4.92157 19.3284 4.25 18.5 4.25Z"
      fill="currentColor"
    ></path>
  </svg>
);
