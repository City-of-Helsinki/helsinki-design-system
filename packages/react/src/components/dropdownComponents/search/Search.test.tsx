import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Search } from './Search';

describe('<Search /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Search />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Search texts={{ label: 'Search options' }} />);
    const results = await axe(container, {
      rules: {
        // Temporarily disable this rule - the listbox accessibility will be fixed when the component is completed
        'aria-input-field-name': { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });

  describe('ARIA combobox attributes', () => {
    it('search input has role="combobox" when onSearch is provided', () => {
      const { container } = render(
        <Search texts={{ label: 'Search' }} onSearch={() => Promise.resolve({ groups: [] })} />,
      );
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('role', 'combobox');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
    });

    it('search input has role="combobox" when historyId is provided', () => {
      const { container } = render(<Search texts={{ label: 'Search' }} historyId="test" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('role', 'combobox');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
    });

    it('search input has role="searchbox" when no onSearch and no historyId', () => {
      const { container } = render(<Search texts={{ label: 'Search' }} />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('role', 'searchbox');
      expect(input).not.toHaveAttribute('aria-autocomplete');
      expect(input).not.toHaveAttribute('aria-expanded');
      expect(input).not.toHaveAttribute('aria-controls');
    });

    it('search input has aria-expanded="false" when dropdown is closed', () => {
      const { container } = render(<Search texts={{ label: 'Search' }} historyId="test" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-expanded', 'false');
    });

    it('search input has aria-controls attribute', () => {
      const { container } = render(<Search id="test-search" texts={{ label: 'Search' }} historyId="test" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-controls', 'test-search-list');
    });

    it('listbox has aria-labelledby pointing to the label element', () => {
      const historyId = 'listbox-label-test';
      const storageKey = `hds-search-history-${historyId}`;
      localStorage.setItem(storageKey, JSON.stringify(['react']));

      const { container } = render(<Search id="lb-test" historyId={historyId} texts={{ label: 'Search' }} />);
      const input = container.querySelector('input') as HTMLInputElement;

      // Open dropdown to render the listbox
      fireEvent.mouseDown(input);
      fireEvent.focus(input);

      const listbox = container.querySelector('[role="listbox"]');
      expect(listbox).toBeInTheDocument();
      expect(listbox).toHaveAttribute('aria-labelledby', 'lb-test-label');

      // The label element should exist with matching id
      const label = container.querySelector('#lb-test-label');
      expect(label).toBeInTheDocument();

      localStorage.clear();
    });
  });

  describe('history info for screen readers', () => {
    const historyId = 'test-sr-history';
    const storageKey = `hds-search-history-${historyId}`;

    beforeEach(() => {
      localStorage.setItem(storageKey, JSON.stringify(['react', 'angular']));
    });

    afterEach(() => {
      localStorage.clear();
    });

    it('renders history info element when search history exists', () => {
      const { container } = render(
        <Search id="test" historyId={historyId} texts={{ label: 'Search', language: 'en' }} />,
      );
      const historyInfo = container.querySelector('[id$="-history-info"]');
      expect(historyInfo).toBeInTheDocument();
      expect(historyInfo?.textContent).toBe('Recent searches available. Press Down Arrow to open history.');
    });

    it('input aria-describedby includes history info id when history exists and input is empty', () => {
      const { container } = render(<Search id="test" historyId={historyId} texts={{ label: 'Search' }} />);
      const input = container.querySelector('input');
      const historyInfo = container.querySelector('[id$="-history-info"]');
      expect(historyInfo).toBeInTheDocument();
      const describedBy = input?.getAttribute('aria-describedby') || '';
      expect(describedBy).toContain(historyInfo?.id);
    });

    it('history info is not rendered when input has a value', () => {
      const { container } = render(
        <Search id="test" historyId={historyId} texts={{ label: 'Search' }} value="hello" />,
      );
      const historyInfo = container.querySelector('[id$="-history-info"]:not([hidden])');
      expect(historyInfo).toBeNull();
    });
  });

  describe('keyboard navigation', () => {
    it('does not open dropdown on Tab focus (keyboard)', () => {
      const { container } = render(<Search id="kb-test" historyId="tab-test" texts={{ label: 'Search' }} />);
      const input = container.querySelector('input') as HTMLInputElement;

      // Just focus without mousedown = keyboard tab
      fireEvent.focus(input);

      expect(input).toHaveAttribute('aria-expanded', 'false');
    });

    it('opens dropdown on mouse click', () => {
      const historyId = 'mouse-test';
      const storageKey = `hds-search-history-${historyId}`;
      localStorage.setItem(storageKey, JSON.stringify(['react', 'vue']));

      const { container } = render(<Search id="kb-test" historyId={historyId} texts={{ label: 'Search' }} />);
      const input = container.querySelector('input') as HTMLInputElement;

      // Simulate mouse click (mousedown then focus)
      fireEvent.mouseDown(input);
      fireEvent.focus(input);

      expect(input).toHaveAttribute('aria-expanded', 'true');

      localStorage.clear();
    });

    it('Enter key calls onSend with current value', () => {
      const onSend = jest.fn();
      const { container } = render(<Search id="kb-test" texts={{ label: 'Search' }} onSend={onSend} />);
      const input = container.querySelector('input') as HTMLInputElement;
      const wrapper = container.querySelector('[id$="-container"]')!;

      // Focus the input
      input.focus();

      // Type a value
      fireEvent.change(input, { target: { value: 'test query' } });

      // Press Enter on the container (where useKeyboard listens)
      fireEvent.keyDown(wrapper, { key: 'Enter' });

      expect(onSend).toHaveBeenCalledWith('test query');
    });

    it('Escape key closes dropdown', () => {
      const historyId = 'esc-test';
      const storageKey = `hds-search-history-${historyId}`;
      localStorage.setItem(storageKey, JSON.stringify(['react']));

      const { container } = render(<Search id="kb-test" historyId={historyId} texts={{ label: 'Search' }} />);
      const input = container.querySelector('input') as HTMLInputElement;
      const wrapper = container.querySelector('[id$="-container"]')!;

      // Open dropdown
      fireEvent.mouseDown(input);
      fireEvent.focus(input);
      expect(input).toHaveAttribute('aria-expanded', 'true');

      // Press Escape
      fireEvent.keyDown(wrapper, { key: 'Escape' });

      expect(input).toHaveAttribute('aria-expanded', 'false');

      localStorage.clear();
    });
  });
});
