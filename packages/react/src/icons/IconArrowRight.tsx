import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" className={className}>
    <g>
      <polygon points="13.3706831 2 11.5237192 3.84696395 18.0000474 10.3242884 2 10.3242884 2 12.937334 17.9990512 12.937334 11.5237192 19.412666 13.3706831 21.2586338 23 11.6293169" />
    </g>
  </svg>
);
