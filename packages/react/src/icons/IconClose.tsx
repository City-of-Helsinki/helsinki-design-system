import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 15 15" className={className}>
    <path
      fillRule="nonzero"
      d="M13.412 0L15 1.588 9.088 7.5 15 13.412 13.412 15 7.5 9.088 1.588 15 0 13.412 5.911 7.5 0 1.588 1.588 0 7.5 5.912 13.412 0z"
    />
  </svg>
);
