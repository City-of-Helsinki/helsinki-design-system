import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconQuestionCircle = ({
  ariaLabel = 'question-circle',
  ariaLabelledby,
  ariaHidden = true,
  className = '',
  color,
  size = IconSize.Small,
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
      d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM13 16V18H11V16H13ZM12.0437 5.75C14.0343 5.75 15.7173 7.29464 15.7173 9.42361C15.7173 10.7806 15.2461 11.489 14.161 12.306L13.9187 12.4844C13.1753 13.0295 12.9556 13.3359 12.9386 14.142L12.9375 14.25H10.9375C10.9375 12.6746 11.4591 11.8378 12.6143 10.9622L12.8618 10.7796C13.5685 10.2628 13.7173 10.0539 13.7173 9.42361C13.7173 8.43934 12.9662 7.75 12.0437 7.75C11.1907 7.75 10.4785 8.34077 10.3816 9.20835L10.3734 9.30587L8.37663 9.19182C8.49191 7.17347 10.1344 5.75 12.0437 5.75Z"
      fill="currentColor"
    />
  </svg>
);
