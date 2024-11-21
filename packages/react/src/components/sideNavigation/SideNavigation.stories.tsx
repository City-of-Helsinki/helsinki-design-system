import React from 'react';

import { SideNavigation, SideNavigationProps } from './SideNavigation';
import { IconHome } from '../../icons';

export default {
  component: SideNavigation,
  decorators: [
    (storyFn) => (
      <div style={{ backgroundColor: '#f5f5f5', display: 'grid', minHeight: '100vh' }}>
        <div style={{ height: '100%' }}>{storyFn()}</div>
      </div>
    ),
  ],
  title: 'Components/SideNavigation',
  parameters: {
    controls: { expanded: true },
  },
  args: { defaultOpenMainLevels: [], toggleButtonLabel: 'Navigate to page', id: 'side-navigation' },
};

const handleClick = (setActive) => (ev) => {
  ev.preventDefault();
  setActive(ev.currentTarget.getAttribute('href'));
};

export const Default = (args: SideNavigationProps) => {
  const [active, setActive] = React.useState('/sub-level-1');

  return (
    <>
      <style>
        {`
        @media only screen and (min-width: ${getComputedStyle(document.documentElement).getPropertyValue(
          '--breakpoint-m',
        )}) {
          .example-page {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-gap: 1rem;
          }

          .example-page-side-navigation {
            grid-column: 1/4;
          }
        }
      `}
      </style>
      <div className="example-page">
        <div className="example-page-side-navigation">
          <SideNavigation aria-label="Getting started" {...args}>
            <SideNavigation.MainLevel id="main-level-link-1" label="Main level accordion">
              <SideNavigation.SubLevel
                active={active === '/sub-level-1'}
                id="sub-level-link-1"
                href="/sub-level-1"
                label="Sub level link"
                onClick={handleClick(setActive)}
              />
              <SideNavigation.SubLevel
                active={active === '/sub-level-2'}
                id="sub-level-link-2"
                href="/sub-level-2"
                label="Sub level link"
                onClick={handleClick(setActive)}
              />
            </SideNavigation.MainLevel>
            <SideNavigation.MainLevel id="main-level-link-2" label="Main level accordion">
              <SideNavigation.SubLevel
                active={active === '/sub-level-3'}
                id="sub-level-link-3"
                href="/sub-level-3"
                label="Sub level link"
                onClick={handleClick(setActive)}
              />
              <SideNavigation.SubLevel
                active={active === '/sub-level-4'}
                id="sub-level-link-4"
                href="/sub-level-4"
                label="Sub level link"
                onClick={handleClick(setActive)}
              />
            </SideNavigation.MainLevel>
            <SideNavigation.MainLevel
              active={active === '/main-level-3'}
              id="main-level-link-3"
              href="/main-level-3"
              label="Main level link"
              onClick={handleClick(setActive)}
            />
            <SideNavigation.MainLevel
              id="main-level-link-4"
              href="external-address"
              label="Main level external link"
              external
              openInNewTab
              openInNewTabAriaLabel="Opens in a new tab."
              openInExternalDomainAriaLabel="Opens a different website."
              onClick={handleClick(setActive)}
              withDivider
            />
          </SideNavigation>
        </div>
        <main>Page Content</main>
      </div>
    </>
  );
};

export const WithIcons = (args: SideNavigationProps) => {
  const [active, setActive] = React.useState('/sub-level-2');

  return (
    <>
      <style>
        {`
        @media only screen and (min-width: ${getComputedStyle(document.documentElement).getPropertyValue(
          '--breakpoint-m',
        )}) {
          .example-page {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-gap: 1rem;
          }

          .example-page-side-navigation {
            grid-column: 1/4;
          }
        }
      `}
      </style>
      <div className="example-page">
        <div className="example-page-side-navigation">
          <SideNavigation {...args}>
            <SideNavigation.MainLevel id="main-level-link-1" label="Main level accordion" icon={<IconHome />}>
              <SideNavigation.SubLevel
                active={active === '/sub-level-1'}
                id="sub-level-link-1"
                href="/sub-level-1"
                label="Sub level link"
                onClick={handleClick(setActive)}
              />
              <SideNavigation.SubLevel
                active={active === '/sub-level-2'}
                id="sub-level-link-2"
                href="/sub-level-2"
                label="Sub level link"
                onClick={handleClick(setActive)}
              />
            </SideNavigation.MainLevel>
            <SideNavigation.MainLevel id="main-level-link-2" label="Main level accordion" icon={<IconHome />}>
              <SideNavigation.SubLevel
                active={active === '/sub-level-3'}
                id="sub-level-link-3"
                href="/sub-level-3"
                label="Sub level link"
                onClick={handleClick(setActive)}
              />
              <SideNavigation.SubLevel
                active={active === '/sub-level-4'}
                id="sub-level-link-4"
                href="/sub-level-4"
                label="Sub level link"
                onClick={handleClick(setActive)}
              />
            </SideNavigation.MainLevel>
            <SideNavigation.MainLevel
              active={active === '/main-level-3'}
              id="main-level-link-3"
              href="/main-level-3"
              label="Main level link"
              onClick={handleClick(setActive)}
              icon={<IconHome />}
            />
            <SideNavigation.MainLevel
              id="main-level-link-4"
              href="external-address"
              label="Main level external link"
              external
              openInNewTab
              openInNewTabAriaLabel="Opens in a new tab."
              openInExternalDomainAriaLabel="Opens a different website."
              onClick={handleClick(setActive)}
              withDivider
            />
          </SideNavigation>
        </div>
        <main>Page Content</main>
      </div>
    </>
  );
};

const skipLinkTheme = {
  '--left': '0px',
  '--top': '0px',
};

export const WithSkipLink = (args: SideNavigationProps) => {
  const [active, setActive] = React.useState('/sub-level-1');

  return (
    <>
      <style>
        {`
        @media only screen and (min-width: ${getComputedStyle(document.documentElement).getPropertyValue(
          '--breakpoint-m',
        )}) {
          .example-page {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-gap: 1rem;
          }

          .example-page-side-navigation {
            grid-column: 1/4;
          }
        }
      `}
      </style>

      <div className="example-page">
        <div className="example-page-side-navigation">
          <SideNavigation aria-label="Getting started" {...args}>
            <SideNavigation.SkipLink skipTo="#content" label="Skip Navigation" theme={skipLinkTheme} />
            <SideNavigation.MainLevel id="main-level-link-1" label="Main level accordion">
              <SideNavigation.SubLevel
                active={active === '/sub-level-1'}
                id="sub-level-link-1"
                href="/sub-level-1"
                label="Sub level link"
                onClick={handleClick(setActive)}
              />
              <SideNavigation.SubLevel
                active={active === '/sub-level-2'}
                id="sub-level-link-2"
                href="/sub-level-2"
                label="Sub level link"
                onClick={handleClick(setActive)}
              />
            </SideNavigation.MainLevel>
            <SideNavigation.MainLevel id="main-level-link-2" label="Main level accordion">
              <SideNavigation.SubLevel
                active={active === '/sub-level-3'}
                id="sub-level-link-3"
                href="/sub-level-3"
                label="Sub level link"
                onClick={handleClick(setActive)}
              />
              <SideNavigation.SubLevel
                active={active === '/sub-level-4'}
                id="sub-level-link-4"
                href="/sub-level-4"
                label="Sub level link"
                onClick={handleClick(setActive)}
              />
            </SideNavigation.MainLevel>
            <SideNavigation.MainLevel
              active={active === '/main-level-3'}
              id="main-level-link-3"
              href="/main-level-3"
              label="Main level link"
              onClick={handleClick(setActive)}
            />
            <SideNavigation.MainLevel
              id="main-level-link-4"
              href="external-address"
              label="Main level external link"
              external
              openInNewTab
              openInNewTabAriaLabel="Opens in a new tab."
              openInExternalDomainAriaLabel="Opens a different website."
              onClick={handleClick(setActive)}
              withDivider
            />
          </SideNavigation>
        </div>
        <main>Page Content</main>
      </div>
    </>
  );
};

export const CustomTheme = (args: SideNavigationProps) => Default(args);
CustomTheme.args = {
  theme: {
    '--side-navigation-background-color': 'var(--color-white)',
    '--side-navigation-active-indicator-background-color': 'var(--color-gold)',
    '--side-navigation-icon-size': 'var(--spacing-m)',
    '--side-navigation-level-border-color': 'var(--color-white)',
    '--side-navigation-level-border-color-focus': 'var(--color-coat-of-arms)',
    '--side-navigation-level-border-color-hover': 'var(--color-fog-light)',
    '--side-navigation-level-background-color': 'var(--color-white)',
    '--side-navigation-level-background-color-active': 'var(--color-fog-light)',
    '--side-navigation-level-background-color-hover': 'var(--color-fog-light)',
    '--side-navigation-level-color': 'var(--color-black)',
    '--side-navigation-level-color-active': 'var(--color-black)',
    '--side-navigation-level-color-hover': 'var(--color-black)',
    '--side-navigation-mobile-menu-border-color': 'var(--color-black)',
    '--side-navigation-mobile-menu-z-index': 100,
  },
};
