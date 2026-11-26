import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { TextArea, TextAreaProps } from './TextArea';
import { Tooltip } from '../tooltip';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<Textarea /> spec', () => {
  const textAreaProps: TextAreaProps = {
    id: 'hdsInput',
    label: 'HDS input field',
    placeholder: 'A placeholder text',
    helperText: 'Helper text',
    errorText: 'Error text',
  };

  it('renders the component', () => {
    const { asFragment } = render(<TextArea {...textAreaProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<TextArea {...textAreaProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('renders the component with tooltip', () => {
    const { asFragment } = render(
      <TextArea tooltip={<Tooltip tooltipLabel="Tooltip label">Tooltip text</Tooltip>} {...textAreaProps} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('native html props are passed to the element', async () => {
    const textAreaAdditionalProps = getCommonElementTestProps<
      'textarea',
      Pick<TextAreaProps, 'value' | 'onChange' | 'defaultValue'>
    >('textarea');
    const { getByTestId } = render(<TextArea {...textAreaProps} {...textAreaAdditionalProps} />);
    const element = getByTestId(textAreaAdditionalProps['data-testid']);
    // className and style is set to the input element, others to wrapper
    expect(
      getElementAttributesMisMatches(element, {
        ...textAreaAdditionalProps,
        className: undefined,
        style: undefined,
        // aria-describedby is merged with the ids of the helper and error texts
        'aria-describedby': `${textAreaAdditionalProps['aria-describedby']} ${textAreaAdditionalProps.id}-helper ${textAreaAdditionalProps.id}-error`,
      }),
    ).toHaveLength(0);
  });

  describe('aria-describedby', () => {
    it('keeps the ids of the texts when aria-describedby is given', () => {
      const { getByRole } = render(<TextArea {...textAreaProps} aria-describedby="custom-description" />);
      expect(getByRole('textbox').getAttribute('aria-describedby')).toBe(
        'custom-description hdsInput-helper hdsInput-error',
      );
    });
    it('uses only the given aria-describedby when there are no texts', () => {
      const { getByRole } = render(
        <TextArea id="hdsInput" label="HDS input field" aria-describedby="custom-description" />,
      );
      expect(getByRole('textbox').getAttribute('aria-describedby')).toBe('custom-description');
    });
  });
});
