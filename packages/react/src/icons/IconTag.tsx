import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" className={className}>
    <g strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-20.000000, -197.000000)">
        <g transform="translate(0.000000, 186.000000)">
          <g transform="translate(20.000000, 11.000000)">
            <polygon
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0.75 0.75 10.5 0.75 23.25 13.5 13.5 23.25 0.75 10.5"
            />
            <circle fillRule="nonzero" cx="6" cy="6" r="1.5" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
