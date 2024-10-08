import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Tag, TagProps } from './Tag';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<Tag /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Tag>Foo</Tag>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders properties of the component', () => {
    const { asFragment } = render(
      <Tag
        id="tag-id"
        className="tag-class"
        deleteButtonAriaLabel="delete me"
        labelClassName="label-class"
        labelProps={{ id: 'label-id' }}
        onDelete={jest.fn()}
        role="button"
        srOnlyLabel="Tag label for screen readers"
      >
        Tag label
      </Tag>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Tag>Foo</Tag>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps<'div', Pick<TagProps, 'onClick' | 'role'>>('div');
    const { getByTestId } = render(<Tag {...divProps}>Foo</Tag>);
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });
});
