import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Checkbox, CheckboxProps } from './Checkbox';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<Checkbox /> spec', () => {
  const checkboxProps: CheckboxProps = {
    label: 'label text',
    id: 'test',
    helperText: 'Helper text',
    errorText: 'Error text',
    'data-testid': 'testId',
    onChange: (e: React.ChangeEvent) => {
      if (e) {
        //
      }
    },
  };

  it('renders the component', () => {
    const { asFragment } = render(<Checkbox {...checkboxProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Checkbox {...checkboxProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('native html props are passed to the element', async () => {
    const inputProps = getCommonElementTestProps<'input', { value: string }>('input');
    const { getByTestId } = render(<Checkbox {...checkboxProps} {...inputProps} />);
    const element = getByTestId(inputProps['data-testid']);
    // className and style are set to the wrapper element, others to input
    // aria-describedby is merged with the ids of the helper and error texts
    expect(
      getElementAttributesMisMatches(element, {
        ...inputProps,
        style: undefined,
        className: undefined,
        'aria-describedby': `${inputProps['aria-describedby']} ${inputProps.id}-helper ${inputProps.id}-error`,
      }),
    ).toHaveLength(0);
  });
  describe('aria-describedby', () => {
    it('refers to the helper and error texts', () => {
      const { getByRole } = render(<Checkbox {...checkboxProps} />);
      expect(getByRole('checkbox').getAttribute('aria-describedby')).toBe('test-helper test-error');
    });
    it('keeps the helper and error texts when aria-describedby is given', () => {
      const { getByRole } = render(<Checkbox {...checkboxProps} aria-describedby="custom-description" />);
      expect(getByRole('checkbox').getAttribute('aria-describedby')).toBe('custom-description test-helper test-error');
    });
    it('uses only the given aria-describedby when there are no helper or error texts', () => {
      const { getByRole } = render(<Checkbox id="test" label="label text" aria-describedby="custom-description" />);
      expect(getByRole('checkbox').getAttribute('aria-describedby')).toBe('custom-description');
    });
    it('has no aria-describedby when there is nothing to refer to', () => {
      const { getByRole } = render(<Checkbox id="test" label="label text" />);
      expect(getByRole('checkbox')).not.toHaveAttribute('aria-describedby');
    });
  });
});
