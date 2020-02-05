import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" className={className}>
    <path
      d="M1.741 9.5v10.35h14.517V9.5H18v12H0v-12h1.741zm12.859 7v1.7H3v-1.7h11.6zm0-3v1.7H3v-1.7h11.6zM8.385.5l1.492.022v6.104l3.249-3.26.966 1.117-4.96 5-5.132-5 .986-1.116 3.4 3.258V.5z"
      fillRule="evenodd"
    />
  </svg>
);
