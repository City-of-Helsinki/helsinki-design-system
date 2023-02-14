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

export const IconYoutube = ({
  ariaLabel = 'youtube',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M19.0714 3C20.0855 3 20.9173 3.78353 20.9942 4.7779L21 4.92857V19.0714C21 20.0855 20.2165 20.9173 19.2221 20.9942L19.0714 21H4.92857C3.91454 21 3.08273 20.2165 3.0058 19.2221L3 19.0714V4.92857C3 3.91454 3.78353 3.08273 4.7779 3.0058L4.92857 3H19.0714ZM12.4663 7.00151L11.7079 7.00026C10.7113 7.0063 7.45039 7.04495 6.52908 7.29231C5.92669 7.45366 5.45224 7.92904 5.29122 8.53266C5.06455 9.38031 5.01349 10.9414 5.00199 11.6017V12.2173C5.01349 12.8776 5.06455 14.4387 5.29122 15.2864C5.45224 15.89 5.92669 16.3456 6.52908 16.5069C7.36319 16.7309 10.115 16.7837 11.368 16.7962H12.6307C13.8837 16.7837 16.6355 16.7309 17.4696 16.5069C18.072 16.3456 18.5464 15.89 18.7074 15.2864C18.8713 14.6737 18.9434 13.6882 18.9751 12.9396L18.9995 11.8169C18.9958 11.3788 18.9649 9.49548 18.7074 8.53266C18.5464 7.92904 18.072 7.45364 17.4696 7.29231C16.5968 7.05797 13.6241 7.01095 12.4663 7.00151ZM10.5992 9.79942L14.0995 11.8997L10.5992 13.9998V9.79942Z" fill="currentColor"></path>
  </svg>
);
