import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { SideNavigation } from './SideNavigation';
import { MainLevel } from './mainLevel/MainLevel';
import { SubLevel } from './subLevel/SubLevel';
import { IconFaceNeutral } from '../../icons';

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
      <MainLevel id="mainLevel1" icon={<IconFaceNeutral />} label={labels.mainLevel1}>
        <SubLevel id="subLevel1" active href={url} label={labels.subLevel1} />
      </MainLevel>
      <MainLevel id="mainLevel2" href={url} icon={<IconFaceNeutral />} label={labels.mainLevel2} />
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

  test('should open main level if sub level is active', () => {
    render(
      <SideNavigation id="sideNavigation" toggleButtonLabel={labels.toggleButton}>
        <MainLevel id="mainLevel1" icon={<IconFaceNeutral />} label={labels.mainLevel1}>
          <SubLevel id="subLevel1" label={labels.subLevel1} href={url} />
        </MainLevel>
        <MainLevel id="mainLevel2" icon={<IconFaceNeutral />} label={labels.mainLevel2}>
          <SubLevel active id="subLevel2" label={labels.subLevel2} href={url} />
        </MainLevel>
      </SideNavigation>,
    );

    expect(queryLink('subLevel1')).not.toBeInTheDocument();
    expect(queryLink('subLevel2')).toBeInTheDocument();
  });

  test('should show sub levels if main level is active', () => {
    render(
      <SideNavigation id="sideNavigation" toggleButtonLabel={labels.toggleButton}>
        <MainLevel id="mainLevel1" icon={<IconFaceNeutral />} label={labels.mainLevel1}>
          <SubLevel id="subLevel1" label={labels.subLevel1} href={url} />
        </MainLevel>
        <MainLevel active id="mainLevel2" icon={<IconFaceNeutral />} label={labels.mainLevel2}>
          <SubLevel id="subLevel2" label={labels.subLevel2} href={url} />
        </MainLevel>
        <MainLevel id="mainLevel3" icon={<IconFaceNeutral />} label={labels.mainLevel3} href={url} />
      </SideNavigation>,
    );

    expect(queryLink('subLevel1')).not.toBeInTheDocument();
    expect(queryLink('subLevel2')).toBeInTheDocument();
  });

  test('should open default main levels', () => {
    render(
      <SideNavigation id="sideNavigation" defaultOpenMainLevels={[1]} toggleButtonLabel={labels.toggleButton}>
        <MainLevel id="mainLevel1" icon={<IconFaceNeutral />} label={labels.mainLevel1}>
          <SubLevel id="subLevel1" label={labels.subLevel1} href={url} />
        </MainLevel>
        <MainLevel id="mainLevel2" icon={<IconFaceNeutral />} label={labels.mainLevel2}>
          <SubLevel id="subLevel2" label={labels.subLevel2} href={url} />
        </MainLevel>
      </SideNavigation>,
    );

    expect(queryLink('subLevel1')).not.toBeInTheDocument();
    expect(queryLink('subLevel2')).toBeInTheDocument();
  });

  test('should open and close main levels', () => {
    render(
      <SideNavigation id="sideNavigation" toggleButtonLabel={labels.toggleButton}>
        <MainLevel id="mainLevel1" icon={<IconFaceNeutral />} label={labels.mainLevel1}>
          <SubLevel id="subLevel1" label={labels.subLevel1} href={url} />
        </MainLevel>
        <MainLevel id="mainLevel2" icon={<IconFaceNeutral />} label={labels.mainLevel2}>
          <SubLevel id="subLevel2" label={labels.subLevel2} href={url} />
        </MainLevel>
      </SideNavigation>,
    );

    expect(queryLink('subLevel1')).not.toBeInTheDocument();
    expect(queryLink('subLevel2')).not.toBeInTheDocument();

    userEvent.click(queryButton('mainLevel1'));
    expect(queryLink('subLevel1')).toBeInTheDocument();
    expect(queryLink('subLevel2')).not.toBeInTheDocument();

    userEvent.click(queryButton('mainLevel2'));
    expect(queryLink('subLevel1')).toBeInTheDocument();
    expect(queryLink('subLevel2')).toBeInTheDocument();

    userEvent.click(queryButton('mainLevel2'));
    expect(queryLink('subLevel1')).toBeInTheDocument();
    expect(queryLink('subLevel2')).not.toBeInTheDocument();

    userEvent.click(queryButton('mainLevel1'));
    expect(queryLink('subLevel1')).not.toBeInTheDocument();
    expect(queryLink('subLevel2')).not.toBeInTheDocument();
  });
});
