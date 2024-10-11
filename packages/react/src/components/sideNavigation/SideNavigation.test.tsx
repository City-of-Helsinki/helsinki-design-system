import React, { HTMLAttributes } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { SideNavigation, SideNavigationProps } from './SideNavigation';
import { IconHome } from '../../icons';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

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
    <SideNavigation id="sideNavigation" toggleButtonLabel={labels.toggleButton} aria-label="Side navigation">
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

  it('native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps<'nav', Pick<SideNavigationProps, 'id'>>('nav');
    // "." is added to aria-label inside the component if missing.
    divProps['aria-label'] = `${divProps['aria-label']}.`;
    const { getByTestId } = render(
      <SideNavigation {...divProps} toggleButtonLabel={labels.toggleButton}>
        <p>Hello</p>
      </SideNavigation>,
    );
    const element = getByTestId(divProps['data-testid']);
    expect(
      getElementAttributesMisMatches(element, {
        ...divProps,
      } as HTMLAttributes<HTMLElement>),
    ).toHaveLength(0);
  });

  it('should show sub level when main level is clicked', () => {
    render(
      <SideNavigation id="sideNavigation" toggleButtonLabel={labels.toggleButton}>
        <SideNavigation.MainLevel id="mainLevel1" icon={<IconHome />} label={labels.mainLevel1}>
          <SideNavigation.SubLevel id="subLevel1" label={labels.subLevel1} href={url} />
        </SideNavigation.MainLevel>
      </SideNavigation>,
    );

    expect(queryLink('subLevel1')).not.toBeInTheDocument();
    userEvent.click(queryButton('mainLevel1') as HTMLButtonElement);
    expect(queryLink('subLevel1')).toBeInTheDocument();
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

    userEvent.click(mainLevelButton1 as HTMLButtonElement);
    expect(mainLevelButton1).toHaveAttribute('aria-expanded', 'true');
    expect(queryLink('subLevel1')).toBeInTheDocument();
    expect(queryLink('subLevel2')).not.toBeInTheDocument();

    userEvent.click(mainLevelButton2 as HTMLButtonElement);
    expect(mainLevelButton2).toHaveAttribute('aria-expanded', 'true');
    expect(queryLink('subLevel1')).toBeInTheDocument();
    expect(queryLink('subLevel2')).toBeInTheDocument();

    userEvent.click(mainLevelButton2 as HTMLButtonElement);
    expect(mainLevelButton2).toHaveAttribute('aria-expanded', 'false');
    expect(queryLink('subLevel1')).toBeInTheDocument();
    expect(queryLink('subLevel2')).not.toBeInTheDocument();

    userEvent.click(mainLevelButton1 as HTMLButtonElement);
    expect(mainLevelButton1).toHaveAttribute('aria-expanded', 'false');
    expect(queryLink('subLevel1')).not.toBeInTheDocument();
    expect(queryLink('subLevel2')).not.toBeInTheDocument();
  });
});
