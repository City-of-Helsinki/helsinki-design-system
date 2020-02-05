import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" className={className}>
    <g id="prefix__prefix__Mask">
      <path d="M18.9 4.2c1.6 0 2.8 1.2 2.8 2.8v6.7c0 1.6-1.2 2.8-2.8 2.8h-1.1c-1 0-2 .3-2.8.9-.8-.6-1.8-.9-2.8-.9H5.5c-1.6 0-2.8-1.2-2.8-2.8V7c0-1.6 1.2-2.8 2.8-2.8h13.4zm0-1.7H5.5C3 2.5 1 4.5 1 7v6.7c0 2.5 1.9 4.5 4.5 4.5h6.7c.9 0 1.7.3 2.3 1l.5.5.5-.5c.6-.6 1.5-1 2.3-1h1.1c2.5 0 4.5-1.9 4.5-4.5V7c0-2.5-2-4.5-4.5-4.5z" />
      <path d="M5.7 9h13V7.3h-13z" />
      <path d="M5.7 13.4h13v-1.6h-13z" />
    </g>
  </svg>
);
