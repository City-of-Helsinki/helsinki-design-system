import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

const IconUploadCloud: React.FC<IconProps> = ({ size = 's', className = '', style = {} }: IconProps) => (
  <svg
    className={classNames(styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        d="M7.757 12.243L12 8l4.243 4.243-1.061 1.06L13 11.123V22h-2V11.121l-2.182 2.182-1.06-1.06zM11.5 2c2.557 0 4.867 1.552 5.736 3.93l.047.136.132.021c2.63.448 4.517 2.532 4.583 5.263l.002.15c0 3.141-2.2 5.427-5.3 5.498l-.15.002H15.5v-2h1.05c2.066 0 3.45-1.406 3.45-3.5 0-1.962-1.398-3.381-3.4-3.495L16.471 8l-.795-.023-.157-.78C15.14 5.296 13.434 4 11.5 4 9.263 4 7.622 5.559 7.507 7.75l-.005.13-.014 1.112-1.157.01C4.84 9.043 3.6 10.452 3.6 12.1a2.9 2.9 0 002.789 2.898L6.5 15h2v2h-2a4.9 4.9 0 01-4.9-4.9c0-2.41 1.652-4.535 3.895-5.004l.07-.014.022-.145c.468-2.84 2.777-4.867 5.758-4.935L11.5 2z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default IconUploadCloud;
