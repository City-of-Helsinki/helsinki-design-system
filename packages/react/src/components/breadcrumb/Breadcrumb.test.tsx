import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Breadcrumb } from './Breadcrumb';

describe('<Breadcrumb /> spec', () => {
  const defaultList = [
    { title: 'Home', path: '/' },
    { title: 'Level 1', path: '/level1' },
    { title: 'Level 2', path: '/level2' },
    { title: 'Level 3', path: '/level3' },
    { title: 'Current', path: null },
  ];
  it('renders the component', () => {
    const { asFragment } = render(<Breadcrumb list={defaultList} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Breadcrumb list={defaultList} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('renders all items. Last item with a path (#3) is also in mobile view and therefore rendered twice.', async () => {
    const { getAllByText, getByText, container } = render(<Breadcrumb list={defaultList} />);
    expect(container.querySelectorAll('nav')).toHaveLength(1);
    defaultList.forEach((item) => {
      if (!item.path) {
        expect(() => getByText(item.title, { selector: 'span' })).not.toThrow();
      } else if (item.path === defaultList[3].path) {
        expect(getAllByText(item.title, { selector: 'a' })).toHaveLength(2);
      } else {
        expect(() => getByText(item.title, { selector: 'a' })).not.toThrow();
      }
    });
  });
  it('returns null if there are no items with paths.', async () => {
    const { container } = render(
      <Breadcrumb
        list={[
          { title: 'Home', path: null },
          { title: 'Current', path: null },
        ]}
      />,
    );
    expect(container.querySelectorAll('nav')).toHaveLength(0);
  });
});
