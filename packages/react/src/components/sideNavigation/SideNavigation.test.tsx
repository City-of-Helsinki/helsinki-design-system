import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { SideNavigation } from './SideNavigation';
import { IconHome } from '../../icons';

const labels = {
  mainLevel1: 'Main level 1',
  mainLevel2: 'Main level 2',
  mainLevel3: 'Main level 3',
  subLevel1: 'Sub level 1',
  subLevel2: 'Sub level 2',
  toggleButton: 'Navigate to page',
};
const url = '#';

const renderSideNavigation = () =>
  render(
    <SideNavigation id="sideNavigation" toggleButtonLabel={labels.toggleButton}>
      <SideNavigation.MainLevel id="mainLevel1" icon={<IconHome />} label={labels.mainLevel1}>
        <SideNavigation.SubLevel id="subLevel1" active href={url} label={labels.subLevel1} />
      </SideNavigation.MainLevel>
      <SideNavigation.MainLevel
        id="mainLevel2"
        href={url}
        icon={<IconHome />}
        label={labels.mainLevel2}
        external
        openInNewTab
        openInNewTabAriaLabel="Opens in a new tab."
        openInExternalDomainAriaLabel="Url points to external website."
      />
    </SideNavigation>,
  );

const queryButton = (key: string) => screen.queryByRole('button', { name: labels[key] });
const queryLink = (key: string) => screen.queryByRole('link', { name: labels[key] });

describe('<SideNavigation /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = renderSideNavigation();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = renderSideNavigation();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should open main level if sub level is active', () => {
    render(
      <SideNavigation id="sideNavigation" toggleButtonLabel={labels.toggleButton}>
        <SideNavigation.MainLevel id="mainLevel1" icon={<IconHome />} label={labels.mainLevel1}>
          <SideNavigation.SubLevel id="subLevel1" label={labels.subLevel1} href={url} />
        </SideNavigation.MainLevel>
        <SideNavigation.MainLevel id="mainLevel2" icon={<IconHome />} label={labels.mainLevel2}>
          <SideNavigation.SubLevel active id="subLevel2" label={labels.subLevel2} href={url} />
        </SideNavigation.MainLevel>
      </SideNavigation>,
    );

    expect(queryLink('subLevel1')).not.toBeInTheDocument();
    expect(queryLink('subLevel2')).toBeInTheDocument();
  });

  it('should show sub levels if main level is active', () => {
    render(
      <SideNavigation id="sideNavigation" toggleButtonLabel={labels.toggleButton}>
        <SideNavigation.MainLevel id="mainLevel1" icon={<IconHome />} label={labels.mainLevel1}>
          <SideNavigation.SubLevel id="subLevel1" label={labels.subLevel1} href={url} />
        </SideNavigation.MainLevel>
        <SideNavigation.MainLevel active id="mainLevel2" icon={<IconHome />} label={labels.mainLevel2}>
          <SideNavigation.SubLevel id="subLevel2" label={labels.subLevel2} href={url} />
        </SideNavigation.MainLevel>
        <SideNavigation.MainLevel id="mainLevel3" icon={<IconHome />} label={labels.mainLevel3} href={url} />
      </SideNavigation>,
    );

    expect(queryLink('subLevel1')).not.toBeInTheDocument();
    expect(queryLink('subLevel2')).toBeInTheDocument();
  });

  it('should open default main levels', () => {
    render(
      <SideNavigation id="sideNavigation" defaultOpenMainLevels={[1]} toggleButtonLabel={labels.toggleButton}>
        <SideNavigation.MainLevel id="mainLevel1" icon={<IconHome />} label={labels.mainLevel1}>
          <SideNavigation.SubLevel id="subLevel1" label={labels.subLevel1} href={url} />
        </SideNavigation.MainLevel>
        <SideNavigation.MainLevel id="mainLevel2" icon={<IconHome />} label={labels.mainLevel2}>
          <SideNavigation.SubLevel id="subLevel2" label={labels.subLevel2} href={url} />
        </SideNavigation.MainLevel>
      </SideNavigation>,
    );

    expect(queryLink('subLevel1')).not.toBeInTheDocument();
    expect(queryLink('subLevel2')).toBeInTheDocument();
  });

  it('should open and close main levels', () => {
    render(
      <SideNavigation id="sideNavigation" toggleButtonLabel={labels.toggleButton}>
        <SideNavigation.MainLevel id="mainLevel1" icon={<IconHome />} label={labels.mainLevel1}>
          <SideNavigation.SubLevel id="subLevel1" label={labels.subLevel1} href={url} />
        </SideNavigation.MainLevel>
        <SideNavigation.MainLevel id="mainLevel2" icon={<IconHome />} label={labels.mainLevel2}>
          <SideNavigation.SubLevel id="subLevel2" label={labels.subLevel2} href={url} />
        </SideNavigation.MainLevel>
      </SideNavigation>,
    );

    const mainLevelButton1 = queryButton('mainLevel1');
    const mainLevelButton2 = queryButton('mainLevel2');

    expect(mainLevelButton1).toHaveAttribute('aria-expanded', 'false');
    expect(queryLink('subLevel1')).not.toBeInTheDocument();
    expect(queryLink('subLevel2')).not.toBeInTheDocument();

    userEvent.click(mainLevelButton1);
    expect(mainLevelButton1).toHaveAttribute('aria-expanded', 'true');
    expect(queryLink('subLevel1')).toBeInTheDocument();
    expect(queryLink('subLevel2')).not.toBeInTheDocument();

    userEvent.click(mainLevelButton2);
    expect(mainLevelButton2).toHaveAttribute('aria-expanded', 'true');
    expect(queryLink('subLevel1')).toBeInTheDocument();
    expect(queryLink('subLevel2')).toBeInTheDocument();

    userEvent.click(mainLevelButton2);
    expect(mainLevelButton2).toHaveAttribute('aria-expanded', 'false');
    expect(queryLink('subLevel1')).toBeInTheDocument();
    expect(queryLink('subLevel2')).not.toBeInTheDocument();

    userEvent.click(mainLevelButton1);
    expect(mainLevelButton1).toHaveAttribute('aria-expanded', 'false');
    expect(queryLink('subLevel1')).not.toBeInTheDocument();
    expect(queryLink('subLevel2')).not.toBeInTheDocument();
  });
});
