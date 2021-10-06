import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Combobox, ComboboxProps } from './Combobox';

const label = 'Combobox';
const options = [
  { label: 'Finland', value: 'FI' },
  { label: 'Sweden', value: 'SV' },
  { label: 'Norway', value: 'NO' },
  { label: 'Botswana', value: 'BW' },
  { label: 'Bolivia', value: 'BO' },
];
const defaultProps: ComboboxProps<{ label: string; value: string }> = {
  label,
  options,
  clearButtonAriaLabel: 'Clear all selections',
  selectedItemRemoveButtonAriaLabel: 'Remove item {value}',
  selectedItemSrLabel: 'Selected item {value}',
  toggleButtonAriaLabel: 'Open the combobox',
};

const getWrapper = (props?: unknown) => render(<Combobox {...defaultProps} {...props} />);

describe('<Combobox />', () => {
  it('user should be able to search and choose an option ', () => {
    const onChange = jest.fn();
    const { getAllByLabelText, getAllByRole, queryByDisplayValue } = getWrapper({ onChange });
    const input = getAllByLabelText(label)[0];

    fireEvent.change(input, { target: { value: 'Fi' } });

    const visibleOptions = getAllByRole('option');

    // Ensure that options are filtered correctly
    expect(visibleOptions.length).toBe(1);
    // Choose one option
    fireEvent.click(visibleOptions[0]);

    // Ensure that chosen option is shown as value of input
    expect(queryByDisplayValue(options[0].label)).toBeDefined();
    // Ensure that chosen option has been sent with the onChange event
    expect(onChange).toHaveBeenCalledWith(options[0]);
  });

  describe('in multi select mode', () => {
    it('user should be able to search and choose multiple options', () => {
      const onChange = jest.fn();
      const { getAllByLabelText, getAllByRole, queryAllByText } = getWrapper({
        onChange,
        multiselect: true,
      });

      const input = getAllByLabelText(label)[0];

      fireEvent.change(input, { target: { value: 'Fi' } });
      const visibleOptions = getAllByRole('option');

      // Ensure that options are filtered correctly
      expect(visibleOptions.length).toBe(1);
      // Choose one option
      fireEvent.click(visibleOptions[0]);
      // Ensure that it's visible in selected items
      expect(queryAllByText(options[0].label).length).toEqual(2);
      // Ensure that it has been passed upwards with onChange
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([options[0]]);

      fireEvent.change(input, { target: { value: 'bo' } });
      expect(getAllByRole('option').length).toBe(2);
      fireEvent.click(getAllByRole('option')[1]);
      // Ensure that previous and current selection are visible in
      // selected items
      expect(queryAllByText(options[0].label).length).toEqual(2);
      expect(queryAllByText(options[4].label).length).toEqual(2);
      // Ensure that the current selection is passed correctly with
      // onChange
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith([options[0], options[4]]);
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
  });
});
