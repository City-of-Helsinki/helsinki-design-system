import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { StepByStep } from './StepByStep';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

const steps = [
  {
    title: 'Vaiheen 1 otsikko',
    description:
      'Tähän voit lisätä tekstiä, joka kertoo käyttäjälle mitä kyseisessä vaiheessa tapahtuu. Pidä teksti tiiviinä, jotta käyttäjä saa kokonaiskuvan prosessista ja sen vaiheista helposti silmäilemällä.',
    buttons: [
      {
        children: 'Esimerkki painikkeesta',
        href: 'https://hel.fi',
      },
    ],
    links: [
      {
        children: 'Esimerkki lisätietolinkistä',
        href: 'https://hel.fi',
      },
    ],
  },
  {
    title: 'Vaiheen 2 otsikko',
    description: 'Tähän voit lisätä tekstiä.',
  },
];

describe('<StepByStep /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<StepByStep numberedList steps={steps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<StepByStep steps={steps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps('div');
    const { getByTestId } = render(<StepByStep {...divProps} steps={steps} />);
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, { ...divProps })).toHaveLength(0);
  });
});
