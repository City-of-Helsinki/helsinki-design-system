import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 23 23" className={className}>
    <path
      fillRule="evenodd"
      d="M11.5 23C5.148 23 0 17.852 0 11.5 0 5.15 5.148 0 11.5 0 17.85 0 23 5.15 23 11.5 23 17.852 17.85 23 11.5 23zm0-2.464c4.981 0 9.035-4.054 9.035-9.036 0-4.982-4.054-9.036-9.035-9.036S2.465 6.518 2.465 11.5c0 4.982 4.054 9.036 9.035 9.036zm1.232-13.184h-2.464V4.97h2.464v2.381zm0 9.916h-2.464V9.484h2.464v7.783z"
    />
  </svg>
);
