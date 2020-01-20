import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 26 26"
    fillRule="evenodd"
    className={className}
  >
    <path d="M9.8,24.406l-9.8,0l0,-21.2l6.4,0l0,-2.2l2,0l0,2.2l9.2,0l0,-2.2l2,0l0,2.2l6.4,0l0,21.2l-16.2,0Zm14.2,-14.4l-22,0l0,12.4l7.791,0l0,0l14.209,0l0,-12.4Zm-9.5,5.327l2.333,0l0,2l-2.333,0l0,2.334l-2,0l0,-2.334l-2.333,0l0,-2l2.333,0l0,-2.333l2,0l0,2.333Zm9.5,-10.127l-22,0l0,2.8l22,0l0,-2.8Z" />
  </svg>
);
