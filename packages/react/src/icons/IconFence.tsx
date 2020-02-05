import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 480 480" className={className}>
    <path d="M410.18 85l-62 46.23v60.5h-25v-60.44L262.1 85l-62 46.23v60.5h-25v-60.44L114 85l-62 46.22v332.17h123.16V383.5h25v79.89h123.09V383.5h25v79.89h123.08v-332.1zm-178.06 62.27L262 125l29.3 22.18v44.52h-59.18zm59.13 76.45V351.5h-59.13V223.72zM143.16 431.39H84V147.27L113.87 125l29.29 22.18v44.52h-41v32h41v127.8h-41v32h41zm32-79.89V223.72h25V351.5zm116.09 79.89h-59.13V383.5h59.13zm32-79.89V223.72h25V351.5zm116.08 79.89h-59.12V383.5h39v-32h-39V223.72h39v-32h-39v-44.45L410 125l29.29 22.18z" />
  </svg>
);
