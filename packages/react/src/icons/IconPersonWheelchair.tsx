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

export const IconPersonWheelchair = ({
  ariaLabel = 'person-wheelchair',
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
      d="M7.99937 9.49841L7.99958 11.7576C7.759 11.9187 7.53053 12.1055 7.31802 12.318C5.56066 14.0754 5.56066 16.9246 7.31802 18.682C9.044 20.408 11.8232 20.4388 13.5868 18.7744L13.682 18.682L15.0962 20.0962C12.5578 22.6346 8.44221 22.6346 5.90381 20.0962C3.3654 17.5578 3.3654 13.4422 5.90381 10.9038C6.52361 10.284 7.23743 9.81554 7.99937 9.49841ZM11 1C12.6569 1 14 2.34315 14 4C14 5.30625 13.1651 6.41751 11.9999 6.82933L11.999 9H16V11H11.999L12 11.7912C12.0005 12.3185 12.2054 12.8233 12.5858 13.2036C13.1271 13.745 13.5156 13.8925 14.4669 13.9563L14.7547 13.9725C16.3725 14.0496 17.2151 14.2974 18.2426 15.325C19.1739 16.2563 19.4647 17.0357 19.5684 18.3779L19.5951 18.8129C19.6482 19.9287 19.7607 20.3519 20.2893 20.9054L20.364 20.9818L18.9497 22.396C17.9603 21.4065 17.6938 20.5885 17.6066 19.0847L17.5973 18.9081C17.5418 17.7416 17.4213 17.3321 16.8284 16.7392C16.2613 16.1721 15.8619 16.0372 14.8075 15.9779L14.6595 15.9703C13.0418 15.8932 12.1991 15.6454 11.1716 14.6179C10.4489 13.8951 10.0409 12.9409 10.0029 11.943L9.9991 6.82898C8.83438 6.41688 8 5.30588 8 4C8 2.34315 9.34315 1 11 1ZM11 3C10.4477 3 10 3.44772 10 4C10 4.55228 10.4477 5 11 5C11.5523 5 12 4.55228 12 4C12 3.44772 11.5523 3 11 3Z"
      fill="currentColor"
    />
  </svg>
);
