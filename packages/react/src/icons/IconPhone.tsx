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

export const IconPhone = ({
  ariaLabel = 'phone',
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
      d="M4.88475 2.50597L3.04274 4.34798L3.00927 4.38311C0.572022 7.06914 2.78398 12.4521 7.19058 16.8176C11.6361 21.2216 16.9423 23.4177 19.6169 20.9908L21.4941 19.1153C22.1719 18.4375 22.1491 17.5519 21.5517 16.8429L21.4941 16.7801L17.3496 12.6356C16.6717 11.9577 15.7862 11.9805 15.0771 12.5779L15.0143 12.6356L13.968 13.6815L13.9315 13.6736C13.3458 13.53 12.6896 13.0718 11.8082 12.1904L11.6852 12.066C10.8843 11.2471 10.4629 10.6263 10.3263 10.0686L10.318 10.0315L11.3645 8.98572L11.4221 8.92294C12.0195 8.21389 12.0424 7.32836 11.3645 6.6505L7.21997 2.50597L7.15719 2.44833C6.44814 1.85093 5.56261 1.82812 4.88475 2.50597ZM6.05202 4.16653L9.70352 7.81803L8.27588 9.24591V9.66012C8.27588 11.015 8.96256 12.1732 10.394 13.6046C11.8259 15.0365 12.9851 15.7242 14.3399 15.7242H14.7541L16.182 14.2965L19.833 17.9475L18.2379 19.5431C16.7133 20.9249 12.3595 19.1231 8.59815 15.3968L8.44621 15.2448C4.87572 11.6383 3.13151 7.398 4.43358 5.7933L4.48102 5.73753L6.05202 4.16653Z"
      fill="currentColor"
    ></path>
  </svg>
);
