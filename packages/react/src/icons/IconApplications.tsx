import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" className={className}>
    <path
      d="M18 .5v22H0v-14h1.741v12.35h14.517V2.15H9V.5h9zm-3.4 17v1.7H3v-1.7h11.6zm-7.6-3v1.7H3v-1.7h4zM1.262 2.58l4.444 4.445 3.032-3.03L9.95 5.207l-3.032 3.03h.001L5.707 9.45.05 3.793 1.262 2.58z"
      fillRule="evenodd"
    />
  </svg>
);
