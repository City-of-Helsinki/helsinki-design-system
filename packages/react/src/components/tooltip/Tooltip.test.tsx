import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import { Tooltip } from './Tooltip';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<TooltipNew /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <Tooltip
        small
        placement="auto"
        buttonLabel="Tooltip button"
        tooltipLabel="Tooltip label"
        className="className"
        buttonClassName="buttonClassName"
        tooltipClassName="tooltipClassName"
      >
        Tooltip content
      </Tooltip>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('opens the tooltip when button is clicked', async () => {
    const { asFragment, getByRole } = render(
      <Tooltip
        small
        placement="auto"
        buttonLabel="Tooltip button"
        tooltipLabel="Tooltip label"
        className="className"
        buttonClassName="buttonClassName"
        tooltipClassName="tooltipClassName"
      >
        Tooltip content
      </Tooltip>,
    );
    fireEvent.click(getByRole('button'));
    waitFor(() => getByRole('section'));
    expect(asFragment()).toMatchSnapshot();
  });
  it('native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps('div');
    const { getByTestId } = render(
      <Tooltip
        {...divProps}
        small
        placement="auto"
        buttonLabel="Tooltip button"
        tooltipLabel="Tooltip label"
        buttonClassName="buttonClassName"
        tooltipClassName="tooltipClassName"
      >
        Tooltip content
      </Tooltip>,
    );
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });
});
