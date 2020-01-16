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
      <polygon points="135.412,0 35.709,99.702 135.412,199.404 163.695,171.119 92.277,99.702 163.695,28.285  " />
    </g>
  </svg>
);
