import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 30 25" className={className}>
    <g fillRule="evenodd">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        d="M16.457 2.108L28.033 20.35a1.8 1.8 0 0 1-1.52 2.765H3.362a1.8 1.8 0 0 1-1.52-2.765l11.576-18.24a1.8 1.8 0 0 1 3.04 0z"
      />
      <path d="M16.5 16.916v2.38H14v-2.38h2.5zM16.5 7v7.783H14V7.001L16.5 7z" />
    </g>
  </svg>
);
