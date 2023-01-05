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
  const onSubmit = jest.fn();
  const onChange = jest.fn();
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

  const getMockFunctionArgument = (fn: jest.Mock, index: number) => {
    return fn.mock.calls[index][0];
  };

  const getOnChangeArgumentByIndex = (index: number) => {
    return getMockFunctionArgument(onChange, index);
  };

  const getOnSubmitArgumentByIndex = (index: number) => {
    return getMockFunctionArgument(onSubmit, index);
  };

  const initTests = (props: Partial<SearchInputProps<SuggestionItemType>>, defaultValue?: string): RenderResult => {
    const mergedProps = {
      ...defaultProps,
      ...props,
    } as SearchInputProps<SuggestionItemType>;
    if (defaultValue) {
      const ControlledSearchInput = () => {
        const [stateValue, updateStateValue] = useState(defaultValue);
        const onChangeCallback = (value: string) => {
          if (props.onChange) {
            props.onChange(value);
          }
          updateStateValue(value);
        };
        return (
          <div>
            <SearchInput<SuggestionItemType> {...mergedProps} onChange={onChangeCallback} value={stateValue} />
          </div>
        );
      };
      renderResult = render(<ControlledSearchInput />);
    } else {
      renderResult = render(<SearchInput<SuggestionItemType> {...mergedProps} />);
    }
    return renderResult;
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the component', () => {
    const { asFragment } = render(<SearchInput label="Search" onSubmit={() => null} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('uncontrolled component calls onChange when input value changes', async () => {
    initTests({ onSubmit, onChange });
    const input = getInputByDefaultLabel();
    userEvent.type(input, 't');
    expect(getOnChangeArgumentByIndex(0)).toBe('t');
    userEvent.type(input, 'e');
    expect(getOnChangeArgumentByIndex(1)).toBe('te');
    userEvent.type(input, 's');
    expect(getOnChangeArgumentByIndex(2)).toBe('tes');
    userEvent.type(input, 't');
    expect(getOnChangeArgumentByIndex(3)).toBe('test');
  });

  it('submits the selected item on mouse click', async () => {
    const { getAllByRole } = initTests({ onSubmit });
    const input = getInputByDefaultLabel();
    userEvent.type(input, 'a');
    await waitFor(() => {
      const options = getAllByRole('option');
      userEvent.click(options[0]);
    });
    expect(getOnSubmitArgumentByIndex(0)).toBe('Apple');
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('Controlled component submits the input value on enter press or icon click', async () => {
    const defaultValue = 'ab';
    const { getByLabelText } = initTests({ onSubmit }, defaultValue);
    const input = getInputByDefaultLabel();
    userEvent.type(input, 'c{enter}');
    await waitFor(() => {
      expect(input.getAttribute('value')).toBe('abc');
      expect(getOnSubmitArgumentByIndex(0)).toBe('abc');
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
      expect(getOnSubmitArgumentByIndex(1)).toBe('1234');
      expect(onSubmit).toHaveBeenCalledTimes(2);
    });
  });

  it('Controlled component submits the value when a dropdown item is selected with keyboard. Suggestions are closed.', async () => {
    const targetValue = suggestions[1].value;
    const inputValue = targetValue.substring(0, 2).toLowerCase();
    const defaultValue = 'Fruit';
    const backspacesToDeleteValue = '{backspace}'.repeat(defaultValue.length);
    const { getByDisplayValue, getAllByRole } = initTests({ onSubmit }, defaultValue);
    const input = getByDisplayValue(defaultValue);
    userEvent.type(input, backspacesToDeleteValue);
    userEvent.type(input, inputValue);
    await waitFor(() => {
      expect(getAllByRole('option')).toHaveLength(2);
    });
    userEvent.type(input, '{arrowdown}{arrowdown}{enter}');
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(getOnSubmitArgumentByIndex(0)).toBe(targetValue);
      expect(input.getAttribute('value')).toBe(targetValue);
    });
    expect(() => getAllByRole('option')).toThrow();
  });

  it('Controlled component submits once if selected value is same as input value', async () => {
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
      expect(getOnSubmitArgumentByIndex(0)).toBe(targetValue);
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
      expect(getOnSubmitArgumentByIndex(1)).toBe(secondTargetValue);
    });
  });

  it('renders the input with default value', async () => {
    const value = 'Banana';
    render(<SearchInput<SuggestionItemType> {...defaultProps} value={value} onSubmit={onSubmit} onChange={onChange} />);
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });

  it('Suggestions are closed when current value is submitted with enter press or icon click', async () => {
    // make component controlled
    const defaultValue = 'default';
    const { getByLabelText, getAllByRole } = initTests({ onSubmit }, defaultValue);
    const input = getInputByDefaultLabel();
    const getOptions = () => getAllByRole('option');

    clickResetButton();
    userEvent.type(input, 'a');
    await waitFor(() => {
      expect(getOptions()).toHaveLength(4);
    });

    userEvent.type(input, '{enter}');
    await waitFor(() => {
      expect(getOnSubmitArgumentByIndex(0)).toBe('a');
      expect(() => getOptions()).toThrow();
    });

    userEvent.type(input, 'p');
    await waitFor(() => {
      expect(getOptions()).toHaveLength(2);
    });

    userEvent.click(getByLabelText('Search', { selector: 'button' }));
    await waitFor(() => {
      expect(getOnSubmitArgumentByIndex(1)).toBe('ap');
      expect(() => getOptions()).toThrow();
    });
    expect(onSubmit).toHaveBeenCalledTimes(2);
  });
});
