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

export const IconTwitch = ({
  ariaLabel = 'twitch',
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
      d="M19.0714 3C20.0855 3 20.9173 3.78353 20.9942 4.7779L21 4.92857V19.0714C21 20.0855 20.2165 20.9173 19.2221 20.9942L19.0714 21H4.92857C3.91454 21 3.08273 20.2165 3.0058 19.2221L3 19.0714V4.92857C3 3.91454 3.78353 3.08273 4.7779 3.0058L4.92857 3H19.0714ZM19 5H8.70833L6 7.70833V17.4583H9.25V20.1667L11.9583 17.4583H14.125L19 12.5833V5ZM17.9167 6.08333V12.0417L15.75 14.2083H13.5833L11.6875 16.1042V14.2083H9.25V6.08333H17.9167ZM16.2917 7.97917H15.2083V11.2292H16.2917V7.97917ZM13.3125 7.97917H12.2292V11.2292H13.3125V7.97917Z"
      fill="currentColor"
    ></path>
  </svg>
);
