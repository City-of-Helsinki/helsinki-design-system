import { render, screen } from '@testing-library/react';
import * as React from 'react';
// Use react-test-renderer to test state before useEffect takes place:
// https://stackoverflow.com/questions/61459112/how-to-test-component-before-useeffect-with-testing-library-react
import { create } from 'react-test-renderer';

import { VisibleAfterComponentMounted } from './VisibleAfterComponentMounted';

it('is visible after mounting', async () => {
  const Component = <VisibleAfterComponentMounted>Hello World</VisibleAfterComponentMounted>;
  const elem = create(Component);
  expect(elem.root.findByType('span').props.style).toEqual({
    visibility: 'hidden',
  });
  elem.update(Component);
  expect(elem.root.findByType('span').props.style).toEqual({});
  expect(elem.root.findByType('span').children).toContain('Hello World');
});

it('overrides visibility but preserves other styles', async () => {
  const Component = (
    <VisibleAfterComponentMounted style={{ visibility: 'visible', color: 'red' }}>
      Hello World
    </VisibleAfterComponentMounted>
  );
  const elem = create(Component);
  expect(elem.root.findByType('span').props.style).toEqual({
    visibility: 'hidden',
    color: 'red',
  });
  elem.update(Component);
  expect(elem.root.findByType('span').props.style).toEqual({
    color: 'red',
    visibility: 'visible',
  });
});

it('renders as heading', () => {
  render(<VisibleAfterComponentMounted as="h1">Hello World</VisibleAfterComponentMounted>);
  expect(screen.queryByRole('heading', { name: 'Hello World' })).toBeInTheDocument();
});

it('renders as button', () => {
  render(<VisibleAfterComponentMounted as="button">Hello World</VisibleAfterComponentMounted>);
  expect(screen.queryByRole('button', { name: 'Hello World' })).toBeInTheDocument();
});
