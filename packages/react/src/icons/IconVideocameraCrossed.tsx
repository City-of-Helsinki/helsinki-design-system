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

export const IconVideocameraCrossed = ({
  ariaLabel = 'videocamera-crossed',
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
      d="M19.7929 2.79291L21.2071 4.20712L4.70711 20.7071L3.29289 19.2929L19.7929 2.79291ZM23 6.61259V17.3874L16.9821 15.3809C16.7967 17.3437 15.193 18.8936 13.2068 18.9948L13 19H8.534L10.534 16.9999L13 17C14.0544 17 14.9182 16.1841 14.9945 15.1493L15 15V12.5339L19.882 7.65191L23 6.61259ZM13 5.00001C13.7103 5.00001 14.3773 5.18513 14.9554 5.50975L13.4207 7.04433C13.3302 7.02498 13.2376 7.01173 13.1431 7.00505L13 7.00001H5C3.94564 7.00001 3.08183 7.81589 3.00549 8.85075L3 9.00001V15C3 15.6712 3.33063 16.2652 3.83791 16.628L2.41396 18.0517C1.60664 17.3669 1.0746 16.3675 1.00725 15.2429L1 15V9.00001C1 6.85782 2.68397 5.10894 4.80036 5.00491L5 5.00001H13ZM21 9.38701L17 10.72V13.279L21 14.612V9.38701ZM6 9.00001C6.55228 9.00001 7 9.44773 7 10C7 10.5523 6.55228 11 6 11C5.44772 11 5 10.5523 5 10C5 9.44773 5.44772 9.00001 6 9.00001Z"
      fill="currentColor"
    ></path>
  </svg>
);
