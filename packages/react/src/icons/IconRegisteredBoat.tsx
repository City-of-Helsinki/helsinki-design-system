import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 480 480" className={className}>
    <path d="M427.84 142H107.16A36.2 36.2 0 0 0 71 178.16v186.68A36.2 36.2 0 0 0 107.16 401h320.68A36.2 36.2 0 0 0 464 364.84V178.16A36.2 36.2 0 0 0 427.84 142zM448 364.84A20.18 20.18 0 0 1 427.84 385H107.16A20.18 20.18 0 0 1 87 364.84V259h361zM448 243H87v-41h361zM87 186v-7.84A20.18 20.18 0 0 1 107.16 158h320.68A20.18 20.18 0 0 1 448 178.16V186z" />
    <path d="M135 293h149v16H135zM135 338h199v16H135z" />
  </svg>
);
