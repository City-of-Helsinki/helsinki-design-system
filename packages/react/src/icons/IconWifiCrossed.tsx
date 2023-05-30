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

export const IconWifiCrossed = ({
  ariaLabel = 'wifi-crossed',
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
      d="M19.7929 2.79291L21.2071 4.20712L4.70711 20.7071L3.29289 19.2929L19.7929 2.79291ZM12 17.5338C12.8284 17.5338 13.5 18.2054 13.5 19.0338C13.5 19.8623 12.8284 20.5338 12 20.5338C11.1716 20.5338 10.5 19.8623 10.5 19.0338C10.5 18.2054 11.1716 17.5338 12 17.5338ZM13.5254 14.0084C14.4727 14.2859 15.374 14.7918 16.1404 15.5229L16.2517 15.6315L14.8375 17.0457C13.9784 16.1867 12.8661 15.7562 11.7777 15.7561L13.5254 14.0084ZM10.9645 9.50061L7.98999 12.475C7.34406 12.8278 6.73438 13.2713 6.17967 13.8055L6.06399 13.9191L4.64977 12.5049C6.41692 10.7377 8.65951 9.73614 10.9645 9.50061ZM16.889 10.6459C17.7398 11.0949 18.5412 11.67 19.2659 12.3713L19.3899 12.4933L17.9757 13.9075C17.2083 13.1402 16.3293 12.5523 15.3908 12.1438L16.889 10.6459ZM20.13 7.40669C20.9125 7.91739 21.6574 8.50937 22.3528 9.18262L22.5281 9.35508L21.1139 10.7693C20.3646 10.02 19.5459 9.38245 18.6785 8.85658L20.13 7.40669ZM15.1352 5.32947L13.392 7.07355C9.7214 6.68056 5.91411 7.86273 3.06592 10.62L2.91421 10.7693L1.5 9.35508C5.20194 5.65314 10.3702 4.31128 15.1352 5.32947Z"
      fill="currentColor"
    />
  </svg>
);
