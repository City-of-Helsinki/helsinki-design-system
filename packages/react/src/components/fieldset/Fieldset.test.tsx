import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Fieldset } from './Fieldset';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<Fieldset /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Fieldset heading="Test fieldset" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Fieldset heading="Test fieldset" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('Native html props are passed to the element', async () => {
    const fieldsetProps = getCommonElementTestProps<'fieldset'>('fieldset');
    const { getByTestId } = render(<Fieldset {...fieldsetProps} heading="Test fieldset" />);
    const element = getByTestId(fieldsetProps['data-testid']);
    expect(getElementAttributesMisMatches(element, fieldsetProps)).toHaveLength(0);
  });
});
