import React, { PropsWithChildren } from 'react';

import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Logo } from '../components/logo';

type WrapperProps = PropsWithChildren<Record<string, unknown>>;

export const NavigationWrapper = ({ children }: WrapperProps) => (
  <Navigation
    menuToggleAriaLabel="menu"
    skipTo="#content"
    skipToContentLabel="Skip to content"
    title="Foo"
    logo={<Logo src="dummySrc" />}
  >
    {children}
  </Navigation>
);

export const FooterWrapper = ({ children }: WrapperProps) => <Footer title="Bar">{children}</Footer>;

export const FooterNavigationWrapper = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <Footer title="Bar">
    <Footer.Navigation>{children}</Footer.Navigation>
  </Footer>
);

export const FooterNavigationGroupsWrapper = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <Footer title="Bar">
    <Footer.Navigation>
      <Footer.NavigationGroup headingLink={<Footer.GroupHeading href="https://google.com" label="Main Page" />}>
        {children}
      </Footer.NavigationGroup>
    </Footer.Navigation>
  </Footer>
);

export const FooterUtilitiesWrapper = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <Footer title="Bar">
    <Footer.Utilities>{children}</Footer.Utilities>
  </Footer>
);

export const HeaderWrapper = ({ children }: WrapperProps) => <Header>{children}</Header>;

export const HeaderNavigationMenuWrapper = ({ children }: WrapperProps) => (
  <Header>
    <Header.NavigationMenu>{children}</Header.NavigationMenu>
  </Header>
);
