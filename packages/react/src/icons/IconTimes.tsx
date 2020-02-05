import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 480 480" className={className}>
    <path d="M374.8 167.6l-30.4-30.4-88.4 88.4-88.4-88.4-30.4 30.4 88.4 88.4-88.4 88.4 30.4 30.4 88.4-88.4 88.4 88.4 30.4-30.4-88.4-88.4z" />
  </svg>
);
