import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { SelectionGroup } from './SelectionGroup';
import { Checkbox } from '../checkbox';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<SelectionGroup /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <SelectionGroup>
        <Checkbox id="checkbox" label="Foo" />
      </SelectionGroup>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <SelectionGroup>
        <Checkbox id="checkbox" label="Foo" />
      </SelectionGroup>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('native html props are passed to the element', async () => {
    const fieldSetProps = getCommonElementTestProps<'fieldset'>('fieldset');
    const { getByTestId } = render(
      <SelectionGroup {...fieldSetProps}>
        <Checkbox id="checkbox" label="Foo" />
      </SelectionGroup>,
    );
    const element = getByTestId(fieldSetProps['data-testid']);
    expect(getElementAttributesMisMatches(element, fieldSetProps)).toHaveLength(0);
  });
});
