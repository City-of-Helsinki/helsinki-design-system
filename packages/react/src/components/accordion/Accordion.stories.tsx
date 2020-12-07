import React from 'react';

import { IconAngleDown, IconAngleUp } from '../../icons';
import { Button } from '../button';
import { Card } from '../card';
import { Accordion } from './Accordion';
import { useAccordion } from './useAccordion';

export default {
  component: Accordion,
  title: 'Components/Accordion',
  decorators: [(storyFn) => <div style={{ maxWidth: '360px' }}>{storyFn()}</div>],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    title: 'How to publish data?',
    card: false,
    children: 'To publish your data, open your profile settings and click buttton "Publish".',
  },
};

export const Default = (args) => <Accordion {...args} />;

export const CardAccordion = (args) => <Accordion {...args} />;
CardAccordion.storyName = 'Card';
CardAccordion.args = {
  card: true,
};

export const Custom = () => {
  const { isOpen, buttonProps, contentProps } = useAccordion({ initiallyOpen: false });

  const icon = isOpen ? <IconAngleUp aria-hidden /> : <IconAngleDown aria-hidden />;

  return (
    <>
      <Button iconLeft={icon} {...buttonProps}>
        Advanced filters
      </Button>
      <Card border aria-label="Advanced filters" style={{ marginTop: '20px' }} {...contentProps}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolorem dolore libero hic culpa nisi et ipsam in
        voluptatibus, iste numquam repellendus officia quam repudiandae animi aspernatur sint fugiat excepturi!
      </Card>
    </>
  );
};
Custom.args = {};
