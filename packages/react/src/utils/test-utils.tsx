import React, { PropsWithChildren } from 'react';

import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';

export const NavigationWrapper = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <Navigation menuToggleAriaLabel="menu" skipTo="#content" skipToContentLabel="Skip to content" title="Foo">
    {children}
  </Navigation>
);

export const FooterWrapper = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <Footer title="Bar">{children}</Footer>
);
