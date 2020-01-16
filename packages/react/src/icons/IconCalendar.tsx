import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 26 26" className={className}>
    <g strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-785.000000, -171.000000)" strokeWidth="2">
        <g transform="translate(773.000000, 129.000000)">
          <g transform="translate(13.000000, 43.000000)">
            <circle strokeLinecap="square" cx="17.6" cy="18.4" r="5.6" />
            <polyline strokeLinecap="square" points="17.6 16 17.6 18.4 20 18.4" />
            <line x1="6.4" y1="0" x2="6.4" y2="3.2" strokeOpacity="0.8" strokeLinecap="square" />
            <line x1="17.6" y1="0" x2="17.6" y2="3.2" strokeOpacity="0.8" strokeLinecap="square" />
            <line x1="24" y1="8" x2="0" y2="8" />
            <polyline strokeLinecap="square" points="8.8 22.4 0 22.4 0 3.2 24 3.2 24 11.2" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
