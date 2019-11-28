import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 23 23" className={className}>
    <path
      fillRule="evenodd"
      d="M11.5 0C17.85 0 23 5.148 23 11.5 23 17.85 17.85 23 11.5 23 5.148 23 0 17.85 0 11.5 0 5.148 5.148 0 11.5 0zm0 2.464c-4.981 0-9.035 4.054-9.035 9.036 0 4.982 4.054 9.036 9.035 9.036s9.035-4.054 9.035-9.036c0-4.982-4.054-9.036-9.035-9.036zm1.232 12.184v2.381h-2.464v-2.38l2.464-.001zm0-9.916v7.783h-2.464V4.733h2.464z"
    />
  </svg>
);
