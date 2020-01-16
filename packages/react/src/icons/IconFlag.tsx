import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 18 24"
    version="1.1"
    className={className}
  >
    <g strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <g transform="translate(-21.000000, -61.000000)">
        <g transform="translate(0.000000, 50.000000)">
          <g transform="translate(21.000000, 11.000000)">
            <polyline points="0.75 2.25 17.25 2.25 14.25 8.25 17.25 14.25 0.75 14.25" />
            <line x1="0.75" y1="0.75" x2="0.75" y2="23.25" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
