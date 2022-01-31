import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FooterUtilities } from './FooterUtilities';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.Utilities /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterUtilities />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FooterUtilities backToTopLabel="Test label" />, { wrapper: FooterWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should scroll to top', () => {
    const spyScrollTo = jest.fn();

    Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 1,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 1,
    });

    const { container } = render(
      <>
        <p>Test paragraph</p>
        <a id="top-link" href="/#">
          Top link
        </a>
        <FooterWrapper>
          <FooterUtilities backToTopLabel="Test label" />
        </FooterWrapper>
      </>,
    );

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    const backToTopButton = container.querySelector('button[role="link"]') as HTMLButtonElement;

    fireEvent.click(backToTopButton);

    expect(spyScrollTo).toHaveBeenCalledWith({ top: 0 });

    expect(container.querySelector('#top-link')).toHaveFocus();
  });
});
