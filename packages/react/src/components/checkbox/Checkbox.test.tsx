import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    expect(
      getElementAttributesMisMatches(element, { ...inputProps, style: undefined, className: undefined }),
    ).toHaveLength(0);
  });

  describe('controlled and uncontrolled usage', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    const getCheckbox = () => screen.getByRole('checkbox', { name: 'Label' });

    it('can be used as an uncontrolled component with defaultChecked', async () => {
      const user = userEvent.setup();
      render(<Checkbox id="uncontrolled-default-checked" label="Label" defaultChecked />);
      expect(getCheckbox()).toBeChecked();

      await user.click(getCheckbox());
      expect(getCheckbox()).not.toBeChecked();

      await user.click(getCheckbox());
      expect(getCheckbox()).toBeChecked();
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('toggles as an uncontrolled component when neither checked nor defaultChecked is given', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Checkbox id="uncontrolled" label="Label" onChange={onChange} />);
      expect(getCheckbox()).not.toBeChecked();

      await user.click(getCheckbox());
      expect(getCheckbox()).toBeChecked();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('works as a controlled component', async () => {
      const user = userEvent.setup();
      const ControlledCheckbox = () => {
        const [checked, setChecked] = useState(false);
        return (
          <Checkbox id="controlled" label="Label" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        );
      };
      render(<ControlledCheckbox />);
      expect(getCheckbox()).not.toBeChecked();

      await user.click(getCheckbox());
      expect(getCheckbox()).toBeChecked();

      await user.click(getCheckbox());
      expect(getCheckbox()).not.toBeChecked();
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('stays controlled by the checked prop when no onChange is given', async () => {
      const user = userEvent.setup();
      render(<Checkbox id="controlled-read-only" label="Label" checked />);
      expect(getCheckbox()).toBeChecked();

      await user.click(getCheckbox());
      expect(getCheckbox()).toBeChecked();
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('treats checked={undefined} as an unchecked controlled component (backwards compatibility)', async () => {
      const user = userEvent.setup();
      // Common pattern (also used in the documentation): the state does not have a value for the checkbox initially
      const ControlledCheckbox = () => {
        const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
        return (
          <Checkbox
            id="controlled-undefined"
            label="Label"
            checked={checkedItems['controlled-undefined']}
            onChange={(e) => setCheckedItems({ ...checkedItems, [e.target.id]: e.target.checked })}
          />
        );
      };
      render(<ControlledCheckbox />);
      expect(getCheckbox()).not.toBeChecked();

      await user.click(getCheckbox());
      expect(getCheckbox()).toBeChecked();
      // No "A component is changing an uncontrolled input to be controlled" warning
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });
});
