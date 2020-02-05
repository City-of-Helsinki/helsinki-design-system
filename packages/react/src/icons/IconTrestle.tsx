import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 480 480" className={className}>
    <path d="M386.18 428.65l33-14.47-99.78-227.27h56.29V83.35H134.31v103.56h58.29L140 306.83h-.27v.61L92.86 414.18l33 14.47 37.67-85.82h185zm-206.9-121.82l52.63-119.92h1.52v-3.46l.33-.75-.33-.14v-31.65h-63.12v-31.56h169.38v31.56h-60.92v31.56l-.53.23.53 1.2v3h1.32l52.63 119.92z" />
  </svg>
);
