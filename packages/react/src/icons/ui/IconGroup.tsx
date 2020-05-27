import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

const IconGroup: React.FC<IconProps> = ({ size = 's', className = '', style = {} }: IconProps) => (
  <svg
    className={classNames(styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        d="M14.5 16a3.5 3.5 0 013.498 3.38l.002.12V22h-2v-2.5a1.5 1.5 0 00-1.412-1.497L14.5 18h-5a1.5 1.5 0 00-1.497 1.412L8 19.5V22H6v-2.5a3.5 3.5 0 013.38-3.498L9.5 16h5zm2.4-6.001l3.6.001.12.002a3.5 3.5 0 013.375 3.31L24 13.5V16h-2v-2.5l-.003-.088a1.5 1.5 0 00-1.358-1.406L20.5 12l-3.6.001a5.023 5.023 0 000-2.002zm-9.8 0A5.023 5.023 0 007.1 12L3.5 12a1.5 1.5 0 00-1.497 1.412L2 13.5V16H0v-2.5a3.5 3.5 0 013.38-3.498L3.5 10l3.6-.001zM12 7a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4zM5.5 2a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm13 0a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm-13 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm13 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default IconGroup;
