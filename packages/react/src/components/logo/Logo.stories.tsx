import React from 'react';

import { Logo, LogoSize, logoFi, logoSv, logoRu, LogoProps } from './Logo';

export default {
  component: Logo,
  title: 'Components/Logo',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Default = () => <Logo size={LogoSize.Full} src={logoFi} alt="Helsingin kaupunki" />;

export const Swedish = () => <Logo size={LogoSize.Full} src={logoSv} alt="Helsingfors stad" />;

export const Small = () => <Logo size={LogoSize.Small} src={logoFi} alt="Helsingin kaupunki" />;

export const Playground = (args: LogoProps & Record<string, string>) => <Logo {...args} />;

Playground.args = {
  size: LogoSize.Full,
  src: logoFi,
  alt: 'Helsingin kaupunki',
  'aria-hidden': false,
};

Playground.argTypes = {
  size: {
    options: [LogoSize.Full, LogoSize.Small, LogoSize.Medium, LogoSize.Large],
    control: { type: 'radio' },
  },
  src: {
    options: [logoFi, logoSv, logoRu],
    control: { type: 'radio' },
  },
  'aria-hidden': {
    options: [true, false],
    control: { type: 'radio' },
  },
};
