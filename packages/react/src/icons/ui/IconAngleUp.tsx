import React from 'react';

import { IconProps } from '../Icon.interface';

const IconAngleUp: React.FC<IconProps> = ({ className = '', style = {} }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path fill="currentColor" d="M8 15l4-4 4 4 1.5-1.5L12 8l-5.5 5.5z" />
    </g>
  </svg>
);

export default IconAngleUp;
