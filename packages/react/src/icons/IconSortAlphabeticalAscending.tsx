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

export const IconSortAlphabeticalAscending = ({
  ariaLabel = 'sort-alphabetical-ascending',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M8 3.99996V16.5L10 14.5L11.5 16L7 20.5L2.5 16L4 14.5L6 16.5V3.99996H8ZM16.995 12.96C18.835 12.96 20.275 14.28 20.275 16.52C20.275 18.76 18.835 20.12 16.995 20.12C15.165 20.12 13.725 18.76 13.725 16.52C13.725 14.28 15.165 12.96 16.995 12.96ZM16.995 14.59C16.015 14.59 15.625 15.46 15.625 16.52C15.625 17.58 16.015 18.49 16.995 18.49C17.975 18.49 18.375 17.58 18.375 16.52C18.375 15.46 17.975 14.59 16.995 14.59ZM15.935 11C16.435 11 16.805 11.36 16.805 11.86C16.805 12.36 16.435 12.72 15.935 12.72C15.435 12.72 15.065 12.36 15.065 11.86C15.065 11.36 15.435 11 15.935 11ZM18.065 11C18.565 11 18.935 11.36 18.935 11.86C18.935 12.36 18.565 12.72 18.065 12.72C17.565 12.72 17.195 12.36 17.195 11.86C17.195 11.36 17.565 11 18.065 11ZM18.135 3.07996L20.465 9.99996H18.545L18.125 8.67996H15.785L15.375 9.99996H13.535L15.865 3.07996H18.135ZM16.985 4.85996H16.945L16.8651 5.21204L16.8068 5.43212L16.735 5.66996L16.265 7.15996H17.655L17.1478 5.55008L17.0845 5.3186L17.018 5.02988L16.985 4.85996Z" fill="currentColor"></path>
  </svg>
);
