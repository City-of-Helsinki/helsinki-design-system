import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 480 480" className={className}>
    <path d="M454 113.58h-36v-36h36zm-72 0h-36v-36h36zm-72 0h-36v-36h36zm-72 0h-36v-36h36zm-72 0h-36v-36h36zm-72 0H58v-36h36zm360 320.84h-36v-36h36zm-72 0h-36v-36h36zm-72 0h-36v-36h36zm-72 0h-36v-36h36zm-72 0h-36v-36h36zm-72 0H58v-36h36zm143.43-285.07h36v213.38h-36zm-179.43 0h36v213.38H58zm359.85 0h36v213.38h-36z" />
  </svg>
);
