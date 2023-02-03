import React, { PropsWithChildren } from 'react';

import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

type WrapperProps = PropsWithChildren<Record<string, unknown>>;

export const NavigationWrapper = ({ children }: WrapperProps) => (
  <Navigation menuToggleAriaLabel="menu" skipTo="#content" skipToContentLabel="Skip to content" title="Foo">
    {children}
  </Navigation>
);

export const FooterWrapper = ({ children }: WrapperProps) => <Footer title="Bar">{children}</Footer>;

export const HeaderWrapper = ({ children }: WrapperProps) => <Header>{children}</Header>;

export const HeaderNavigationMenuWrapper = ({ children }: WrapperProps) => (
  <Header>
    <Header.NavigationMenu>{children}</Header.NavigationMenu>
  </Header>
);
