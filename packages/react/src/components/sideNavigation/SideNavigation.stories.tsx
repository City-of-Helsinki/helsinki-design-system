import React from 'react';

import { SideNavigation } from './SideNavigation';
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

enum ID {
  MAIN_LEVEL_1 = '#main-level-1',
  MAIN_LEVEL_2 = '#main-level-2',
  MAIN_LEVEL_3 = '#main-level-3',
  MAIN_LEVEL_4 = '#main-level-4',
  SUB_LEVEL_1 = '#sub-level-1',
  SUB_LEVEL_2 = '#sub-level-2',
  SUB_LEVEL_3 = '#sub-level-3',
  SUB_LEVEL_4 = '#sub-level-4',
}

const labels = {
  mainLevel1: 'Main level accordion',
  mainLevel2: 'Main level accordion',
  mainLevel3: 'Main level link',
  mainLevel4: 'Main level external link',
  subLevel1: 'Sub level link',
  subLevel2: 'Sub level link',
  subLevel3: 'Sub level link',
  subLevel4: 'Sub level link',
};

const handleClick = (setActive) => (ev) => {
  ev.preventDefault();
  setActive(ev.currentTarget.getAttribute('id') as ID);
};

export const Default = (args) => {
  const [active, setActive] = React.useState(ID.SUB_LEVEL_1);

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
            <SideNavigation.MainLevel id={ID.MAIN_LEVEL_1} label={labels.mainLevel1}>
              <SideNavigation.SubLevel
                active={ID.SUB_LEVEL_1 === active}
                id={ID.SUB_LEVEL_1}
                href={ID.SUB_LEVEL_1}
                label={labels.subLevel1}
                onClick={handleClick(setActive)}
              />
              <SideNavigation.SubLevel
                active={ID.SUB_LEVEL_2 === active}
                id={ID.SUB_LEVEL_2}
                href={ID.SUB_LEVEL_2}
                label={labels.subLevel2}
                onClick={handleClick(setActive)}
              />
            </SideNavigation.MainLevel>
            <SideNavigation.MainLevel id={ID.MAIN_LEVEL_2} label={labels.mainLevel2}>
              <SideNavigation.SubLevel
                active={ID.SUB_LEVEL_3 === active}
                id={ID.SUB_LEVEL_3}
                href={ID.SUB_LEVEL_3}
                label={labels.subLevel3}
                onClick={handleClick(setActive)}
              />
              <SideNavigation.SubLevel
                active={ID.SUB_LEVEL_4 === active}
                id={ID.SUB_LEVEL_4}
                href={ID.SUB_LEVEL_4}
                label={labels.subLevel4}
                onClick={handleClick(setActive)}
              />
            </SideNavigation.MainLevel>
            <SideNavigation.MainLevel
              active={ID.MAIN_LEVEL_3 === active}
              id={ID.MAIN_LEVEL_3}
              href={ID.MAIN_LEVEL_3}
              label={labels.mainLevel3}
              onClick={handleClick(setActive)}
            />
            <SideNavigation.MainLevel
              id={ID.MAIN_LEVEL_4}
              href={ID.MAIN_LEVEL_4}
              label={labels.mainLevel4}
              external
              openInExternalDomainAriaLabel="Opens a different website"
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

export const WithIcons = (args) => {
  const [active, setActive] = React.useState(ID.SUB_LEVEL_2);

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
            <SideNavigation.MainLevel id={ID.MAIN_LEVEL_1} label={labels.mainLevel1} icon={<IconHome aria-hidden />}>
              <SideNavigation.SubLevel
                active={ID.SUB_LEVEL_1 === active}
                id={ID.SUB_LEVEL_1}
                href={ID.SUB_LEVEL_1}
                label={labels.subLevel1}
                onClick={handleClick(setActive)}
              />
              <SideNavigation.SubLevel
                active={ID.SUB_LEVEL_2 === active}
                id={ID.SUB_LEVEL_2}
                href={ID.SUB_LEVEL_2}
                label={labels.subLevel2}
                onClick={handleClick(setActive)}
              />
            </SideNavigation.MainLevel>
            <SideNavigation.MainLevel id={ID.MAIN_LEVEL_2} label={labels.mainLevel2} icon={<IconHome aria-hidden />}>
              <SideNavigation.SubLevel
                active={ID.SUB_LEVEL_3 === active}
                id={ID.SUB_LEVEL_3}
                href={ID.SUB_LEVEL_3}
                label={labels.subLevel3}
                onClick={handleClick(setActive)}
              />
              <SideNavigation.SubLevel
                active={ID.SUB_LEVEL_4 === active}
                id={ID.SUB_LEVEL_4}
                href={ID.SUB_LEVEL_4}
                label={labels.subLevel4}
                onClick={handleClick(setActive)}
              />
            </SideNavigation.MainLevel>
            <SideNavigation.MainLevel
              active={ID.MAIN_LEVEL_3 === active}
              id={ID.MAIN_LEVEL_3}
              href={ID.MAIN_LEVEL_3}
              label={labels.mainLevel3}
              onClick={handleClick(setActive)}
              icon={<IconHome aria-hidden />}
            />
            <SideNavigation.MainLevel
              id={ID.MAIN_LEVEL_4}
              href={ID.MAIN_LEVEL_4}
              label={labels.mainLevel4}
              external
              openInExternalDomainAriaLabel="Opens a different website"
              onClick={handleClick(setActive)}
              withDivider
            />
          </SideNavigation>
        </div>
        <main>PageContent</main>
      </div>
    </>
  );
};

export const CustomTheme = (args) => Default(args);
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
