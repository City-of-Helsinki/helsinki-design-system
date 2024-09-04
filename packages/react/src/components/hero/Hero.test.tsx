import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Hero, HeroProps } from './Hero';
import { Button, ButtonVariant } from '../button';
import { getElementAttributesMisMatches, getCommonElementTestProps } from '../../utils/testHelpers';

describe('<Hero /> spec', () => {
  const imageSrc = 'http://image.com/image.jpg';
  const DefaultContent = () => {
    return (
      <>
        <h1>This is the heading</h1>
        <p>Nullam ut nunc consectetur, accumsan nunc sed, luctus nisl. Curabitur lacinia!</p>
        <Button variant={ButtonVariant.Secondary} role="link">
          Click me
        </Button>
      </>
    );
  };

  const HeroWithContent = (props: HeroProps) => {
    const heroProps: HeroProps = {
      ...props,
      imageSrc: props.variant !== 'noImage' ? imageSrc : undefined,
      showArrowIcon: true,
      information: 'Test info',
    };
    return (
      <Hero {...heroProps}>
        <DefaultContent />
      </Hero>
    );
  };

  const componentVariations = [
    () => <HeroWithContent variant="diagonalKoros" />,
    () => <HeroWithContent variant="backgroundImage" />,
    () => <HeroWithContent variant="imageLeft" />,
    () => <HeroWithContent variant="imageRight" />,
    () => <HeroWithContent variant="noImage" />,
    () => <HeroWithContent variant="imageBottom" />,
  ];

  it('renders the component', () => {
    componentVariations.forEach((Component) => {
      const { asFragment } = render(<Component />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
  it('should not have basic accessibility issues', async () => {
    // cannot use forEach with async/await
    // eslint-disable-next-line no-restricted-syntax
    for (const Component of componentVariations) {
      const { container } = render(<Component />);
      // eslint-disable-next-line no-await-in-loop
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });
  it('Native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps('div');
    const { getByTestId } = render(<HeroWithContent variant="backgroundImage" {...divProps} />);
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });
});
