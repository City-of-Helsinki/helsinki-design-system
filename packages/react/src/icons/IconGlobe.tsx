import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconGlobe = ({
  ariaLabel = 'globe',
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
      d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM7.34528 17.0409C6.67886 17.1107 6.01455 17.1966 5.35359 17.2978C6.35409 18.5525 7.70206 19.5167 9.25161 20.0458C8.46819 19.1304 7.82833 18.12 7.34528 17.0409ZM16.6562 17.0485C16.1741 18.124 15.5362 19.131 14.7561 20.0435C16.2981 19.515 17.6403 18.5556 18.6386 17.3089L17.9422 17.2065C17.5147 17.1474 17.0859 17.0948 16.6562 17.0485ZM12.7504 16.8043L12.7506 19.9839C13.7114 19.0818 14.4909 18.0425 15.0671 16.908C14.2961 16.8523 13.5235 16.8182 12.7504 16.8043ZM11.25 16.803C10.513 16.8149 9.77633 16.8453 9.04149 16.8941L8.93557 16.9019C9.51103 18.0367 10.2897 19.0764 11.2498 19.9789L11.25 16.803ZM20.4674 12.7501L17.7084 12.7503C17.65 13.7296 17.4775 14.6853 17.1983 15.6034C17.9806 15.6941 18.7599 15.8058 19.5343 15.9379C20.0415 14.9704 20.3675 13.8927 20.4674 12.7501ZM4.45923 15.9264L4.50876 15.9176C5.26998 15.7899 6.0359 15.6818 6.80501 15.5936C6.52698 14.6791 6.35546 13.7264 6.29728 12.7502L3.53265 12.7501C3.63214 13.888 3.95581 14.9615 4.45923 15.9264ZM12.75 12.75L12.7502 15.3058C13.727 15.3228 14.7036 15.3714 15.6767 15.4516C15.9671 14.5863 16.1477 13.6805 16.211 12.7503L12.75 12.75ZM11.25 12.75L7.7947 12.7503C7.85783 13.6784 8.03782 14.5821 8.32667 15.4459C9.2991 15.3667 10.2745 15.3198 11.2503 15.3045L11.25 12.75ZM19.5342 8.0611L19.2178 8.11547C18.5477 8.2247 17.874 8.31874 17.1977 8.3975C17.4776 9.31479 17.65 10.2704 17.7084 11.2495L20.4674 11.2499C20.3674 10.1071 20.0414 9.0292 19.5342 8.0611ZM4.45946 8.07443L4.4418 8.10721C3.94833 9.06338 3.63098 10.1252 3.53265 11.2499L6.29733 11.2495C6.35557 10.2734 6.52713 9.32081 6.80481 8.40549C6.01907 8.31617 5.23673 8.20561 4.45946 8.07443ZM15.6769 8.54819L15.2071 8.58474C14.3898 8.64341 13.5703 8.67995 12.7505 8.69423L12.75 11.2495L16.211 11.2496C16.1477 10.3195 15.967 9.4138 15.6769 8.54819ZM8.32718 8.55501L8.2883 8.67145C8.0219 9.49964 7.85505 10.3635 7.79474 11.2496L11.25 11.2495L11.2502 8.69551C10.2747 8.68016 9.29928 8.63326 8.32718 8.55501ZM11.2498 4.0215C10.2896 4.92418 9.51076 5.96406 8.93527 7.09907C9.7058 7.15244 10.4778 7.18523 11.2503 7.19771L11.2498 4.0215ZM12.7506 4.01655L12.7501 7.19642C13.5236 7.1826 14.2965 7.14842 15.0673 7.09389C14.4911 5.95831 13.7116 4.91879 12.7506 4.01655ZM9.25296 3.95332L9.2262 3.96288C7.68691 4.49402 6.3479 5.45492 5.35257 6.70215C6.01404 6.80395 6.67871 6.88991 7.34571 6.96049C7.8289 5.88027 8.46925 4.8692 9.25296 3.95332ZM14.7569 3.95705L14.8992 4.12587C15.615 4.99324 16.2047 5.94229 16.6572 6.95147C17.3202 6.88074 17.9812 6.79415 18.6388 6.6923C17.6409 5.44494 16.2989 4.4855 14.7569 3.95705Z"
      fill="currentColor"
    />
  </svg>
);
