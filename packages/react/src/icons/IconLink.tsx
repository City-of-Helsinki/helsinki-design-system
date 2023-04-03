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

export const IconLink = ({
  ariaLabel = 'link',
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
      d="M11.489 6.4205L13.5632 4.36474C14.4164 3.5116 15.5251 3.03036 16.6983 3.00138C17.8714 2.9724 18.9577 3.39942 19.7697 4.21143C20.5817 5.02344 21.0277 6.10924 20.9987 7.28241C20.971 8.40457 20.5294 9.46775 19.7445 10.3047L19.6353 10.4174L16.2034 13.8494C15.3502 14.7025 14.2415 15.1837 13.0684 15.2127C11.8952 15.2417 10.8089 14.8147 9.99691 14.0027L10.1969 13.8079C10.5504 13.4595 11.1937 12.8146 11.4317 12.5679C12.2724 13.4273 13.7924 13.4164 14.7324 12.5663L14.8188 12.4842L18.2134 9.03425C19.1635 8.08416 19.2013 6.55147 18.297 5.64719C17.4564 4.78776 15.9363 4.79863 14.9964 5.64871L14.91 5.73086L12.8547 7.78615L11.489 6.4205ZM4.28786 13.6217L7.60134 10.3267C9.28632 8.62321 12.0229 8.60779 13.7074 10.2923L13.1397 10.8677C12.7975 11.2113 12.4306 11.5756 12.322 11.6776C11.4425 10.7981 9.99793 10.7794 9.07476 11.6155L8.98977 11.6964L5.67618 15.01C4.75886 15.9273 4.75036 17.4352 5.6574 18.3422C6.53695 19.2218 7.98149 19.2405 8.90466 18.4044L8.98965 18.3235L10.9742 16.3204L12.3439 17.7089L10.3595 19.6933C9.51702 20.5357 8.39765 20.9702 7.29931 20.9764C6.20098 20.9826 5.08639 20.5607 4.25339 19.7277C2.60123 18.0938 2.5843 15.4301 4.19145 13.7211L4.28786 13.6217Z"
      fill="currentColor"
    ></path>
  </svg>
);
