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

export const IconDownloadCloud = ({
  ariaLabel = 'download-cloud',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M13 9V19L15 17L16.5 18.5L12 23L7.49998 18.5L8.99998 17L11 19V9H13ZM11.5 1C14.057 1 16.3672 2.55157 17.2358 4.93092L17.2835 5.0665L17.4145 5.08731C20.0449 5.53521 21.9316 7.61877 21.9982 10.3504L22 10.5C22 13.6412 19.7996 15.9265 16.7006 15.9983L15.5 16V14H16.55C18.6163 14 20 12.5943 20 10.5C20 8.53805 18.6018 7.11878 16.6001 7.00507L16.4715 6.99959L15.6756 6.9769L15.5194 6.19612C15.1395 4.29673 13.4337 3 11.5 3C9.26283 3 7.62211 4.55854 7.50658 6.75063L7.50154 6.8803L7.4877 7.99175L6.3306 8.00124C4.84062 8.04439 3.59998 9.45297 3.59998 11.1C3.59998 12.6644 4.83866 13.9394 6.38874 13.9979L6.49998 14H8.49998V16H6.49998C3.79378 16 1.59998 13.8062 1.59998 11.1C1.59998 8.68983 3.25229 6.56452 5.495 6.09571L5.56448 6.082L5.58682 5.93675C6.055 3.09689 8.36432 1.06966 11.3452 1.00176L11.5 1Z" fill="currentColor"></path>
  </svg>
);
