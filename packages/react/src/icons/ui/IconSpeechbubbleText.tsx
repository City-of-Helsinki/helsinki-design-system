import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

const IconSpeechbubbleText: React.FC<IconProps> = ({ size = 's', className = '', style = {} }: IconProps) => (
  <svg
    className={classNames(styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        d="M19 4a4 4 0 013.995 3.8L23 8v8a4 4 0 01-3.8 3.995L19 20h-1c-.988 0-1.846.338-2.617 1.039l-.176.168-.707.707-.707-.707c-.757-.757-1.6-1.149-2.567-1.201L11 20H5a4 4 0 01-3.995-3.8L1 16V8a4 4 0 013.8-3.995L5 4h14zm0 2H5a2 2 0 00-1.995 1.85L3 8v8a2 2 0 001.85 1.995L5 18h6a5.68 5.68 0 013.5 1.175 5.67 5.67 0 013.036-1.158l.28-.014L18 18h1a2 2 0 001.995-1.85L21 16V8a2 2 0 00-1.85-1.995L19 6zm-1 7v2H6v-2h12zm0-4v2H6V9h12z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default IconSpeechbubbleText;
