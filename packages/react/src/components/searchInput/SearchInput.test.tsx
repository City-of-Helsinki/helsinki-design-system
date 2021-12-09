import React from 'react';
import { render } from '@testing-library/react';
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
});
