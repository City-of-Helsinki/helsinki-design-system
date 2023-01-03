import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Combobox, ComboboxProps } from './Combobox';

const label = 'Combobox';

const options = [
  { label: 'Finland', value: 'FI' },
  { label: 'Sweden', value: 'SV' },
  { label: 'Norway', value: 'NO' },
  { label: 'Botswana', value: 'BW' },
  { label: 'Bolivia', value: 'BO' },
];

const multiWordOptions = [
  { label: 'Helsinki', value: 'helsinki' },
  { label: 'Helsinki east region', value: 'helsinki-east' },
  { label: 'Helsinki north region', value: 'helsinki-north' },
  { label: 'Helsinki northeast region', value: 'helsinki-northeast' },
  { label: 'Helsinki northwest region', value: 'helsinki-northwest' },
  { label: 'Helsinki west region', value: 'helsinki-west' },
];

const defaultProps: ComboboxProps<{ label: string; value: string }> = {
  label,
  options,
  clearButtonAriaLabel: 'Clear all selections',
  selectedItemRemoveButtonAriaLabel: 'Remove item {value}',
  selectedItemSrLabel: 'Selected item {value}',
  toggleButtonAriaLabel: 'Open the combobox',
};

const getWrapper = (props?: Record<string, unknown>) => render(<Combobox {...defaultProps} {...props} />);

describe('<Combobox />', () => {
  it('renders the component', () => {
    const { asFragment } = getWrapper();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the component without label when aria-labelledby is given', () => {
    const { asFragment } = render(
      <Combobox
        aria-labelledby="some-external-label-id"
        options={options}
        clearButtonAriaLabel={defaultProps.clearButtonAriaLabel}
        toggleButtonAriaLabel={defaultProps.toggleButtonAriaLabel}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = getWrapper();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('user should be able to search and choose an option ', async () => {
    const onChange = jest.fn();
    const { getAllByLabelText, getAllByRole, getByDisplayValue } = getWrapper({ onChange });
    const input = getAllByLabelText(label)[0];
    userEvent.type(input, 'Fi');
    const visibleOptions = getAllByRole('option');
    // Ensure that options are filtered correctly
    expect(visibleOptions.length).toBe(1);

    // Choose one option
    userEvent.click(visibleOptions[0]);
    await waitFor(() => {
      // Ensure that chosen option is shown as value of input
      expect(getByDisplayValue(options[0].label)).toBeDefined();
      // Ensure that chosen option has been sent with the onChange event
      expect(onChange).toHaveBeenCalledWith(options[0]);
    });
  });

  describe('in multi select mode', () => {
    it('user should be able to remove selected item with enter keypress', async () => {
      const onChange = jest.fn();
      const firstSelectedOptionName = `Selected item ${options[0].label}`;
      const { getAllByLabelText, getAllByRole, queryAllByRole } = getWrapper({
        onChange,
        multiselect: true,
      });
      const input = getAllByLabelText(label)[0];
      userEvent.type(input, 'Fi');

      await waitFor(() => {
        const visibleOptions = getAllByRole('option');
        userEvent.click(visibleOptions[0]);
        expect(queryAllByRole('button', { name: firstSelectedOptionName }).length).toBe(1);
        userEvent.type(queryAllByRole('button', { name: firstSelectedOptionName })[0], '{enter}');
        expect(queryAllByRole('button', { name: firstSelectedOptionName }).length).toBe(0);
      });
    });

    it('user should be able to remove selected item with space keypress', async () => {
      const onChange = jest.fn();
      const firstSelectedOptionName = `Selected item ${options[0].label}`;
      const { getAllByLabelText, getAllByRole, queryAllByRole } = getWrapper({ onChange, multiselect: true });
      const input = getAllByLabelText(label)[0];
      userEvent.type(input, 'Fi');

      await waitFor(() => {
        const visibleOptions = getAllByRole('option');
        userEvent.click(visibleOptions[0]);
        expect(queryAllByRole('button', { name: firstSelectedOptionName }).length).toBe(1);
        userEvent.type(queryAllByRole('button', { name: firstSelectedOptionName })[0], '{space}');
        expect(queryAllByRole('button', { name: firstSelectedOptionName }).length).toBe(0);
      });
    });

    it('user should be able to search and choose multiple options', async () => {
      const onChange = jest.fn();
      const { getAllByLabelText, getAllByRole, queryAllByText } = getWrapper({
        onChange,
        multiselect: true,
      });

      const input = getAllByLabelText(label)[0] as HTMLInputElement;

      // Search an option
      userEvent.type(input, 'Fi');
      const visibleOptions = getAllByRole('option');
      // Ensure that options are filtered correctly
      expect(visibleOptions.length).toBe(1);
      // Choose one option
      userEvent.click(visibleOptions[0]);
      await waitFor(() => {
        // input value is not cleared on selection
        expect(input.value).toBe('Fi');
        // Ensure that it's visible in selected items
        expect(queryAllByText(options[0].label).length).toEqual(2);
        // Ensure that it has been passed upwards with onChange
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith([options[0]]);
      });

      // clear input text
      userEvent.clear(input);
      // Search another option
      userEvent.type(input, 'bo');
      const newVisibleOptions = getAllByRole('option');
      // Ensure that options are filtered correctly
      expect(newVisibleOptions.length).toBe(2);
      userEvent.click(newVisibleOptions[1]);
      await waitFor(() => {
        // input value is not cleared on selection
        expect(input.value).toBe('bo');
        // Ensure that it's visible in selected items
        expect(queryAllByText(options[4].label).length).toEqual(2);
        // Ensure that it has been passed upwards with onChange
      });

      // clear input text so all options will be visible again
      userEvent.clear(input);
      await waitFor(() => {
        // Ensure that previous and current selection are visible in
        // selected items
        expect(queryAllByText(options[0].label).length).toEqual(2);
        expect(queryAllByText(options[4].label).length).toEqual(2);
        // Ensure that the current selection is passed correctly with
        // onChange
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith([options[0], options[4]]);
      });
    });

    it('user should be able to close the menu with a tab keypress', () => {
      const onChange = jest.fn();
      const { getAllByLabelText, queryAllByRole, queryAllByText } = getWrapper({ onChange });
      const input = getAllByLabelText(label)[0];

      // Search and focus on first option
      userEvent.type(input, 'Fi');
      userEvent.type(input, '{arrowdown}');
      const visibleOptions = queryAllByRole('option');
      expect(visibleOptions.length).toBe(1);
      expect(visibleOptions[0].innerHTML).toEqual(options[0].label);
      expect(visibleOptions[0]).toHaveClass('highlighted'); // Prone to break if className changes

      // A tab keypress should close the menu without selecting an item
      userEvent.type(input, '{tab}');
      const visibleOptionsAfterClose = queryAllByRole('option');
      expect(visibleOptionsAfterClose.length).toBe(0);
      expect(queryAllByText(options[0].label).length).toEqual(0);
    });

    it('user should be able to search with multiple word term', () => {
      const onChange = jest.fn();
      const { getAllByLabelText, getAllByRole } = getWrapper({
        onChange,
        multiselect: true,
        options: multiWordOptions,
      });

      const input = getAllByLabelText(label)[0];

      // First result
      userEvent.type(input, 'Helsinki');
      const visibleOptions = getAllByRole('option');
      expect(visibleOptions.length).toBe(6);

      // The result after more specific search
      userEvent.type(input, '{space}northeast');
      const newVisibleOptions = getAllByRole('option');
      expect(newVisibleOptions.length).toBe(1);
      expect(newVisibleOptions[0]).toHaveTextContent('Helsinki northeast');
    });

    it('user should be able to search with a more specific term', () => {
      const onChange = jest.fn();
      const { getAllByLabelText, getAllByRole } = getWrapper({
        onChange,
        multiselect: true,
        options: multiWordOptions,
      });

      const input = getAllByLabelText(label)[0];
      userEvent.type(input, 'northeast');
      const visibleOptions = getAllByRole('option');
      expect(visibleOptions.length).toBe(1);
    });

    it('deleting an item while suggestions are shown, should only delete the item and not add an option', async () => {
      const onChange = jest.fn();
      const { getAllByLabelText, getAllByRole, queryAllByText } = getWrapper({
        onChange,
        multiselect: true,
        options: multiWordOptions,
      });

      const getTags = () =>
        getAllByRole('button').filter((t) => {
          const child = t.firstChild as HTMLElement;
          return child && String(child.getAttribute('id')).includes('hds-tag');
        });

      const input = getAllByLabelText(label)[0];

      // Search an option
      userEvent.type(input, 'hel');
      const visibleOptions = getAllByRole('option');
      // Choose three options, not the one at index 0!
      // item at #0 would be added when a tag is deleted
      // if tested bug was not fixed.
      userEvent.click(visibleOptions[1]);
      userEvent.click(visibleOptions[2]);
      userEvent.click(visibleOptions[3]);
      await waitFor(() => {
        expect(getTags()).toHaveLength(3);
        expect(onChange).toHaveBeenCalledTimes(3);
      });
      const tagForLabel2 = getTags().filter((t) => {
        const span = (t.childNodes[0] as HTMLElement).childNodes[1] as HTMLElement;
        return !!span && span.textContent === multiWordOptions[2].label;
      })[0];

      expect(tagForLabel2).not.toBeUndefined();
      const deleteButtonForTag = tagForLabel2.querySelector('button') as HTMLButtonElement;
      userEvent.click(deleteButtonForTag);
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(4);
        expect(getTags()).toHaveLength(2);
        // deleteButtonClick causes onBlur and menu closes, so only tags are visible
        expect(queryAllByText(multiWordOptions[1].label).length).toEqual(1);
        expect(queryAllByText(multiWordOptions[2].label).length).toEqual(0);
        expect(queryAllByText(multiWordOptions[3].label).length).toEqual(1);
      });
    });
  });
});
