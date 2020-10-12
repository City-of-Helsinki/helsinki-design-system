import React, { PropsWithChildren } from 'react';

import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';

export const NavigationWrapper = ({ children }: PropsWithChildren<{}>) => (
  <Navigation
    menuCloseAriaLabel="close"
    menuOpenAriaLabel="open"
    skipTo="#content"
    skipToContentLabel="Skip to content"
    title="Foo"
  >
    {children}
  </Navigation>
);

export const FooterWrapper = ({ children }: PropsWithChildren<{}>) => <Footer title="Bar">{children}</Footer>;
