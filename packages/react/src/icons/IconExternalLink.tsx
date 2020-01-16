import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 12 12" className={className}>
    <g transform="translate(-1289.000000, -29.000000)" fillRule="nonzero">
      <g transform="translate(1289.000000, 29.000000)">
        <polygon points="8.293 2.293 4.586 6 6 7.414 9.707 3.707 12 6 12 0 6 0" />
        <path d="M10,10 L2,10 L2,2 L4,2 L4,0 L2,0 C0.8954305,0 0,0.8954305 0,2 L0,10 C0,11.1045695 0.8954305,12 2,12 L10,12 C11.1045695,12 12,11.1045695 12,10 L12,8 L10,8 L10,10 Z" />
      </g>
    </g>
  </svg>
);
