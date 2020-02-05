import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 199.404 199.404"
    className={className}
  >
    <g>
      <polygon points="0,135.411 28.285,163.695 99.703,92.277 171.119,163.695 199.404,135.412 99.703,35.709  " />
    </g>
  </svg>
);
