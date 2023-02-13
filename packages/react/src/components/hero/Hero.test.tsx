import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Hero } from './Hero';
import { Button } from '../button';

describe('<Hero /> spec', () => {
  const imageSrc = 'http://image.com/image.jpg';
  const DefaultCardContent = () => {
    return (
      <>
        <h1>This is the heading</h1>
        <p>Nullam ut nunc consectetur, accumsan nunc sed, luctus nisl. Curabitur lacinia!</p>
        <Button variant="secondary" role="link">
          Click me
        </Button>
      </>
    );
  };

  const TextAndOrImage = ({ imagePosition }: { imagePosition?: 'left' | 'right' }) => {
    return (
      <Hero>
        {imagePosition === 'left' && <Hero.Image src={imageSrc} />}
        <Hero.Card>
          <DefaultCardContent />
        </Hero.Card>
        {imagePosition === 'right' && <Hero.Image src={imageSrc} />}
      </Hero>
    );
  };

  const WithBackgroundImage = ({ imagePosition }: { imagePosition: 'top' | 'right' }) => {
    return (
      <Hero>
        {imagePosition === 'top' && <Hero.BackgroundImage src={imageSrc} />}
        <Hero.Card>
          <DefaultCardContent />
        </Hero.Card>
        {imagePosition === 'right' && <Hero.BackgroundImage src={imageSrc} />}
      </Hero>
    );
  };

  const BottomWideImage = () => (
    <Hero>
      <Hero.Card>
        <DefaultCardContent />
      </Hero.Card>
      <Hero.WideImage src={imageSrc} />
    </Hero>
  );

  const componentVariations = [
    () => <WithBackgroundImage imagePosition="right" />,
    () => <WithBackgroundImage imagePosition="top" />,
    () => <TextAndOrImage imagePosition="left" />,
    () => <TextAndOrImage imagePosition="right" />,
    () => <TextAndOrImage />,
    () => <BottomWideImage />,
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
});
