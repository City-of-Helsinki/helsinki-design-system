import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 480 480" className={className}>
    <path d="M256 76.76a66.62 66.62 0 1 1-66.62 66.62A66.69 66.69 0 0 1 256 76.76m0-32a98.6 98.6 0 1 0 98.59 98.6A98.59 98.59 0 0 0 256 44.78zM341.27 300.59a64 64 0 0 1 64 64v63.95H106.78v-63.99a64 64 0 0 1 64-64h170.49m0-32H170.74a95.94 95.94 0 0 0-95.94 96v95.92h362.4v-95.93a95.93 95.93 0 0 0-95.93-95.93z" />
  </svg>
);
