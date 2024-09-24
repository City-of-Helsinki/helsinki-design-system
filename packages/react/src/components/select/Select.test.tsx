// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';

import { renderWithHelpers, skipAxeRulesExpectedToFail } from './testUtil';
import { defaultFilter } from './utils';
import { Texts, Option, SearchResult, SelectProps } from './types';
import { createTimedPromise } from '../login/testUtils/timerTestUtil';

describe('<Select />', () => {
  const defaultTexts: Partial<Texts> = {
    label: 'Label',
    assistive: 'Assistive text',
    error: 'Error text',
    language: 'en',
  };
  describe('spec', () => {
    it('renders single select component with groups and filter input', () => {
      const { asFragment } = renderWithHelpers({
        texts: defaultTexts,
        invalid: true,
        required: true,
      });
      expect(asFragment()).toMatchSnapshot();
    });
    it('renders multiSelect component with groups and filter input', () => {
      const { asFragment } = renderWithHelpers({
        texts: defaultTexts,
        invalid: true,
        required: true,
        multiSelect: true,
      });
      expect(asFragment()).toMatchSnapshot();
    });
    it('single select component with groups and filter input should not have basic accessibility issues', async () => {
      const { container } = renderWithHelpers({
        texts: defaultTexts,
        invalid: true,
        required: true,
        multiSelect: false,
        filter: defaultFilter,
        groups: true,
        open: true,
      });
      const results = await axe(container, skipAxeRulesExpectedToFail);
      expect(results).toHaveNoViolations();
    });
    it('multi select component with groups and filter input should not have basic accessibility issues', async () => {
      const { container } = renderWithHelpers({
        texts: defaultTexts,
        invalid: true,
        required: true,
        multiSelect: true,
        filter: defaultFilter,
        groups: true,
        open: true,
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
    it('Clicking an option selects it and closes the menu when multiSelect is false', async () => {
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
  describe('Multiselect list', () => {
    it('stays open after selections', async () => {
      const {
        openList,
        isListOpen,
        clickGroupAndWaitForRerender,
        getSelectionsInButton,
        groupsAndOptions,
        optionCountInGroups,
        optionCountInAllGroups,
      } = renderWithHelpers({
        multiSelect: true,
        groups: true,
      });
      await openList();
      await clickGroupAndWaitForRerender(0);
      expect(isListOpen()).toBeTruthy();
      expect(getSelectionsInButton()).toHaveLength(optionCountInGroups[0]);
      expect(getSelectionsInButton()[0]).toBe((groupsAndOptions[0].options[0] as Option).label);

      await clickGroupAndWaitForRerender(2);
      expect(isListOpen()).toBeTruthy();
      expect(getSelectionsInButton()).toHaveLength(optionCountInGroups[0] + optionCountInGroups[2]);

      await clickGroupAndWaitForRerender(1);
      expect(isListOpen()).toBeTruthy();
      expect(getSelectionsInButton()).toHaveLength(optionCountInAllGroups);
    });
    it('Clicking the clear button removes all selections', async () => {
      const { openList, getClearButton, clickGroupAndWaitForRerender, getSelectionsInButton, optionCountInGroups } =
        renderWithHelpers({
          multiSelect: true,
          groups: true,
        });
      await openList();
      await clickGroupAndWaitForRerender(2);
      expect(getSelectionsInButton()).toHaveLength(optionCountInGroups[2]);
      fireEvent.click(getClearButton());
      await waitFor(() => {
        expect(getSelectionsInButton()).toHaveLength(0);
      });
    });
  });
  describe('Filter', () => {
    it('Filter hides options and clearing filtering restores options', async () => {
      const { openList, getOptionElements, setInputValue } = renderWithHelpers({
        groups: false,
        multiSelect: false,
        input: 'filter',
      });
      await openList();
      expect(getOptionElements()).toHaveLength(3);
      await setInputValue('Option 1');
      await waitFor(() => {
        expect(getOptionElements()).toHaveLength(1);
      });
      await setInputValue('');
      await waitFor(() => {
        expect(getOptionElements()).toHaveLength(3);
      });
    });
    it('Clicking a filtered multi-select group selects only visible items', async () => {
      const {
        openList,
        closeList,
        getAllListElements,
        getSelectionsInButton,
        setInputValue,
        clickGroupAndWaitForRerender,
      } = renderWithHelpers({
        groups: true,
        multiSelect: true,
        input: 'filter',
      });
      await openList();
      expect(getAllListElements()).toHaveLength(15);
      await setInputValue('Group2_Option0');
      await waitFor(() => {
        expect(getAllListElements()).toHaveLength(2); /// label + option
      });
      await clickGroupAndWaitForRerender(0);
      await setInputValue('');
      await closeList();
      await waitFor(() => {
        expect(getSelectionsInButton()).toHaveLength(1);
      });

      await openList();
      await waitFor(() => {
        expect(getAllListElements()).toHaveLength(15);
      });

      await setInputValue('Group0_Option0');
      await waitFor(() => {
        expect(getAllListElements()).toHaveLength(2); /// label + option
      });
      await clickGroupAndWaitForRerender(0);
      await closeList();
      await waitFor(() => {
        expect(getSelectionsInButton()).toHaveLength(2);
      });
    });
  });
  describe('Search', () => {
    it('Search updates all data', async () => {
      const resultArray = ['Result 1', 'Result 2'];
      const onSearch: SelectProps['onSearch'] = () => {
        return createTimedPromise({ options: resultArray }, 300) as Promise<SearchResult>;
      };
      const { openList, getOptionElements, setInputValue, getListItemLabels } = renderWithHelpers({
        texts: defaultTexts,
        required: true,
        groups: false,
        multiSelect: false,
        input: undefined,
        onSearch,
      });
      await openList();
      expect(getOptionElements()).toHaveLength(3);
      await setInputValue('Option 1');
      await waitFor(() => {
        expect(getListItemLabels()).toEqual(resultArray);
      });
      await setInputValue('');
      await waitFor(() => {
        expect(getOptionElements()).toHaveLength(0);
      });
    });
    it('User is notified if there are no results', async () => {
      const { openList, setInputValue, getSearchAndFilterInfoTexts } = renderWithHelpers({
        texts: defaultTexts,
        required: true,
        groups: false,
        multiSelect: false,
        input: undefined,
        onSearch: () => createTimedPromise({ options: [] }, 500) as Promise<SearchResult>,
      });
      await openList();
      await setInputValue('Option 1');
      await waitFor(
        () => {
          expect(getSearchAndFilterInfoTexts()).toHaveLength(2);
        },
        { interval: 500 },
      );
      const notification = getSearchAndFilterInfoTexts()[0] as string;
      expect(notification.includes(`No options found for "Option 1"`)).toBeTruthy();
    });
    it('User is notified if search fails', async () => {
      const { openList, setInputValue, getSearchAndFilterInfoTexts } = renderWithHelpers({
        texts: defaultTexts,
        required: true,
        groups: false,
        multiSelect: false,
        input: undefined,
        onSearch: () => createTimedPromise(new Error('UPS'), 500) as Promise<SearchResult>,
      });
      await openList();
      await setInputValue('Option 1');
      await waitFor(
        () => {
          expect(getSearchAndFilterInfoTexts()).toHaveLength(2);
        },
        { interval: 500 },
      );
      const notification = getSearchAndFilterInfoTexts()[0] as string;
      expect(notification.includes("We couldn't load the options")).toBeTruthy();
    });
  });
});
