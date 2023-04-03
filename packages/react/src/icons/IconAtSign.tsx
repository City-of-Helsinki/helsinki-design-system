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

export const IconAtSign = ({
  ariaLabel = 'at-sign',
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
      d="M11.8769 20C14.8308 20 17.0667 18.8308 18.2154 17.6205L16.3692 16.5333C15.5487 17.7436 13.8872 18.359 11.8769 18.359C8.38974 18.359 5.86667 15.7949 5.86667 11.9795C5.86667 8.24615 8.36923 5.68205 11.959 5.68205C15.3231 5.68205 17.7026 8 17.7026 11.3436C17.7026 12.9641 16.9846 14.1744 15.959 14.1744C15.3026 14.1744 14.9744 13.8051 14.9744 13.0256V10.6256C14.9744 8.71795 13.7231 7.8359 12.041 7.8359C10.2564 7.8359 9.08718 8.82051 8.49231 9.92821L10.1538 10.8513C10.3385 10.0923 10.9333 9.37436 11.9795 9.37436C12.5949 9.37436 13.1487 9.70256 13.1487 10.2564C13.1487 10.7897 12.4103 10.9538 11.3846 11.159C10.0718 11.4256 8.67692 11.9385 8.67692 13.4974C8.67692 14.7692 9.80513 15.6923 11.1385 15.6923C12.3282 15.6923 13.1487 15.0154 13.4769 14.5846H13.5179C13.9487 15.3846 14.8923 15.6923 15.8974 15.6923C17.641 15.6923 19.5692 14.3795 19.5692 11.3436C19.5692 7.0359 16.2667 4 11.959 4C7.40513 4 4 7.28205 4 11.9795C4 16.841 7.42564 20 11.8769 20ZM11.5692 14.1744C10.9744 14.1744 10.5026 13.8872 10.5026 13.3744C10.5026 12.8 11.0679 12.5869 11.6216 12.4326L11.8564 12.3692C12.5128 12.2051 13.0256 12.0615 13.2103 11.7949V12.5949C13.2103 13.6615 12.3692 14.1744 11.5692 14.1744Z"
      fill="currentColor"
    ></path>
  </svg>
);
