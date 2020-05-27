import React from 'react';

import { IconProps } from '../Icon.interface';

const IconMinus: React.FC<IconProps> = ({ className = '', style = {} }: IconProps) => (
  <>
    <svg className={className} style={style} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path id="a" d="M6 11h12v2H6z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" />
        <use fill="currentColor" />
      </g>
    </svg>

    <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path id="a" d="M6 11h12v2H6z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" />
        <use fill="currentColor" />
      </g>
    </svg>
  </>
);

export default IconMinus;
