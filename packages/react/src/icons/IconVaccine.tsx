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

export const IconVaccine = ({
  ariaLabel = 'vaccine',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M18.5429 4.4571L17.5 3.41421L18.9142 2L22.4142 5.5L21 6.91421L19.9571 5.87132L18.6753 7.15305L20.6213 9.099L11.099 18.6213L9.84437 17.3667L8.89843 18.3127L8.2071 17.6213L3.41421 22.4142L2 21L6.79289 16.2071L6.07 15.4842L7.01595 14.5383L5.79289 13.3152L15.3152 3.79289L17.2611 5.73884L18.5429 4.4571ZM8.62132 13.3152L11.099 15.7929L17.7929 9.099L15.3152 6.62132L8.62132 13.3152Z" fill="currentColor"></path>
  </svg>
);
