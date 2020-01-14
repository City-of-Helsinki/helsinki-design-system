import React from 'react';
import { shallow } from 'enzyme';

import Expandable from './Expandable';

describe('Expandable', () => {
  const onClick = jest.fn();

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  const getWrapper = props =>
    shallow(
      <Expandable label="Click me" onClick={onClick} {...props}>
        <div>one</div>
        <div>two</div>
      </Expandable>
    );

  it('renders normally', () => {
    expect(getWrapper().html()).toMatchSnapshot();
  });

  it('calls the supplied onClick when the label button is clicked', () => {
    const labelContainer = getWrapper().find('.label');
    labelContainer.simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
