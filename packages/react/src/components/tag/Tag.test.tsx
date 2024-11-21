import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import { Tag, TagProps } from './Tag';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<Tag /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Tag>Foo</Tag>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders properties of the component', () => {
    const { asFragment } = render(
      <Tag className="tag-class" onDelete={jest.fn()} aria-label="Tag label for screen readers">
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
    const divProps = getCommonElementTestProps<'div', Pick<TagProps, 'role'>>('div');
    const { getByTestId } = render(<Tag {...divProps}>Foo</Tag>);
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });
});

describe('<Tag /> focus spec', () => {
  it('focus tests', () => {
    const onClick = jest.fn();
    const onDelete = jest.fn();
    const { getByTestId } = render(
      <div>
        <Tag data-testid="focusable1" onClick={onClick}>
          Label 1
        </Tag>
        <Tag data-testid="focusable2" onDelete={onDelete}>
          Label 2
        </Tag>
        <Tag data-testid="focusable3" href="#">
          Label 3
        </Tag>
        <Tag data-testid="non-focusable">Label</Tag>
      </div>,
    );
    const tagElementA = getByTestId('focusable1');
    const tagElementB = getByTestId('focusable2');
    const tagElementC = getByTestId('focusable3');
    const tagElementD = getByTestId('non-focusable');
    tagElementA.focus();
    expect(tagElementA).toHaveFocus();
    userEvent.tab();
    expect(tagElementB).toHaveFocus();
    userEvent.tab();
    expect(tagElementC).toHaveFocus();
    userEvent.tab();
    expect(tagElementD).not.toHaveFocus();
    tagElementD.focus();
    expect(tagElementD).not.toHaveFocus();
  });
});

describe('<Tag /> onClick, onDelete & href spec', () => {
  // test that onClick is called when the tag is clicked
  it('calls onClick when the tag is clicked or enter or space key pressed', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Tag data-testid="clickable" onClick={onClick}>
        Click
      </Tag>,
    );
    const tag = getByTestId('clickable');
    tag.click();
    expect(onClick).toHaveBeenCalled();
    const pressesA = onClick.mock.calls.length;
    userEvent.type(tag, '{enter}');
    const pressesB = onClick.mock.calls.length;
    expect(pressesA < pressesB).toBe(true);
    userEvent.type(tag, '{space}');
    const pressesC = onClick.mock.calls.length;
    expect(pressesB < pressesC).toBe(true);
  });

  // test that onDelete is called when the tag is clicked
  it('calls onDelete when the tag is clicked or enter or space key pressed', () => {
    const onDelete = jest.fn();
    const { getByTestId } = render(
      <Tag data-testid="deletable" onDelete={onDelete}>
        Delete
      </Tag>,
    );
    const tag = getByTestId('deletable');
    tag.click();
    expect(onDelete).toHaveBeenCalled();
    const pressesA = onDelete.mock.calls.length;
    userEvent.type(tag, '{enter}');
    const pressesB = onDelete.mock.calls.length;
    expect(pressesA < pressesB).toBe(true);
    userEvent.type(tag, '{space}');
    const pressesC = onDelete.mock.calls.length;
    expect(pressesB < pressesC).toBe(true);
    // also check that the tag contains the icon-cross icon with class hds-tag__icon
    const icon = tag.querySelector('.hds-tag__icon');
    expect(icon).toBeDefined();
  });

  it('checks that a link is rendered and is the same component as the tag', () => {
    const { getByTestId } = render(
      <Tag data-testid="link" href="https://hds.hel.fi">
        Link
      </Tag>,
    );
    const linkContainer = getByTestId('link');
    const aTag = screen.getByRole('link');
    expect(linkContainer).toContainElement(aTag);
    expect(aTag).toHaveAttribute('href', 'https://hds.hel.fi');
  });
});
