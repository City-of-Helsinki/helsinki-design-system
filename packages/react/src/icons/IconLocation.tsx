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

export const IconLocation = ({
  ariaLabel = 'location',
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
      d="M11.9669 1.5C14.0265 1.5 16.0869 2.27765 17.6579 3.83367C20.8001 6.945 20.5878 11.7938 17.6579 15.1017L17.0345 15.8107C14.4235 18.8021 12.9688 20.7706 11.9669 22.7477C10.8937 20.6185 9.28527 18.4993 6.27797 15.1017C3.34814 11.7938 3.13508 6.945 6.27797 3.83367C7.84906 2.27765 9.90869 1.5 11.9669 1.5ZM11.999 3.5C10.3743 3.5 8.84685 4.12598 7.69956 5.26179C6.56645 6.38341 5.97897 7.81769 6.00058 9.41066C6.02151 10.984 6.64884 12.5453 7.76709 13.8087L8.42773 14.5606C10.0167 16.3842 11.1442 17.8 12.0004 19.0644C12.9748 17.6274 14.2916 16.0006 16.233 13.8087C17.3512 12.5453 17.9786 10.984 17.9995 9.41066C18.0198 7.81769 17.4323 6.38341 16.3005 5.26179C15.1519 4.12598 13.6251 3.5 11.999 3.5ZM12.0004 6C13.9338 6 15.5 7.56702 15.5 9.50039C15.5 11.433 13.9338 13 12.0004 13C10.067 13 8.5 11.433 8.5 9.50039C8.5 7.56702 10.067 6 12.0004 6ZM12.0003 8C11.1725 8 10.5 8.67319 10.5 9.50034C10.5 10.3268 11.1725 11 12.0003 11C12.8275 11 13.5 10.3268 13.5 9.50034C13.5 8.67319 12.8275 8 12.0003 8Z"
      fill="currentColor"
    ></path>
  </svg>
);
