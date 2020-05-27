import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

const IconZoomText: React.FC<IconProps> = ({ size = 's', className = '', style = {} }: IconProps) => (
  <svg
    className={classNames(styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        d="M15 2a8 8 0 11-4.953 14.283l-5.633 5.631L3 20.5l5.642-5.644A8 8 0 0115 2zm0 2a6 6 0 100 12 6 6 0 000-12zm1.065 2.5L18.25 13h-1.8l-.395-1.24H13.86L13.476 13H11.75l2.185-6.5h2.13zM4.65 7.5L6.5 13H4.976l-.333-1.05H2.786L2.46 13H1l1.85-5.5h1.8zm-.913 1.415h-.032l-.054.244c-.014.058-.03.122-.05.19l-.062.21-.373 1.184H4.27l-.373-1.184c-.103-.318-.159-.644-.159-.644zm11.248-.743h-.038l-.075.33a7.427 7.427 0 01-.054.207l-.068.224-.44 1.4h1.303l-.44-1.4c-.122-.376-.188-.761-.188-.761z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default IconZoomText;
