import React, { useState } from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchInput } from './SearchInput';

type SuggestionItemType = {
  value: string;
};

const suggestions: SuggestionItemType[] = ['Apple', 'Apricot', 'Avocado', 'Banana'].map((str) => ({ value: str }));

const getSuggestions = (inputValue: string): Promise<SuggestionItemType[]> => {
  return new Promise<Array<{ value: string }>>((resolve) => {
    resolve(
      suggestions.filter((suggestion) => {
        return suggestion.value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
      }),
    );
  });
};

describe('<SearchInput /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<SearchInput label="Search" onSubmit={() => null} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('uncontrolled component calls onChange when input value changes', async () => {
    const onChange = jest.fn();
    // eslint-disable-next-line no-console
    const onSubmit = () => console.log('submit');
    const { getAllByLabelText } = render(
      <SearchInput<SuggestionItemType>
        label="search"
        suggestionLabelField="value"
        getSuggestions={getSuggestions}
        onChange={onChange}
        onSubmit={onSubmit}
      />,
    );

    const input = getAllByLabelText('search')[0];
    userEvent.type(input, 't');
    expect(onChange.mock.calls[0][0]).toBe('t');
    userEvent.type(input, 'e');
    expect(onChange.mock.calls[1][0]).toBe('te');
    userEvent.type(input, 's');
    expect(onChange.mock.calls[2][0]).toBe('tes');
    userEvent.type(input, 't');
    expect(onChange.mock.calls[3][0]).toBe('test');
  });

  it('submits the selected item on mouse click', async () => {
    const onSubmit = jest.fn();
    const { getAllByLabelText, getAllByRole } = render(
      <SearchInput<SuggestionItemType>
        label="search"
        suggestionLabelField="value"
        getSuggestions={getSuggestions}
        onSubmit={onSubmit}
      />,
    );

    const input = getAllByLabelText('search')[0];
    userEvent.type(input, 'a');
    await waitFor(() => {
      const options = getAllByRole('option');
      userEvent.click(options[0]);
    });
    expect(onSubmit.mock.calls[0][0]).toBe('Apple');
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('Controlled component submits the input value on enter press or icon click', async () => {
    const onSubmit = jest.fn();
    const defaultValue = 'ab';
    const ControlledSearchInput = () => {
      const [stateValue, updateStateValue] = useState(defaultValue);
      return (
        <div>
          <SearchInput<SuggestionItemType>
            label="search"
            suggestionLabelField="value"
            getSuggestions={getSuggestions}
            onSubmit={onSubmit}
            onChange={updateStateValue}
            value={stateValue}
          />
        </div>
      );
    };

    const { getByLabelText } = render(<ControlledSearchInput />);

    const input = getByLabelText('search', { selector: 'input' });

    userEvent.type(input, 'c{enter}');
    await waitFor(() => {
      expect(input.getAttribute('value')).toBe('abc');
      expect(onSubmit.mock.calls[0][0]).toBe('abc');
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    userEvent.click(getByLabelText('Clear', { selector: 'button' }));
    await waitFor(() => {
      expect(input.getAttribute('value')).toBe('');
    });
    userEvent.type(input, '1234');
    userEvent.click(getByLabelText('Search', { selector: 'button' }));
    await waitFor(() => {
      expect(input.getAttribute('value')).toBe('1234');
      expect(onSubmit.mock.calls[1][0]).toBe('1234');
      expect(onSubmit).toHaveBeenCalledTimes(2);
    });
  });

  it('Controlled component submits the value when a dropdown item is selected with keyboard', async () => {
    const onSubmit = jest.fn();
    const targetValue = suggestions[1].value;
    const inputValue = targetValue.substring(0, 2).toLowerCase();
    const defaultValue = 'Fruit';
    const backspacesToDeleteValue = '{backspace}'.repeat(defaultValue.length);
    const ControlledSearchInput = () => {
      const [stateValue, updateStateValue] = useState(defaultValue);
      return (
        <div>
          <SearchInput<SuggestionItemType>
            label="search"
            suggestionLabelField="value"
            getSuggestions={getSuggestions}
            onSubmit={onSubmit}
            onChange={updateStateValue}
            value={stateValue}
          />
        </div>
      );
    };
    const { getByDisplayValue, getAllByRole } = render(<ControlledSearchInput />);

    const input = getByDisplayValue(defaultValue);
    userEvent.type(input, backspacesToDeleteValue);
    userEvent.type(input, inputValue);
    await waitFor(() => {
      const options = getAllByRole('option');
      expect(options).toHaveLength(2);
    });

    userEvent.type(input, '{arrowdown}{arrowdown}{enter}');
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toBe(targetValue);
      expect(input.getAttribute('value')).toBe(targetValue);
    });
  });

  it('Controlled component submits once if selected value is same as input value', async () => {
    const onSubmit = jest.fn();
    const onChange = jest.fn();
    const targetValue = suggestions[1].value;
    const secondTargetValue = suggestions[3].value;
    const defaultValue = 'HereToMakeComponentControlled';
    const ControlledSearchInput = () => {
      const [stateValue, updateStateValue] = useState(defaultValue);
      return (
        <div>
          <SearchInput<SuggestionItemType>
            label="search"
            suggestionLabelField="value"
            getSuggestions={getSuggestions}
            onSubmit={onSubmit}
            onChange={(value) => {
              onChange(value);
              updateStateValue(value);
            }}
            value={stateValue}
          />
        </div>
      );
    };
    const { getByDisplayValue, getAllByRole, getByLabelText, getAllByText } = render(<ControlledSearchInput />);

    const input = getByDisplayValue(defaultValue);
    userEvent.click(getByLabelText('Clear', { selector: 'button' }));
    userEvent.type(input, targetValue);
    expect(input.getAttribute('value')).toBe(targetValue);
    await waitFor(() => {
      const options = getAllByRole('option');
      userEvent.click(options[0]);
    });
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toBe(targetValue);
      expect(onChange).toHaveBeenLastCalledWith(targetValue);
    });

    userEvent.click(getByLabelText('Clear', { selector: 'button' }));
    await waitFor(() => {
      expect(() => getAllByRole('option')).toThrow();
    });
    userEvent.type(input, secondTargetValue);

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(secondTargetValue);
      expect(getAllByText(secondTargetValue, { selector: 'li' })).toHaveLength(1);
      userEvent.type(input, '{arrowdown}{enter}');
    });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(2);
      expect(onSubmit.mock.calls[1][0]).toBe(secondTargetValue);
    });
  });

  it('renders the input with default value', async () => {
    const onSubmit = jest.fn();
    const onChange = jest.fn();
    const value = 'Banana';
    render(
      <SearchInput<SuggestionItemType>
        label="search"
        suggestionLabelField="value"
        getSuggestions={getSuggestions}
        value={value}
        onSubmit={onSubmit}
        onChange={onChange}
      />,
    );

    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });
});
