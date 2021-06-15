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
    <SideNavigation toggleButtonLabel={labels.toggleButton}>
      <MainLevel href={url} icon={<IconFaceNeutral />} label={labels.mainLevel1}>
        <SubLevel active href={url} label={labels.subLevel1} />
      </MainLevel>
      <MainLevel href={url} icon={<IconFaceNeutral />} label={labels.mainLevel2} />
    </SideNavigation>,
  );

const getElement = (key: 'mainLevel1' | 'mainLevel2' | 'mainLevel3' | 'subLevel1' | 'subLevel2') => {
  switch (key) {
    case 'mainLevel1':
      return screen.getByRole('link', { name: labels.mainLevel1 });
    case 'mainLevel2':
      return screen.getByRole('link', { name: labels.mainLevel2 });
    case 'mainLevel3':
      return screen.getByRole('link', { name: labels.mainLevel3 });
    case 'subLevel1':
      return screen.getByRole('link', { name: labels.subLevel1 });
    case 'subLevel2':
      return screen.getByRole('link', { name: labels.subLevel2 });
    default:
      return null;
  }
};

const queryElement = (key: 'subLevel1' | 'subLevel2') => {
  switch (key) {
    case 'subLevel1':
      return screen.queryByRole('link', { name: labels.subLevel1 });
    case 'subLevel2':
      return screen.queryByRole('link', { name: labels.subLevel2 });
    default:
      return null;
  }
};

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
      <SideNavigation toggleButtonLabel={labels.toggleButton}>
        <MainLevel icon={<IconFaceNeutral />} label={labels.mainLevel1} href={url}>
          <SubLevel label={labels.subLevel1} href={url} />
        </MainLevel>
        <MainLevel icon={<IconFaceNeutral />} label={labels.mainLevel2} href={url}>
          <SubLevel active label={labels.subLevel2} href={url} />
        </MainLevel>
      </SideNavigation>,
    );

    getElement('mainLevel1');
    getElement('mainLevel2');
    getElement('subLevel2');

    expect(queryElement('subLevel1')).not.toBeInTheDocument();
  });

  test('should show sub levels if main level is active', () => {
    render(
      <SideNavigation toggleButtonLabel={labels.toggleButton}>
        <MainLevel icon={<IconFaceNeutral />} label={labels.mainLevel1} href={url}>
          <SubLevel label={labels.subLevel1} href={url} />
        </MainLevel>
        <MainLevel active icon={<IconFaceNeutral />} label={labels.mainLevel2} href={url}>
          <SubLevel label={labels.subLevel2} href={url} />
        </MainLevel>
        <MainLevel icon={<IconFaceNeutral />} label={labels.mainLevel3} href={url} />
      </SideNavigation>,
    );

    getElement('mainLevel1');
    getElement('mainLevel2');
    getElement('mainLevel3');
    getElement('subLevel2');

    expect(queryElement('subLevel1')).not.toBeInTheDocument();
  });

  test('should open default main levels', () => {
    render(
      <SideNavigation defaultOpenMainLevels={[1]} toggleButtonLabel={labels.toggleButton}>
        <MainLevel icon={<IconFaceNeutral />} label={labels.mainLevel1} href={url}>
          <SubLevel label={labels.subLevel1} href={url} />
        </MainLevel>
        <MainLevel icon={<IconFaceNeutral />} label={labels.mainLevel2} href={url}>
          <SubLevel label={labels.subLevel2} href={url} />
        </MainLevel>
      </SideNavigation>,
    );

    getElement('mainLevel1');
    getElement('mainLevel2');
    getElement('subLevel2');

    expect(queryElement('subLevel1')).not.toBeInTheDocument();
  });

  test('should open and close multiple main levels', () => {
    render(
      <SideNavigation allowMultipleOpened toggleButtonLabel={labels.toggleButton}>
        <MainLevel icon={<IconFaceNeutral />} label={labels.mainLevel1} href={url}>
          <SubLevel label={labels.subLevel1} href={url} />
        </MainLevel>
        <MainLevel icon={<IconFaceNeutral />} label={labels.mainLevel2} href={url}>
          <SubLevel label={labels.subLevel2} href={url} />
        </MainLevel>
      </SideNavigation>,
    );

    const mainLevel1 = getElement('mainLevel1');
    const mainLevel2 = getElement('mainLevel2');
    expect(queryElement('subLevel1')).not.toBeInTheDocument();
    expect(queryElement('subLevel2')).not.toBeInTheDocument();

    userEvent.click(mainLevel1);
    getElement('subLevel1');
    expect(queryElement('subLevel2')).not.toBeInTheDocument();

    userEvent.click(mainLevel2);
    getElement('subLevel1');
    getElement('subLevel2');

    userEvent.click(mainLevel2);
    getElement('subLevel1');
    expect(queryElement('subLevel2')).not.toBeInTheDocument();

    userEvent.click(mainLevel1);
    expect(queryElement('subLevel1')).not.toBeInTheDocument();
    expect(queryElement('subLevel2')).not.toBeInTheDocument();
  });

  test('should show/hide sub levels', () => {
    render(
      <SideNavigation toggleButtonLabel={labels.toggleButton}>
        <MainLevel icon={<IconFaceNeutral />} label={labels.mainLevel1} href={url}>
          <SubLevel label={labels.subLevel1} href={url} />
        </MainLevel>
        <MainLevel icon={<IconFaceNeutral />} label={labels.mainLevel2} href={url}>
          <SubLevel label={labels.subLevel2} href={url} />
        </MainLevel>
      </SideNavigation>,
    );

    const mainLevel1 = getElement('mainLevel1');
    getElement('mainLevel2');

    expect(queryElement('subLevel1')).not.toBeInTheDocument();
    expect(queryElement('subLevel2')).not.toBeInTheDocument();

    userEvent.click(mainLevel1);

    getElement('subLevel1');
  });
});
