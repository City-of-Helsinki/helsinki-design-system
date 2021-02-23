import { render, screen } from '@testing-library/react';
import * as React from 'react';
// Use react-test-renderer to test state before useEffect takes place:
// https://stackoverflow.com/questions/61459112/how-to-test-component-before-useeffect-with-testing-library-react
import { create } from 'react-test-renderer';

import { RenderAfterComponentMounted } from './RenderAfterComponentMounted';

it('renders after mounting', async () => {
  const Component = <RenderAfterComponentMounted>Hello World</RenderAfterComponentMounted>;
  const elem = create(Component);
  expect(elem.root.children).toEqual([]);
  elem.update(Component);
  expect(elem.root.findByType('span').children).toContain('Hello World');
});

it('renders as heading', () => {
  render(<RenderAfterComponentMounted as="h1">Hello World</RenderAfterComponentMounted>);
  expect(screen.queryByRole('heading', { name: 'Hello World' })).toBeInTheDocument();
});

it('renders as button', () => {
  render(<RenderAfterComponentMounted as="button">Hello World</RenderAfterComponentMounted>);
  expect(screen.queryByRole('button', { name: 'Hello World' })).toBeInTheDocument();
});
