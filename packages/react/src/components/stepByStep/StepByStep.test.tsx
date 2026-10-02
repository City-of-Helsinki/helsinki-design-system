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
  it('wraps a string description in a paragraph', () => {
    const { getByText } = render(<StepByStep steps={[{ title: 'Step', description: 'Text description' }]} />);
    expect(getByText('Text description').tagName).toBe('P');
  });
  it('renders a JSX description as is, without a wrapping paragraph', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const description = (
      <div data-testid="jsx-description">
        <p>Paragraph inside JSX description</p>
      </div>
    );
    const { getByTestId } = render(<StepByStep steps={[{ title: 'Step', description }]} />);
    const element = getByTestId('jsx-description');
    expect(element.parentElement?.tagName).toBe('DIV');
    expect(element.closest('p')).toBeNull();
    const nestingWarnings = consoleErrorSpy.mock.calls.filter(([message]) =>
      String(message).includes('validateDOMNesting'),
    );
    consoleErrorSpy.mockRestore();
    expect(nestingWarnings).toHaveLength(0);
  });
});
