import { fireEvent, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';

import { renderWithHelpers, skipAxeRulesExpectedToFail } from './testUtil';

describe('<Select />', () => {
  describe('spec', () => {
    it('renders the component', () => {
      const { asFragment } = renderWithHelpers({
        texts: { label: 'Label', assistive: 'Assistive text', error: 'Error text', language: 'en' },
        invalid: true,
        required: true,
      });
      expect(asFragment()).toMatchSnapshot();
    });
    it('should not have basic accessibility issues', async () => {
      const { container } = renderWithHelpers({
        texts: { label: 'Label', assistive: 'Assistive text', error: 'Error text', language: 'en' },
        invalid: true,
        required: true,
      });
      const results = await axe(container, skipAxeRulesExpectedToFail);
      expect(results).toHaveNoViolations();
    });
  });
  describe('List is opened and closed', () => {
    it('list opens via button click', async () => {
      const { openList, getListItemLabels, options } = renderWithHelpers();
      await openList();
      const listItems = getListItemLabels();
      expect(options).toHaveLength(3);
      options.forEach((option, i) => {
        expect(listItems[i]).toBe(option.label);
      });
    });
    it('list closes via outside click', async () => {
      const { openList, container, isListOpen } = renderWithHelpers();
      await openList();
      expect(isListOpen()).toBeTruthy();
      fireEvent.click(container);
      await waitFor(() => {
        if (isListOpen()) {
          throw new Error('Not closed');
        }
      });
    });
    it('Clicking an option selects it and closes the menu', async () => {
      const { openList, isListOpen, clickOptionAndWaitForRerender, getSelectionsInButton, options } =
        renderWithHelpers();
      const selectionIndex = 2;
      await openList();
      await clickOptionAndWaitForRerender(2);
      expect(isListOpen()).toBeFalsy();
      expect(getSelectionsInButton()).toHaveLength(1);
      expect(getSelectionsInButton()[0]).toBe(options[selectionIndex].label);
    });
    it('Clicking the clear button removes all selections', async () => {
      const { openList, getClearButton, clickOptionAndWaitForRerender, getSelectionsInButton } = renderWithHelpers();
      await openList();
      await clickOptionAndWaitForRerender(2);
      expect(getSelectionsInButton()).toHaveLength(1);
      fireEvent.click(getClearButton());
      await waitFor(() => {
        expect(getSelectionsInButton()).toHaveLength(0);
      });
    });
  });
});
