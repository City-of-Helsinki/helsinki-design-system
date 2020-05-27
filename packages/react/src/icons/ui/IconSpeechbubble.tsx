import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

const IconSpeechbubble: React.FC<IconProps> = ({ size = 's', className = '', style = {} }: IconProps) => (
  <svg
    className={classNames(styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        d="M19 4H5a4 4 0 00-4 4v8a4 4 0 004 4h6c1.064 0 1.977.392 2.793 1.207l.707.707.707-.707C16.023 20.392 16.937 20 18 20h1a4 4 0 004-4V8a4 4 0 00-4-4zM5 6h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-.184.003a5.675 5.675 0 00-3.316 1.172A5.68 5.68 0 0011 18H5a2 2 0 01-2-2V8a2 2 0 012-2z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default IconSpeechbubble;
