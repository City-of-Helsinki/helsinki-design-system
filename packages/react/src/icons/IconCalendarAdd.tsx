import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 27 26" className={className}>
    <g strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-49.000000, -1173.000000)" strokeWidth="2">
        <g transform="translate(25.000000, 850.000000)">
          <g transform="translate(25.000000, 324.000000)">
            <line x1="12.5" y1="19.1666667" x2="12.5" y2="12.5" strokeLinecap="square" />
            <line x1="15.8333333" y1="15.8333333" x2="9.16666667" y2="15.8333333" strokeLinecap="square" />
            <line x1="25" y1="8.33333333" x2="0" y2="8.33333333" />
            <rect strokeLinecap="square" x="0" y="3.33333333" width="25" height="20" />
            <line x1="6.66666667" y1="0" x2="6.66666667" y2="3.33333333" strokeLinecap="square" />
            <line x1="18.3333333" y1="0" x2="18.3333333" y2="3.33333333" strokeLinecap="square" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
