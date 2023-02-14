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

export const IconTwitter = ({
  ariaLabel = 'twitter',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M19.0714 3C20.0855 3 20.9173 3.78353 20.9942 4.7779L21 4.92857V19.0714C21 20.0855 20.2165 20.9173 19.2221 20.9942L19.0714 21H4.92857C3.91454 21 3.08273 20.2165 3.0058 19.2221L3 19.0714V4.92857C3 3.91454 3.78353 3.08273 4.7779 3.0058L4.92857 3H19.0714ZM14.6916 6.43652C13.1015 6.43652 11.8223 7.72458 11.8223 9.30582C11.8223 9.52791 11.8489 9.74997 11.8933 9.96317C9.51265 9.83878 7.38954 8.70174 5.97709 6.96062C5.72835 7.38702 5.58624 7.8756 5.58624 8.40859C5.58624 9.40352 6.09257 10.283 6.86541 10.7982C6.46189 10.783 6.07789 10.6829 5.73587 10.5204L5.56847 10.434V10.4695C5.56847 11.8642 6.55454 13.019 7.86926 13.2855C7.62943 13.3477 7.37179 13.3832 7.11419 13.3832C6.92762 13.3832 6.74997 13.3655 6.57229 13.3388C6.93651 14.4759 7.99362 15.302 9.25505 15.3287C8.269 16.1015 7.03421 16.5546 5.69285 16.5546C5.45299 16.5546 5.23093 16.5457 4.99996 16.5191C6.27027 17.3363 7.78042 17.8071 9.40607 17.8071C14.6827 17.8071 17.5698 13.4365 17.5698 9.64338C17.5698 9.51902 17.5698 9.39464 17.5609 9.27028C18.1206 8.86162 18.6092 8.3553 19 7.78679C18.4847 8.00885 17.9251 8.16878 17.3477 8.23094C17.9428 7.87563 18.3959 7.31598 18.6091 6.64972C18.0583 6.9784 17.4365 7.21826 16.788 7.34262C16.2639 6.78297 15.5177 6.43652 14.6916 6.43652Z" fill="currentColor"></path>
  </svg>
);
