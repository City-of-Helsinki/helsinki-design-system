import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 480 480" className={className}>
    <path d="M159.86 380.84h42v74.41h-42zM327.33 142.77H262.1v-81h-32v81h-98.47v-81h-32v81H34.39v32H67v48.82a111.59 111.59 0 0 0 21.6 65.91 119.83 119.83 0 0 0 43.63 36.86v42.86h97.24v-42.5a113.69 113.69 0 0 0 65.23-103.13v-48.82h32.62zm-64.62 80.82c0 34.94-21.88 66-54.46 77.24l-10.77 3.72v32.67h-33.24V305L154 301c-32.91-12.8-55-43.92-55-77.45v-48.78h163.7z" />
  </svg>
);
