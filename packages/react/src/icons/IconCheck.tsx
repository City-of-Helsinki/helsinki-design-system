import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 15" className={className}>
    <path fillRule="evenodd" d="M7.143 15L0 7.799 2.021 5.76l5.122 5.163L17.979 0 20 2.038z" />
  </svg>
);
