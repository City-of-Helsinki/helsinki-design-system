import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Accordion, CommonAccordionProps } from './Accordion';

describe('<Accordion /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Accordion heading="Foo">Bar</Accordion>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Accordion heading="Foo">Bar</Accordion>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe('toggling', () => {
    const renderAccordion = (props: Partial<CommonAccordionProps> = {}) => {
      const result = render(
        <Accordion heading="Foo" id="test-accordion" {...props}>
          Content
        </Accordion>,
      );
      const getHeaderButton = () => screen.getByRole('button', { name: 'Foo' });
      const getCloseButton = () => screen.getByTestId('test-accordion-closeButton');
      const getContent = () => result.container.querySelector('#test-accordion-content') as HTMLElement;
      return { ...result, getHeaderButton, getCloseButton, getContent };
    };

    const expectClosedWithFocusOnHeader = async (getHeaderButton: () => HTMLElement, getContent: () => HTMLElement) => {
      await waitFor(() => {
        expect(getHeaderButton()).toHaveAttribute('aria-expanded', 'false');
      });
      expect(getContent()).not.toBeVisible();
      expect(getHeaderButton()).toHaveFocus();
    };

    it('is closed by default and opens / closes when the header button is clicked', async () => {
      const user = userEvent.setup();
      const { getHeaderButton, getContent } = renderAccordion();
      expect(getHeaderButton()).toHaveAttribute('aria-expanded', 'false');
      expect(getContent()).not.toBeVisible();

      await user.click(getHeaderButton());
      expect(getHeaderButton()).toHaveAttribute('aria-expanded', 'true');
      expect(getContent()).toBeVisible();

      await user.click(getHeaderButton());
      expect(getHeaderButton()).toHaveAttribute('aria-expanded', 'false');
      expect(getContent()).not.toBeVisible();
    });

    it('is open initially when initiallyOpen is true', () => {
      const { getHeaderButton, getContent } = renderAccordion({ initiallyOpen: true });
      expect(getHeaderButton()).toHaveAttribute('aria-expanded', 'true');
      expect(getContent()).toBeVisible();
    });

    it('closes and moves focus to the header button when the close button is clicked', async () => {
      const user = userEvent.setup();
      const { getHeaderButton, getCloseButton, getContent } = renderAccordion({ initiallyOpen: true });

      await user.click(getCloseButton());
      await expectClosedWithFocusOnHeader(getHeaderButton, getContent);
      expect(getCloseButton()).not.toBeVisible();
    });

    it.each([
      ['Space', ' '],
      ['Enter', '{Enter}'],
    ])(
      'closes once and moves focus to the header button when the close button is activated with %s',
      async (_, key) => {
        const user = userEvent.setup();
        const { getHeaderButton, getCloseButton, getContent } = renderAccordion({ initiallyOpen: true });

        getCloseButton().focus();
        await user.keyboard(key);
        await expectClosedWithFocusOnHeader(getHeaderButton, getContent);

        // Wait past the close button's internal 50ms timeout to make sure the accordion is not toggled again
        await new Promise((resolve) => {
          setTimeout(resolve, 150);
        });
        expect(getHeaderButton()).toHaveAttribute('aria-expanded', 'false');
        expect(getContent()).not.toBeVisible();
      },
    );

    it('does not render the close button when closeButton is false', () => {
      renderAccordion({ initiallyOpen: true, closeButton: false });
      expect(screen.queryByTestId('test-accordion-closeButton')).not.toBeInTheDocument();
    });
  });
});
