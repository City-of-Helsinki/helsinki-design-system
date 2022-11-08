import React from 'react';
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

  it('calls onChange when input value changes', async () => {
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
