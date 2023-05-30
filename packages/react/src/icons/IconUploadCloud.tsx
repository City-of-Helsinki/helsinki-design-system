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

export const IconUploadCloud = ({
  ariaLabel = 'upload-cloud',
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
      d="M7.49998 12L12 7.5L16.5 12L15 13.5L13 11.5V22H11V11.5L8.99998 13.5L7.49998 12ZM11.5 2C14.057 2 16.3672 3.55157 17.2358 5.93092L17.2835 6.0665L17.4145 6.08731C20.0449 6.53521 21.9316 8.61877 21.9982 11.3504L22 11.5C22 14.6412 19.7996 16.9265 16.7006 16.9983L16.55 17H15.5V15H16.55C18.6163 15 20 13.5943 20 11.5C20 9.53805 18.6018 8.11878 16.6001 8.00507L16.4715 7.99959L15.6756 7.9769L15.5194 7.19612C15.1395 5.29673 13.4337 4 11.5 4C9.26283 4 7.62211 5.55854 7.50658 7.75063L7.50154 7.8803L7.4877 8.99175L6.3306 9.00124C4.84062 9.04439 3.59998 10.453 3.59998 12.1C3.59998 13.6644 4.83866 14.9394 6.38874 14.9979L6.49998 15H8.49998V17H6.49998C3.79378 17 1.59998 14.8062 1.59998 12.1C1.59998 9.68983 3.25229 7.56452 5.495 7.09571L5.56448 7.082L5.58682 6.93675C6.055 4.09689 8.36432 2.06966 11.3452 2.00176L11.5 2Z"
      fill="currentColor"
    />
  </svg>
);
