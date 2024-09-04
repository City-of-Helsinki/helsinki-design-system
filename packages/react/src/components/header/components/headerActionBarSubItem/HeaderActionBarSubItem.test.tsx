import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { HeaderActionBarSubItem, HeaderActionBarSubItemProps } from './HeaderActionBarSubItem';
import { Header } from '../../Header';
import { getElementAttributesMisMatches, getCommonElementTestProps } from '../../../../utils/testHelpers';
import { IconAlertCircle, IconAngleDown } from '../../../../icons';

type WrapperProps = PropsWithChildren<Record<string, unknown>>;

describe('<HeaderActionBarSubItem /> spec', () => {
  const basicProps: HeaderActionBarSubItemProps = {
    iconLeft: <IconAlertCircle />,
    iconRight: <IconAngleDown />,
    label: 'MyHelsinki.fi',
    external: true,
    href: 'www.example.com',
    lang: 'fi',
  };

  const Wrapper = ({ children }: WrapperProps) => {
    return (
      <Header>
        <Header.ActionBarItem label="label" id="actionBarItem-id">
          <Header.ActionBarSubItemGroup label="label">{children}</Header.ActionBarSubItemGroup>
        </Header.ActionBarItem>
      </Header>
    );
  };
  it('renders the component', () => {
    const { asFragment } = render(<HeaderActionBarSubItem {...basicProps} />, { wrapper: Wrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<HeaderActionBarSubItem {...basicProps} />, { wrapper: Wrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('native html props are passed to the element', async () => {
    const buttonProps = getCommonElementTestProps<'button'>('button');
    // "." is added to aria-label inside the component if missing.
    buttonProps['aria-label'] = 'Aria-label with comma.';
    const { getByTestId } = render(<HeaderActionBarSubItem {...buttonProps} {...basicProps} external={false} />, {
      wrapper: Wrapper,
    });
    const element = getByTestId(buttonProps['data-testid']);
    expect(getElementAttributesMisMatches(element, buttonProps)).toHaveLength(0);
  });
});
