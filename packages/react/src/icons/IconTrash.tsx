import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 480 480" className={className}>
    <path d="M350.66 70.31a123.85 123.85 0 0 1-83-31.75L256 28.08l-11.65 10.48a123.85 123.85 0 0 1-83 31.75H93.44l3.07 34.84h64.84A158.75 158.75 0 0 0 256 74a158.75 158.75 0 0 0 94.66 31.17h64.83l3.07-34.84zM128.28 465.13h255.45L412.36 140H99.59zm246.05-290.29l-22.5 255.45H311l7.35-220.62h-34.89l-7.34 220.62h-40.24l-7.34-220.62h-34.86L201 430.29h-40.83l-22.54-255.45z" />
  </svg>
);
