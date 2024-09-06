import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterNavigationGroup, FooterNavigationGroupProps } from './FooterNavigationGroup';
import { FooterNavigationWrapper } from '../../../../utils/test-utils';
import { Footer } from '../../Footer';
import { FooterVariant } from '../../Footer.interface';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../../../utils/testHelpers';

describe('<Footer.NavigationGroup /> spec', () => {
  // if only one FooterNavigationGroup is passed to the <FooterNavigationWrapper />
  // the Footer.Navigation removes the FooterNavigationGroup and renders only its children.
  // wrapping the <FooterNavigationGroup> with <TestContent> changes this behaviour.
  const TestContent = (props?: Partial<FooterNavigationGroupProps>) => {
    return (
      <FooterNavigationGroup
        {...props}
        headingLink={
          <Footer.GroupHeading href="https://google.com" label="Main Page" variant={FooterVariant.Navigation} />
        }
      >
        <Footer.Link label="Link 1" />
        <Footer.Link label="Link 2" />
        <Footer.Link label="Link 3" />
      </FooterNavigationGroup>
    );
  };
  it('renders the navigation groups', () => {
    const { asFragment } = render(<TestContent />, { wrapper: FooterNavigationWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<TestContent />, { wrapper: FooterNavigationWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps('div');
    const { getByTestId } = render(<TestContent {...divProps} />, { wrapper: FooterNavigationWrapper });
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });
});
