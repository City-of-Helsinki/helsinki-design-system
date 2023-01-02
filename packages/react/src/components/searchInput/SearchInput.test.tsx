import React, { useState } from 'react';
import { render, waitFor, screen, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchInput, SearchInputProps } from './SearchInput';

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
  let renderResult: RenderResult;
  const defaultProps: Pick<
    SearchInputProps<SuggestionItemType>,
    'label' | 'suggestionLabelField' | 'getSuggestions'
  > = {
    label: 'search',
    suggestionLabelField: 'value',
    getSuggestions,
  };

  const getInputByDefaultLabel = () => {
    return renderResult.getByLabelText(defaultProps.label as string, { selector: 'input' });
  };

  const clickResetButton = () => {
    userEvent.click(renderResult.getByLabelText('Clear', { selector: 'button' }));
  };

  const initTests = (props: Partial<SearchInputProps<SuggestionItemType>>, defaultValue?: string): RenderResult => {
    const mergedProps = {
      ...defaultProps,
      ...props,
    } as SearchInputProps<SuggestionItemType>;
    if (defaultValue) {
      const ControlledSearchInput = () => {
        const [stateValue, updateStateValue] = useState(defaultValue);
        const onChange = (value: string) => {
          if (props.onChange) {
            props.onChange(value);
          }
          updateStateValue(value);
        };
        return (
          <div>
            <SearchInput<SuggestionItemType> {...mergedProps} onChange={onChange} value={stateValue} />
          </div>
        );
      };
      renderResult = render(<ControlledSearchInput />);
    } else {
      renderResult = render(<SearchInput<SuggestionItemType> {...mergedProps} />);
    }
    return renderResult;
  };

  it('renders the component', () => {
    const { asFragment } = render(<SearchInput label="Search" onSubmit={() => null} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('uncontrolled component calls onChange when input value changes', async () => {
    const onChange = jest.fn();
    // eslint-disable-next-line no-console
    const onSubmit = () => console.log('submit');
    initTests({ onSubmit, onChange });

    const input = getInputByDefaultLabel();
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
    const { getAllByRole } = initTests({ onSubmit });

    const input = getInputByDefaultLabel();
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

    const { getByLabelText } = initTests({ onSubmit }, defaultValue);

    const input = getInputByDefaultLabel();

    userEvent.type(input, 'c{enter}');
    await waitFor(() => {
      expect(input.getAttribute('value')).toBe('abc');
      expect(onSubmit.mock.calls[0][0]).toBe('abc');
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    clickResetButton();
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

    const { getByDisplayValue, getAllByRole } = initTests({ onSubmit }, defaultValue);

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
    const { getByDisplayValue, getAllByRole, getAllByText } = initTests({ onSubmit, onChange }, defaultValue);

    const input = getByDisplayValue(defaultValue);
    clickResetButton();
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

    clickResetButton();
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
    render(<SearchInput<SuggestionItemType> {...defaultProps} value={value} onSubmit={onSubmit} onChange={onChange} />);

    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });
});
