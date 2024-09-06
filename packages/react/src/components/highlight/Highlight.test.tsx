import React from 'react';
import { render } from '@testing-library/react';

import { Highlight } from './Highlight';
import { getElementAttributesMisMatches, getCommonElementTestProps } from '../../utils/testHelpers';

describe('<Highlight /> spec', () => {
  it('renders the Highlight', () => {
    const { asFragment } = render(
      <Highlight text="You may select an highlight from the article to be displayed here. Select an excerpt that you want the user to pay attention to." />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the Quote', () => {
    const { asFragment } = render(
      <Highlight text="Add an interesting quote here" type="quote" reference="First name Last name. Title." />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('Native html props are passed to the element', async () => {
    const elementProps = getCommonElementTestProps('all');
    const { getByTestId } = render(
      <Highlight
        text="Add an interesting quote here"
        type="quote"
        reference="First name Last name. Title."
        {...elementProps}
      />,
    );
    const element = getByTestId(elementProps['data-testid']);
    expect(getElementAttributesMisMatches(element, elementProps)).toHaveLength(0);
  });
});
