import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { act } from 'react-dom/test-utils';

import { TextInput, TextInputProps } from './TextInput';
import { IconSearch } from '../../icons';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<TextInput /> spec', () => {
  const textInputProps: TextInputProps = {
    id: 'hdsInput',
    label: 'HDS input field',
    placeholder: 'A placeholder text',
    helperText: 'Helper text',
    errorText: 'Error text',
    labelId: 'Label id',
  };
  it('renders the component', () => {
    const { asFragment } = render(<TextInput {...textInputProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<TextInput {...textInputProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('Native html props are passed to the element', async () => {
    const inputProps = getCommonElementTestProps<'input', { defaultValue: string; value: string }>('input');
    const { getByTestId } = render(<TextInput {...textInputProps} {...inputProps} />);
    const element = getByTestId(inputProps['data-testid']);
    // id, className and style are set to the wrapper element, others to input
    expect(
      getElementAttributesMisMatches(element, { ...inputProps, id: undefined, style: undefined, className: undefined }),
    ).toHaveLength(0);
  });
  it('renders the component with tooltip', () => {
    const { asFragment } = render(
      <TextInput tooltipText="Tooltip text" tooltipLabel="Tooltip label" {...textInputProps} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the component with search clear button', () => {
    const { asFragment } = render(<TextInput type="search" {...textInputProps} defaultValue="string to search for" />);
    expect(asFragment()).toMatchSnapshot();

    // clear the search field
    const rootElement = document.querySelector('.root') as HTMLDivElement;
    const clearButton = document.querySelector('.clearButton') as HTMLButtonElement;
    const input = document.querySelector('.hasClearButton') as HTMLInputElement;
    expect(rootElement).toHaveAttribute('data-hds-textinput-filled');
    expect(input).toHaveValue('string to search for');
    expect(clearButton).toBeInTheDocument();
    act(() => {
      fireEvent.click(clearButton);
    });
    expect(rootElement).not.toHaveAttribute('data-hds-textinput-filled');
    expect(input).toHaveValue('');
  });

  it('should not have filled attribute if no default value given', () => {
    render(<TextInput type="search" {...textInputProps} />);
    const rootElement = document.querySelector('.root') as HTMLDivElement;
    expect(rootElement).not.toHaveAttribute('data-hds-textinput-filled');
  });

  it('test adding text and then removing it', () => {
    render(<TextInput type="search" {...textInputProps} />);
    const rootElement = document.querySelector('.root') as HTMLDivElement;
    const input = document.querySelector('.hasClearButton') as HTMLInputElement;
    expect(rootElement).not.toHaveAttribute('data-hds-textinput-filled');

    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    expect(rootElement).toHaveAttribute('data-hds-textinput-filled');

    act(() => {
      fireEvent.change(input, { target: { value: '' } });
    });

    expect(rootElement).not.toHaveAttribute('data-hds-textinput-filled');
  });

  // test input callback functions
  it('test onChange callback', () => {
    const onChange = jest.fn();
    render(<TextInput type="search" {...textInputProps} onChange={onChange} />);
    const input = document.querySelector('input') as HTMLInputElement;
    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });
    expect(onChange).toHaveBeenCalled();
  });

  // test input onKeyUp callback functions
  it('test onKeyUp callback', () => {
    const onKeyUp = jest.fn();
    render(<TextInput type="search" {...textInputProps} onKeyUp={onKeyUp} />);
    const input = document.querySelector('input') as HTMLInputElement;
    act(() => {
      fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
    });
    expect(onKeyUp).toHaveBeenCalled();
  });

  // test that input with clear button triggers onChange callback
  it('test onChange callback on clear button click', () => {
    const onChange = jest.fn();
    render(<TextInput type="search" {...textInputProps} onChange={onChange} defaultValue="test input" />);
    const clearButton = document.querySelector('.clearButton') as HTMLButtonElement;
    act(() => {
      fireEvent.click(clearButton);
    });
    expect(onChange).toHaveBeenCalled();
  });

  // test input with buttonIcon and onButtonClick callback
  it('test onButtonClick callback and that two buttons exist', () => {
    const onButtonClick = jest.fn();
    const { getByLabelText } = render(
      <TextInput
        {...textInputProps}
        buttonIcon={<IconSearch />}
        buttonAriaLabel="Search"
        onButtonClick={onButtonClick}
        defaultValue="test input"
      />,
    );
    const button = getByLabelText('Search') as HTMLButtonElement;
    act(() => {
      fireEvent.click(button);
    });
    expect(onButtonClick).toHaveBeenCalled();
  });

  // test that two buttons exist when type="search" and a button is given
  it('test that two buttons exist when type="search" and a button is given', () => {
    const onButtonClick = jest.fn();
    render(
      <TextInput
        {...textInputProps}
        buttonAriaLabel="Search"
        buttonIcon={<IconSearch />}
        defaultValue="test input"
        onButtonClick={onButtonClick}
        type="search"
      />,
    );

    const buttons = document.getElementsByClassName('button');
    expect(buttons.length).toBe(2);
  });
});
