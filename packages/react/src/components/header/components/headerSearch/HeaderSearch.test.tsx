import React, { HTMLAttributes } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import { HeaderSearch, HeaderSearchProps as NavigationSearchProps } from './HeaderSearch';
import { HeaderWrapper } from '../../../../utils/test-utils';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../../../utils/testHelpers';

describe('<Header.HeaderSearch /> spec', () => {
  const testTexts = {
    heading: 'Hae palvelusta',
    label: 'Mitä etsit?',
    buttonLabel: 'Hae',
    placeholder: 'Anna teksti hakua varten',
    assistive: 'Avustava teksti',
  };

  it('renders the component', () => {
    const { asFragment } = render(<HeaderSearch texts={testTexts} />, { wrapper: HeaderWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<HeaderSearch texts={testTexts} />, { wrapper: HeaderWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps<'div', Pick<NavigationSearchProps, 'onSubmit' | 'onChange'>>('div');
    // the role is fixed to "search" and should not be overwritten
    const { getByTestId } = render(<HeaderSearch {...divProps} role="navigation" texts={testTexts} />);
    const element = getByTestId(divProps['data-testid']);
    expect(
      getElementAttributesMisMatches(element, {
        ...(divProps as unknown as HTMLAttributes<HTMLDivElement>),
        role: 'search',
      }),
    ).toHaveLength(0);
  });

  describe('ARIA landmarks and semantics', () => {
    it('search container has role="search"', () => {
      const { container } = render(<HeaderSearch texts={testTexts} />, { wrapper: HeaderWrapper });
      const searchLandmark = container.querySelector('[role="search"]');
      expect(searchLandmark).toBeInTheDocument();
    });

    it('search landmark has aria-labelledby pointing to the heading', () => {
      const { container } = render(<HeaderSearch id="hs" texts={testTexts} />, { wrapper: HeaderWrapper });
      const searchLandmark = container.querySelector('[role="search"]');
      const labelledBy = searchLandmark?.getAttribute('aria-labelledby');
      expect(labelledBy).toBe('hs-heading');
      const heading = container.querySelector(`#${labelledBy}`);
      expect(heading).toBeInTheDocument();
      expect(heading?.textContent).toBe(testTexts.heading);
    });

    it('dropdown list has role="presentation" to suppress list semantics', () => {
      const { container } = render(<HeaderSearch texts={testTexts} />, { wrapper: HeaderWrapper });
      const ul = container.querySelector('ul');
      expect(ul).toHaveAttribute('role', 'presentation');
    });
  });

  describe('submit behavior', () => {
    it('calls onSubmit when external button is clicked with input value', () => {
      const onSubmit = jest.fn();
      const { container } = render(<HeaderSearch texts={testTexts} onSubmit={onSubmit} />, { wrapper: HeaderWrapper });
      const input = container.querySelector('input') as HTMLInputElement;
      // Find the visible submit button by its text content
      const submitButton = Array.from(container.querySelectorAll('button')).find(
        (btn) => btn.textContent?.trim() === testTexts.buttonLabel,
      ) as HTMLButtonElement;

      // Type a value
      fireEvent.change(input, { target: { value: 'test search' } });
      // Click the submit button
      fireEvent.click(submitButton);

      expect(onSubmit).toHaveBeenCalledWith('test search');
    });

    it('does not call onSubmit when input is empty', () => {
      const onSubmit = jest.fn();
      const { container } = render(<HeaderSearch texts={testTexts} onSubmit={onSubmit} />, { wrapper: HeaderWrapper });
      const submitButton = Array.from(container.querySelectorAll('button')).find(
        (btn) => btn.textContent?.trim() === testTexts.buttonLabel,
      ) as HTMLButtonElement;

      // Click submit with empty input
      fireEvent.click(submitButton);

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('search input ARIA attributes', () => {
    it('search input has combobox role and aria-autocomplete', () => {
      const { container } = render(<HeaderSearch texts={testTexts} />, { wrapper: HeaderWrapper });
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('role', 'combobox');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
    });

    it('search input has aria-expanded="false" when closed', () => {
      const { container } = render(<HeaderSearch texts={testTexts} />, { wrapper: HeaderWrapper });
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-expanded', 'false');
    });

    it('internal submit button is hidden', () => {
      const { container } = render(<HeaderSearch texts={testTexts} />, { wrapper: HeaderWrapper });
      // The Search component should not render an internal submit icon button
      // Only the external Button with text should exist
      // The Search component should not render a search submit icon button inside the TextInput
      const searchSubmitInTextInput = container.querySelector('[class*="SearchInput"] button[class*="buttonIcon"]');
      expect(searchSubmitInTextInput).toBeNull();
    });
  });
});
